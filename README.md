# rindangtulus.github.io

Personal portfolio of Rindang Tulus Sumalyo, live at https://rindangtulus.github.io/.

The source is public for reference; please don't copy the design or content without permission.

## Stack

- [Astro](https://astro.build/) (static output) with TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`); design tokens live in `src/styles/global.css`
- Astro Content Collections for projects (`src/content/projects/*.md`)
- Astro View Transitions (`<ClientRouter />`) and `@astrojs/sitemap`
- Fonts hosted via `@fontsource`: Inter Tight and Gloock (both SIL Open Font License 1.1)
- Icons from `lucide-static`, plus a few inline SVGs
- Deployed to GitHub Pages with GitHub Actions (`.github/workflows/deploy.yml`)

## Requirements

Node.js 22.22.1 or newer (see `.nvmrc` and `engines` in `package.json`).

## Commands

```sh
npm install
npm run dev          # development server
npm run build        # static build to dist/
npm run preview      # preview the build
npm run check        # type check (astro check)
npm run check:links  # check dist/: links, meta, sitemap, 404 (run after build)
npm run shots        # screenshots at 360/390/768/1440 px, light and dark, to .screenshots/
npm run og           # regenerate Open Graph images in public/
npm run icons        # regenerate PNG favicons from public/favicon.svg
```

`npm run shots`, `og` and `icons` use `playwright-core` with an installed Edge or Chrome.

Stop `npm run dev` before running `build`, `check` or `shots`: they share the same content cache folders (`.astro/` and
`node_modules/.astro/`), and `shots` fails while another `astro preview` is running.

## Structure

```
src/
  assets/            images used by pages and case studies
  components/        Astro components
  content/projects/  one Markdown file per project (frontmatter schema in src/content.config.ts)
  data/              site, navigation, experience, credentials, skills
  layouts/Base.astro head, SEO, theme script, page shell
  pages/             index, 404, projects/[slug]
  scripts/           client scripts (reveal, scroll spy, menu, theme, copy, page setup)
  styles/global.css  design tokens and shared styles
public/              favicons, robots.txt, Open Graph images
scripts/             build-time tooling (shots, og, icons, check-links)
```

## Fonts

Inter Tight and Gloock are licensed under the SIL Open Font License 1.1.
