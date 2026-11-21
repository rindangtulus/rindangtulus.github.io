// npm run og: buat gambar Open Graph 1200x630 (public/og.png dan public/og/<slug>.png per studi kasus).
// Warna dibaca dari blok `:root` (tema terang) di src/styles/global.css. Bila token tidak ditemukan,
// skrip berhenti dengan error: TIDAK ada hex cadangan. Font dari paket @fontsource (woff2 latin).
// Setelah render: ukuran PNG diperiksa tepat 1200x630 dan teks diperiksa tidak terpotong/meluap.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const W = 1200;
const H = 630;

// ---------- Token dari global.css ----------
const css = readFileSync('src/styles/global.css', 'utf8');
const rootBlock = css.match(/:root\s*\{([^}]*)\}/);
if (!rootBlock) throw new Error('og: blok ":root { ... }" tidak ditemukan di src/styles/global.css');
const tokens = {};
for (const name of ['paper', 'ink', 'muted', 'line', 'accent']) {
  const m = rootBlock[1].match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`));
  if (!m) throw new Error(`og: token --${name} tidak ditemukan atau bukan hex di blok :root global.css`);
  tokens[name] = m[1];
}

// ---------- Font ----------
const fontFile = (p) => {
  try {
    readFileSync(p);
  } catch {
    throw new Error(`og: berkas font tidak ada: ${p}. Jalankan npm install.`);
  }
  return pathToFileURL(resolve(p)).href;
};
const sansUrl = fontFile('node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2');
const accentUrl = fontFile('node_modules/@fontsource/gloock/files/gloock-latin-400-normal.woff2');

// ---------- Konten ----------
const site = { name: 'Rindang Tulus', role: 'IT Project Manager', host: 'rindangtulus.github.io' };
const cards = [
  {
    out: 'public/og.png',
    label: `${site.name} · ${site.role}`,
    headline: 'I lead small teams to ship software <em>that works.</em>',
    lead: '',
  },
];
const dir = 'src/content/projects';
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const fm = readFileSync(`${dir}/${file}`, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) throw new Error(`og: frontmatter tidak ditemukan di ${file}`);
  const get = (k) => {
    const m = fm[1].match(new RegExp(`^${k}:\\s*(.+?)\\s*$`, 'm'));
    return m ? m[1].replace(/^(['"])(.*)\1$/, '$2') : null;
  };
  if (get('caseStudy') !== 'true') continue;
  const slug = file.replace(/\.md$/, '');
  for (const k of ['title', 'summary', 'code']) if (!get(k)) throw new Error(`og: field "${k}" kosong di ${file}`);
  cards.push({
    out: `public/og/${slug}.png`,
    label: `${get('code')} · Case study`,
    headline: get('title'),
    lead: get('summary'),
  });
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = (c) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Sans;src:url("${sansUrl}") format("woff2");font-weight:100 900}
@font-face{font-family:Accent;src:url("${accentUrl}") format("woff2");font-weight:400}
*{box-sizing:border-box;margin:0}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:${tokens.paper};color:${tokens.ink};font-family:Sans,sans-serif;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;letter-spacing:-0.005em}
.label{font-size:22px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${tokens.muted}}
h1{font-size:${c.lead ? 112 : 100}px;font-weight:500;letter-spacing:-0.045em;line-height:1.02;max-width:1020px}
h1 em{font-family:Accent,Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-0.02em;color:${tokens.accent}}
.lead{margin-top:28px;font-size:34px;line-height:1.3;letter-spacing:-0.015em;color:${tokens.ink};max-width:900px}
.foot{display:flex;align-items:center;gap:14px;font-size:26px;color:${tokens.muted};border-top:2px solid ${tokens.line};padding-top:26px}
.dot{width:12px;height:12px;border-radius:50%;background:${tokens.accent}}
</style>
<div class="label" data-check>${esc(c.label)}</div>
<div><h1 data-check>${c.headline.includes('<em>') ? c.headline : esc(c.headline)}</h1>${c.lead ? `<p class="lead" data-check>${esc(c.lead)}</p>` : ''}</div>
<div class="foot" data-check><span class="dot"></span>${site.host}</div>`;

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error('og: Edge/Chrome tidak ditemukan');
}

mkdirSync('public/og', { recursive: true });
const browser = await launch();
for (const c of cards) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  // Berkas sementara (bukan setContent) supaya font file:// boleh dimuat.
  const tmp = join(tmpdir(), `og-${process.pid}.html`);
  writeFileSync(tmp, html(c));
  await page.goto(pathToFileURL(tmp).href);
  const fontsOk = await page.evaluate(async () => {
    await Promise.all([document.fonts.load('500 100px Sans'), document.fonts.load('italic 400 100px Accent')]);
    return document.fonts.check('500 100px Sans') && document.fonts.check('italic 400 100px Accent') && [...document.fonts].every((f) => f.status === 'loaded');
  });
  if (!fontsOk) throw new Error(`og: font tidak termuat untuk ${c.out}`);
  // Teks tidak boleh meluap atau keluar dari kanvas.
  const bad = await page.evaluate(
    ({ W, H }) => {
      const out = [];
      document.querySelectorAll('[data-check]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (el.scrollWidth > el.clientWidth + 1 || r.right > W - 40 || r.bottom > H - 24 || r.left < 0 || r.top < 0)
          out.push(el.textContent.trim().slice(0, 40));
      });
      const body = document.body;
      if (body.scrollHeight > H + 1) out.push('konten melebihi tinggi 630');
      return out;
    },
    { W, H },
  );
  if (bad.length) throw new Error(`og: teks terpotong/meluap di ${c.out}: ${bad.join(' | ')}`);
  const buf = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (w !== W || h !== H) throw new Error(`og: ukuran ${w}x${h} bukan ${W}x${H} (${c.out})`);
  writeFileSync(c.out, buf);
  console.log(`ok ${c.out} (${w}x${h})`);
  await page.close();
}
await browser.close();
