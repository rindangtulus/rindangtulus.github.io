import type { ImageMetadata } from 'astro';
import mandarin from '../assets/projects/belajar-mandarin/laptop-beranda.png';
import ruangkita from '../assets/projects/ruangkita.png';
import budgex from '../assets/projects/budgex.png';
import dipens from '../assets/projects/dipens.png';
import rumahsakit from '../assets/projects/rumahsakit.png';
import mymovies from '../assets/projects/mymovies.png';

export interface Project {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  role: string;
  stack: string[];
  outcome: string; // satu kalimat hasil, kualitatif
  image: ImageMetadata;
  imageAlt: string;
  featured?: boolean;
  demoUrl?: string;
}

// Angka dampak versi lama (40%, 50%, 30%) sengaja TIDAK dipakai sampai dikonfirmasi.
// TODO(rindang): tahun per proyek belum ada di sumber lama; tambahkan bila ingin ditampilkan.
export const projects: Project[] = [
  {
    slug: 'belajar-mandarin',
    code: 'P-01',
    title: 'Belajar Mandarin',
    subtitle: '學華語 · Mandarin learning app',
    role: 'Product owner, designer & solo developer',
    stack: ['Dexie', 'Vitest', 'PWA', 'Claude Code'],
    outcome:
      'A 7-section, offline-capable PWA for Traditional-character Mandarin, backed by 1,000+ automated tests (v0.2.0).',
    image: mandarin,
    imageAlt: 'Home screen of the Belajar Mandarin app on a laptop, showing the seven study sections',
    featured: true,
    // demoUrl: TODO(rindang): URL demo Vercel. Repo private, jangan tautkan GitHub.
  },
  {
    slug: 'ruangkita',
    code: 'P-02',
    title: 'RuangKita',
    subtitle: 'Campus Room Reservation System',
    role: 'Project manager & fullstack developer',
    stack: ['ASP.NET Core', 'Laravel', 'React', 'PostgreSQL'],
    outcome:
      'An integrated reservation system that prevents overlapping schedules and makes booking rooms easier for students and lecturers.',
    image: ruangkita,
    imageAlt: 'RuangKita room reservation interface',
  },
  {
    slug: 'budgex',
    code: 'P-03',
    title: 'BudgEx',
    subtitle: 'Budget Approval Flow',
    role: 'Backend developer & Scrum Master',
    stack: ['PostgreSQL', 'MySQL', 'Git'],
    outcome:
      'Backend for a tiered budget request system with department review and an automated approval flow.',
    image: budgex,
    imageAlt: 'BudgEx budget approval interface',
  },
  {
    slug: 'dipens',
    code: 'P-04',
    title: 'DIPENS',
    subtitle: 'Seminar Platform',
    role: 'UI/UX designer',
    stack: ['Figma', 'Canva'],
    outcome:
      'An interactive prototype of a campus seminar directory that helps students find events quickly and intuitively.',
    image: dipens,
    imageAlt: 'DIPENS seminar directory design',
  },
  {
    slug: 'sip-rumah-sakit',
    code: 'P-05',
    title: 'Hospital Staff Information System',
    subtitle: 'Sistem Informasi Pegawai Rumah Sakit',
    role: 'Fullstack developer',
    stack: ['Laravel', 'Blade', 'MySQL'],
    outcome:
      'A staff directory that maps hospital personnel by department and specialization, giving clearer visibility of staff distribution.',
    image: rumahsakit,
    imageAlt: 'Hospital staff directory interface',
  },
  {
    slug: 'mymovies',
    code: 'P-06',
    title: 'MyMovies',
    subtitle: 'Movie List App',
    role: 'Mobile developer',
    stack: ['Flutter', 'Dart', 'REST API'],
    outcome:
      'A mobile app for browsing current cinema listings and showtimes, with an interface inspired by m.tix.',
    image: mymovies,
    imageAlt: 'MyMovies mobile app screens',
  },
];
