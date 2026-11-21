// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// User site GitHub Pages: tanpa base path.
export default defineConfig({
  site: 'https://rindangtulus.github.io',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
