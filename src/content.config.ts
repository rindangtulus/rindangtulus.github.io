import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Teks alternatif dan keterangan wajib terisi: string kosong atau spasi saja membuat build gagal.
const text = (what: string) => z.string().trim().min(1, `${what} must not be empty`);

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: text('title'),
        subtitle: text('subtitle'),
        code: z.string().regex(/^P-0[1-6]$/, 'code must be P-01 … P-06'),
        order: z.number().int().positive(),
        role: text('role'),
        stack: z.array(text('stack item')).min(1),
        summary: text('summary'), // satu kalimat hasil, kualitatif
        version: z.string().trim().min(1).optional(), // satu sumber untuk blok Now dan studi kasus
        year: z.number().int().optional(),
        links: z.object({ demo: z.url().optional() }).default({}),
        // Cover hanya dipakai halaman studi kasus: opsional untuk caseStudy: false, wajib untuk caseStudy: true.
        cover: image().optional(),
        coverAlt: text('coverAlt').optional(),
        gallery: z
          .array(z.object({ image: image(), alt: text('gallery alt'), caption: text('gallery caption') }))
          .default([]),
        caseStudy: z.boolean().default(false),
      })
      .refine((d) => !d.caseStudy || d.gallery.length > 0, {
        message: 'a case study needs at least one gallery image',
        path: ['gallery'],
      })
      .refine((d) => !d.caseStudy || (d.cover && d.coverAlt), {
        message: 'a case study needs cover and coverAlt',
        path: ['cover'],
      }),
});

export const collections = { projects };
