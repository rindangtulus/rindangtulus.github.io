export interface Experience {
  id: string;
  start: number; // tahun
  end: number | null; // null = sekarang
  role: string;
  org: string;
  /** Butir yang ditampilkan di daftar Experience (opsional). */
  points?: string[];
  /** Deskripsi prosa versi lama; sengaja TIDAK ditampilkan (keputusan pemilik). */
  description?: string;
}

export const experience: Experience[] = [
  {
    id: 'budgex',
    start: 2026,
    end: null,
    role: 'Backend Developer & Scrum Master',
    // BudgEx = NAMA PROYEK PdBL kampus (PENS) yang berkolaborasi dengan Sindika; bukan perusahaan, bukan pekerjaan.
    org: 'BudgEx — Product-Based Learning (PdBL) project, PENS in collaboration with PT Sinergi Dimensi Informatika (Sindika)',
    points: [
      'Built the rules that govern budget submissions: one active budget plan (RAB) at a time, new submissions allowed while another is in review, and automatic expiry once one is approved.',
      'Added OPEX validation, and CAPEX review metadata with unit tests.',
      'Delivered reporting endpoints (budget variance, director board summary, department-head drill-down) and an alert system for budget usage.',
      'Sped up the realization dashboard with in-memory caching and less over-fetching.',
      'As Scrum Master, supported each individual team member.',
    ],
  },
  {
    id: 'ecode',
    start: 2026,
    end: null,
    role: 'Project Manager',
    org: 'E-Code, HIMIT',
    description:
      'Leads team planning and execution of technology projects within the campus community: defining scope, managing cross-functional timelines, and keeping delivery quality steady across concurrent workstreams.',
  },
  {
    id: 'dirgantara',
    start: 2025,
    end: null,
    role: 'Development Division Member',
    org: 'UKM Dirgantara, PENS',
    description:
      'Active contributor to the campus aviation and aerospace student organization: community programs, organizational planning and collaboration between divisions.',
  },
  {
    id: 'mc',
    start: 2025,
    end: 2025,
    role: 'Master of Ceremony',
    org: 'PKKMB x Technogear 2025, PENS',
    description:
      'Hosted the technology-themed orientation event for new PENS students, guiding hundreds of them through a day of talks, activities and campus introduction.',
  },
];
