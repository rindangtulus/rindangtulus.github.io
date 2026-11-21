// npm run shots: build, jalankan preview, ambil screenshot ke .screenshots/
// Lebar 360/390/768/1440 x terang/gelap. Memakai Edge/Chrome terpasang lewat playwright-core.
// Opsi: --no-build (lewati build), --motion (jangan emulasi reduced-motion), --path=/projects
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const pathArg = (args.find((a) => a.startsWith('--path=')) ?? '--path=/').slice(7);
const PORT = 4399;
const BASE = `http://localhost:${PORT}`;
const OUT = '.screenshots';
const widths = [360, 390, 768, 1440];
const schemes = ['light', 'dark'];
const isWin = process.platform === 'win32';

if (!flag('no-build')) {
  const r = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { shell: true, stdio: 'ignore' });
const stopServer = () => {
  if (isWin) spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  else server.kill();
};
process.on('exit', stopServer);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE + '/');
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Preview server tidak siap');
}

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel });
    } catch (e) {
      console.warn(`Gagal membuka ${channel}: ${e.message.split('\n')[0]}`);
    }
  }
  throw new Error('Edge/Chrome tidak ditemukan');
}

try {
  await waitForServer();
  if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  let overflow = false;

  for (const scheme of schemes) {
    for (const width of widths) {
      const ctx = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: scheme,
        reducedMotion: flag('motion') ? 'no-preference' : 'reduce',
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      await page.goto(BASE + pathArg, { waitUntil: 'networkidle' });
      // Scroll agar reveal-on-scroll terpicu sebelum full-page.
      await page.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(flag('motion') ? 1800 : 300);
      const sw = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
      if (sw.s > sw.c) {
        overflow = true;
        console.error(`OVERFLOW horizontal di ${width}px ${scheme}: scrollWidth ${sw.s} > ${sw.c}`);
      }
      const name = pathArg === '/' ? 'home' : pathArg.replace(/\W+/g, '-').replace(/^-|-$/g, '');
      await page.screenshot({ path: `${OUT}/${name}-${width}-${scheme}.png`, fullPage: true });
      // Viewport pertama saja (hero di atas lipatan).
      await page.screenshot({ path: `${OUT}/${name}-${width}-${scheme}-fold.png` });
      if (width < 768) {
        await page.locator('details[data-menu] summary').click();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${OUT}/${name}-${width}-${scheme}-menu.png` });
      }
      await ctx.close();
      console.log(`ok ${name} ${width} ${scheme}`);
    }
  }
  await browser.close();
  console.log(overflow ? 'Selesai, ADA overflow horizontal.' : `Selesai. Tidak ada overflow horizontal. Hasil di ${OUT}/`);
  process.exitCode = overflow ? 2 : 0;
} finally {
  stopServer();
}
