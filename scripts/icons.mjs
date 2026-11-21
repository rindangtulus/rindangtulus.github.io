// npm run icons: render public/favicon.svg ke PNG (favicon-32.png, apple-touch-icon.png 180 px).
// Memakai playwright-core (Edge/Chrome terpasang). Apple touch icon dibuat penuh (tanpa sudut
// membulat) dan selalu bertema terang, karena iOS membulatkan dan tidak mengenal tema SVG.
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const svg = readFileSync('public/favicon.svg', 'utf8');
if (!svg.includes('class="bg"')) throw new Error('public/favicon.svg tidak berformat yang diharapkan');

const fullBleed = svg
  .replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\n    \}\n/, '') // paksa terang
  .replace(' rx="7"', '');

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error('Edge/Chrome tidak ditemukan');
}

const browser = await launch();
async function render(markup, size, out) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`,
  );
  const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  writeFileSync(out, buf);
  await page.close();
  console.log(`ok ${out} (${size}x${size})`);
}
await render(svg, 32, 'public/favicon-32.png');
await render(fullBleed, 180, 'public/apple-touch-icon.png');
await browser.close();
