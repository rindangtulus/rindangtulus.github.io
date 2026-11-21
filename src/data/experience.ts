export interface Experience {
  id: string;
  start: number; // tahun
  end: number | null; // null = sekarang
  role: string;
  org: string;
  description: string; // kosong = belum ditulis ulang
  todo?: string;
}

export const experience: Experience[] = [
  {
    id: 'budgex',
    start: 2026,
    end: null,
    role: 'Backend Developer & Scrum Master',
    org: 'BudgEx, PT Sinergi Dimensi Informatika (Sindika)',
    description: '',
    todo: 'TODO(rindang): tulis ulang deskripsi BudgEx. Teks lama tersalin dari E-Code.',
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
