import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Skema proyek. Profil dan skill dibaca lewat src/lib/content.ts.
// Bahasa Inggris (Fase 3): tambahkan koleksi serupa untuk src/content/en/.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/id/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    status: z.string(),
    role: z.string(),
    period: z.string(),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    stack: z.array(z.string()),
    repoUrl: z.string().nullable(),
    demoUrl: z.string().nullable(),
    videoUrl: z.string().nullable().optional().default(null),
    coverImage: z.string().nullable(),
    coverAlt: z.string(),
    gallery: z
      .array(
        z.object({
          image: z.string().optional(),
          videoEmbedUrl: z.string().optional(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
      .optional()
      .default([]),
  }),
});

export const collections = { projects };

