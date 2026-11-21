// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// User site GitHub Pages: tanpa base path.
export default defineConfig({
  site: 'https://rindangtulus.github.io',
  output: 'static',
  // 404 tidak masuk sitemap (noindex).
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  vite: { plugins: [tailwindcss()] },
});
