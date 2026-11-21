import { getEntry } from 'astro:content';

// Blok "Now": HANYA fakta yang sudah ada di CLAUDE.md / briefing.
// TODO(rindang): tambahkan apa yang sedang dipelajari saat ini (belum ada di sumber, jadi tidak ditampilkan).
export async function getNow(): Promise<string[]> {
  const app = await getEntry('projects', 'rain-mandarin');
  // Versi berasal dari satu field (frontmatter rain-mandarin.md), sama dengan studi kasus.
  const version = app?.data.version ? ` (currently v${app.data.version})` : '';
  return [
    'Backend Developer and Scrum Master on BudgEx, a Product-Based Learning (PdBL) project at PENS with PT Sinergi Dimensi Informatika (Sindika).',
    'Project Manager at E-Code, leading campus technology projects.',
    `Building Rain Mandarin, an offline-capable Mandarin learning app${version}.`,
    'Third-year Informatics student at PENS.',
  ];
}
