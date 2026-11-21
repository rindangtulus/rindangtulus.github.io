import { getEntry } from 'astro:content';

// Blok "Now": HANYA fakta dari briefing pemilik. Struktur tetap string[] (awalan teks biasa).
export async function getNow(): Promise<string[]> {
  // Versi Rain Mandarin berasal dari satu sumber: frontmatter rain-mandarin.md (sama dengan halaman proyek).
  const app = await getEntry('projects', 'rain-mandarin');
  const version = app?.data.version;
  if (!version) throw new Error('now.ts: rain-mandarin.md harus punya field "version".');
  return [
    'Working on: backend and Scrum Master work for BudgEx, a Product-Based Learning (PdBL) project at PENS with Sindika.',
    `Building: Rain Mandarin, a Traditional-character Mandarin PWA, currently at v${version}.`,
    'Studying: third year of Informatics at PENS.',
  ];
}
