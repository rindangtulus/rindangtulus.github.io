// npm run check:links: periksa hasil build `dist/`. Jalankan setelah `npm run build`.
// - semua href/src internal (termasuk URL absolut situs) menunjuk ke halaman/berkas/id yang ada;
// - canonical, og:image, twitter:image ada dan canonical cocok dengan halaman;
// - sitemap: setiap <loc> punya halaman di dist, 404 tidak ada di sitemap, sitemap-index terbaca;
// - robots.txt merujuk sitemap yang ada; dist/404.html terbit dan noindex;
// - setiap studi kasus punya OG sendiri (public/og/<slug>.png) yang ditunjuk og:image halamannya.
// Gagal (exit 1) bila ada masalah.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const SITE = 'https://rindangtulus.github.io';
if (!existsSync(DIST)) {
  console.error('dist/ tidak ada. Jalankan `npm run build` dulu.');
  process.exit(2);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const pages = walk(DIST).filter((f) => extname(f) === '.html');
const toUrl = (f) => '/' + f.slice(DIST.length + 1).replace(/\\/g, '/').replace(/index\.html$/, '');
const ids = new Map();
const htmlOf = new Map();
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  htmlOf.set(toUrl(f), html);
  ids.set(toUrl(f), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const exists = (path) => {
  const clean = decodeURIComponent(path.split('?')[0]);
  const candidates = [join(DIST, clean), join(DIST, clean, 'index.html'), join(DIST, clean + '.html')];
  return candidates.some((c) => existsSync(c) && (statSync(c).isFile() || existsSync(join(c, 'index.html'))));
};
const internalPath = (u) => (u.startsWith(SITE) ? new URL(u).pathname : u);

const problems = [];
let checked = 0;

// 1) Tautan dan aset internal
for (const [url, html] of htmlOf) {
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    let raw = m[1];
    if (raw.startsWith(SITE)) raw = raw.slice(SITE.length) || '/';
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(raw)) continue;
    checked++;
    const [pathPart, hash] = raw.split('#');
    const target = pathPart === '' ? url : pathPart.startsWith('/') ? pathPart : new URL(pathPart, 'http://x' + url).pathname;
    if (!exists(target)) problems.push(`${url}: ${raw} -> ${target} tidak ada`);
    else if (hash) {
      const pageUrl = target.endsWith('/') ? target : target + '/';
      const set = ids.get(pageUrl) ?? ids.get(target);
      if (set && !set.has(hash)) problems.push(`${url}: ${raw} -> id "${hash}" tidak ada di ${target}`);
    }
  }
}

// 2) Meta per halaman
const meta = (html, re) => (html.match(re) ?? [])[1];
for (const [url, html] of htmlOf) {
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
  const og = meta(html, /<meta property="og:image" content="([^"]+)"/);
  const tw = meta(html, /<meta name="twitter:image" content="([^"]+)"/);
  const robots = meta(html, /<meta name="robots" content="([^"]+)"/);
  const is404 = url === '/404.html' || url === '/404/';
  if (!canonical && !is404) problems.push(`${url}: canonical tidak ada`);
  else if (canonical && !is404 && canonical !== SITE + url) problems.push(`${url}: canonical ${canonical} != ${SITE + url}`);
  for (const [name, v] of [['og:image', og], ['twitter:image', tw]]) {
    if (!v) problems.push(`${url}: ${name} tidak ada`);
    else if (!v.startsWith(SITE) || !exists(internalPath(v))) problems.push(`${url}: ${name} ${v} tidak ada di dist`);
  }
  if (!meta(html, /<meta name="description" content="([^"]+)"/)) problems.push(`${url}: meta description tidak ada`);
  if (is404 && !/noindex/.test(robots ?? '')) problems.push(`${url}: 404 harus noindex`);
  if (!is404 && /noindex/.test(robots ?? '')) problems.push(`${url}: tidak boleh noindex`);
  checked += 3;
}

// 3) 404
if (!existsSync(join(DIST, '404.html'))) problems.push('dist/404.html tidak terbit');

// 4) Studi kasus punya OG sendiri
for (const [url, html] of htmlOf) {
  const m = url.match(/^\/projects\/([^/]+)\/$/);
  if (!m) continue;
  const want = `${SITE}/og/${m[1]}.png`;
  if (meta(html, /<meta property="og:image" content="([^"]+)"/) !== want) problems.push(`${url}: og:image harus ${want}`);
  if (!existsSync(join(DIST, 'og', `${m[1]}.png`))) problems.push(`dist/og/${m[1]}.png tidak ada (jalankan npm run og)`);
}

// 5) robots.txt dan sitemap
const robotsTxt = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
const sm = robotsTxt.match(/^Sitemap:\s*(\S+)/m);
if (!sm) problems.push('robots.txt tidak merujuk Sitemap');
else if (!exists(internalPath(sm[1]))) problems.push(`robots.txt: ${sm[1]} tidak ada di dist`);
let sitemapUrls = [];
if (sm && exists(internalPath(sm[1]))) {
  const index = readFileSync(join(DIST, internalPath(sm[1])), 'utf8');
  for (const loc of [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])) {
    if (!exists(internalPath(loc))) {
      problems.push(`sitemap-index: ${loc} tidak ada`);
      continue;
    }
    const xml = readFileSync(join(DIST, internalPath(loc)), 'utf8');
    sitemapUrls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
}
for (const u of sitemapUrls) {
  const p = internalPath(u);
  if (!u.startsWith(SITE)) problems.push(`sitemap: ${u} bukan URL situs`);
  else if (/\/404/.test(p)) problems.push(`sitemap: ${u} (404) tidak boleh ada`);
  else if (!htmlOf.has(p)) problems.push(`sitemap: ${u} tidak punya halaman di dist`);
}
for (const url of htmlOf.keys()) {
  if (url === '/404.html' || url === '/404/') continue;
  if (!sitemapUrls.includes(SITE + url)) problems.push(`sitemap: ${SITE + url} tidak tercantum`);
}

console.log(`${pages.length} halaman, ${checked} pemeriksaan tautan/meta, ${sitemapUrls.length} URL sitemap.`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('Tidak ada tautan, meta, atau sitemap yang bermasalah.');
