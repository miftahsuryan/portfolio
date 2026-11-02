import { readFileSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';
import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  deliverables: string[];
  stack: string[];
  projectSlug?: string;
}

export interface Profile {
  siteUrl: string;
  name: string;
  role: string;
  tagline: string;
  availability: string;
  location: string | null;
  services?: ServiceItem[];
  avatar: string | null;
  avatarAlt: string;
  about: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa: string | null;
    showGpa: boolean;
    thesis: string | null;
  };
  certifications: {
    name: string;
    issuer: string;
    year: string;
    verificationUrl: string | null;
    credentialId?: string;
    driveUrl?: string;
    image?: string;
    hours?: string;
    category?: string;
    summary?: string;
  }[];
  training: {
    name: string;
    issuer: string;
    period: string;
    note: string | null;
    hours?: string;
    grade?: string;
    credentialId?: string;
    verificationUrl?: string;
    driveUrl?: string;
    folderUrl?: string;
    image?: string;
    specialization?: string;
    highlights?: string[];
  }[];
  achievements: {
    title: string;
    year: string;
    note: string | null;
    issuer?: string;
    credentialId?: string;
    driveUrl?: string;
    folderUrl?: string;
    image?: string;
    stages?: {
      name: string;
      period: string;
      credentialId?: string;
      driveUrl?: string;
      image?: string;
      summary?: string;
    }[];
  }[];
  organizations: {
    role: string;
    org: string;
    period: string | null;
    note?: string;
    driveUrl?: string;
    credentialId?: string;
  }[];
  contact: { email: string; linkedin: string; github: string };
}

export interface SkillGroup {
  category: string;
  items: { name: string; projectSlugs: string[]; evidence: string[] }[];
}

const readYaml = <T,>(file: string): T => load(readFileSync(file, 'utf-8')) as T;

export function getProfile(): Profile {
  const p = readYaml<Profile>('src/content/id/profile.yaml');
  return {
    ...p,
    services: p.services ?? [],
    certifications: p.certifications ?? [],
    training: p.training ?? [],
    achievements: p.achievements ?? [],
    organizations: p.organizations ?? [],
  };
}

export const getSkillGroups = (): SkillGroup[] =>
  readYaml<{ groups: SkillGroup[] }>('src/content/id/skills.yaml').groups.map((g) => ({
    ...g,
    items: (g.items ?? []).map((it) => ({
      ...it,
      projectSlugs: it.projectSlugs ?? [],
      evidence: it.evidence ?? [],
    })),
  }));

export async function getProjects() {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const hasCvPdf = () => existsSync('public/cv.pdf');

// Gambar dari src/assets/, diakses lewat path yang ditulis di konten.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function resolveImage(path: string | null): ImageMetadata | null {
  if (!path) return null;
  const hit = images['/' + path.replace(/^\//, '')];
  return hit ? hit.default : null;
}

export const statusLabel: Record<string, string> = {
  selesai: 'Selesai',
  prototipe: 'Prototipe',
  pengembangan: 'Pengembangan',
  'dalam-pengembangan': 'Pengembangan',
  'sedang-dikerjakan': 'Sedang Dikerjakan',
};

export const isTodo = (v?: string | null) => !!v && /\bTODO\b/i.test(v);
export const isLink = (v?: string | null): v is string => !!v && /^https?:\/\//.test(v);

