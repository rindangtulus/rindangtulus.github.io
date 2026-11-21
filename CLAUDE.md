# CLAUDE.md — Portofolio Rindang Tulus Sumalyo

## Tentang proyek
Website portofolio pribadi di **https://rindangtulus.github.io/** (repo `rindangtulus.github.io`).
Pemilik: Rindang Tulus Sumalyo, mahasiswa Informatika PENS (tahun ke-3), IT Project Manager & Scrum Master,
Backend Developer di BudgEx, berbasis di Surabaya.
Tujuan: menunjukkan kepada perekrut bahwa saya bisa **memimpin dan membangun** proyek teknologi,
lewat studi kasus yang jelas, bukan sekadar daftar teknologi.

Versi lama (HTML statis tunggal) disimpan di tag git `v1-lama`. Isinya boleh dipakai sebagai sumber konten,
tapi tampilannya dirombak total.

## Aturan umum
- Bahasa konten: **Inggris** (konsisten di seluruh situs). Teks dalam kode/komentar boleh bahasa Indonesia.
- Jangan mengarang fakta, angka dampak, nama perusahaan, atau tanggal. Kalau data belum ada, tulis placeholder
  yang jelas `TODO(rindang): ...` dan sebutkan di ringkasan.
- Sebelum fitur besar: jelaskan rencana dan file yang akan diubah, lalu tunggu persetujuan.
- Jangan commit atau push kecuali diminta. Saya commit sendiri.
- Mobile-first, aksesibel (kontras cukup, fokus keyboard terlihat, alt text, area ketuk ≥ 44 px),
  hormati `prefers-reduced-motion`.
- Ikon: lucide (atau SVG sendiri). Tanpa emoji.

## Stack
- Astro (output statis) + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`; token warna di CSS, tanpa tailwind.config)
- Konten studi kasus: Astro Content Collections (Markdown/MDX) dengan skema yang divalidasi
- Font (di-host sendiri lewat @fontsource): Inter Tight (teks dan judul, variabel, bobot 500 untuk judul) dan Gloock
  (khusus frasa aksen miring; hanya bobot 400, italic sintetis diterima). Woff2 latin di-preload di `Base.astro` dan
  fallback memakai metrik (size-adjust/ascent-override) agar tidak ada pergeseran tata letak.
- Deploy: GitHub Pages lewat GitHub Actions (Settings → Pages → Source: GitHub Actions)

## Tema: "Claret Folio"
Tampilan bersih dan simpel ala portofolio desainer modern: sans grotesk besar dan rapat, ruang kosong lega,
hierarki lewat ukuran (bukan dekorasi). Kertas blush terang (mode gelap: plum sangat gelap), teks ink, aksen wine
"Claret" dipakai hemat.

Catatan lisensi dan referensi: **Neue Montreal tidak dipakai (lisensi)**; Inter Tight adalah stand-in open-source (OFL).
Referensi vibe: perryw-2023.webflow.io. Hanya untuk kesan; **jangan menyalin layout, teks, atau aset**-nya.

Warna (token CSS, versi gelap ikut preferensi sistem; sakelar manual menyusul di langkah 4):
| Token | Terang | Gelap | Pemakaian |
|---|---|---|---|
| paper | #FBF5F2 | #1A0B13 | latar halaman |
| surface | #FFFFFF | #26121D | pil nav, panel |
| ink | #231019 | #F2DACE | teks utama |
| muted | #6E5560 | #B8979F | teks sekunder, label |
| line | #F2DACE | #3A1F2D | garis tipis antarbaris, latar item pil aktif |
| accent | #7C0E44 | #D49A9A | frasa miring hero, tautan, fokus, titik status, panah saat hover (hemat!) |
| accent-hover | #5E0B35 | #E3B3B3 | hover tautan |
| accent-soft | #AA5E7A | #AA5E7A | ornamen saja; BUKAN untuk teks kecil |
| on-accent | #FFFFFF | #1A0B13 | teks di atas isian aksen |

Token turunan (juga di `src/styles/global.css`):
- `--selection` (#D49A9A, kedua mode) dan `--selection-text` (ink di terang, paper di gelap): warna blok teks.
- `--shadow-color` (terang: plum gelap #231019; gelap: #0A0409). Jangan diturunkan dari `--ink`,
  karena di mode gelap ink terang dan bayangan jadi berpendar.
- `--shadow-pill` (pil nav) dan `--shadow-panel` (panel menu HP), dibangun dari `--shadow-color` lewat `color-mix`.
- `--on-accent`: teks di atas isian aksen.

Aturan: semua hex hidup di satu tempat (`src/styles/global.css`); komponen hanya memakai token. Pengecualian
yang tak bisa memakai variabel: `<meta name="theme-color">` di `Base.astro` (harus sama dengan `--paper`) dan
favicon. Kontras diperiksa: teks normal ≥ 4.5:1, teks besar dan komponen UI ≥ 3:1. Cincin fokus memakai
`outline-offset` ≥ 2px agar terlihat pada tombol berlatar aksen.

Tipografi (token `--font-sans`, `--font-accent`; tanpa font mono):
- Hero: `clamp(2.5rem, 8.4vw, 6.5rem)`, bobot 500, letter-spacing -0.045em, line-height 1.02. Satu frasa aksen
  ("that works.") = Gloock miring warna accent. Setiap kata dalam mask reveal dengan padding untuk descender/overhang.
- Judul bagian: `clamp(2rem, 4.6vw, 3.5rem)`, 500, -0.035em, line-height 1.
- Judul baris proyek 24 px/500; subjudul hero 20-24 px; body 16-18 px, line-height 1.6.
- Label kecil: sans huruf kapital 12 px (13 px di HP), bobot 500, letter-spacing 0.1em, warna muted.
- Aksara Han (mis. "學華語") dibungkus `lang="zh-Hant"` dan memakai fallback sistem (PingFang TC, Microsoft JhengHei,
  Noto Sans TC); tidak ada unduhan font CJK. Jangan mematikan `font-synthesis`.

Elemen khas:
- Hero: headline "I lead small teams to ship software *that works.*", subjudul dua baris menjorok ke kolom kanan
  (baris 1 ink: "IT project manager and Scrum Master who also builds the backend."; baris 2 muted: "Based in Surabaya."),
  lalu status "Open to internships & collaborations" sebagai tautan teks ke Contact dengan titik aksen dan ikon panah.
  Tanpa tombol, tanpa foto di hero.
- Header: nama "Rindang Tulus" dan peran kecil di kiri atas, tautan LinkedIn/GitHub di kanan atas (ikon saja di
  768-1023 px dengan `aria-label` dan area ketuk ≥ 44 px). Bar atas ikut scroll. Hanya **pil nav** di tengah atas
  (Work, About, Experience, Contact) yang menempel; item aktif = ink di atas latar `line` plus `aria-current`
  (scroll spy). Di HP: tombol "Menu" menempel di kanan atas dan membuka panel layar penuh.
- Beranda satu halaman: Work (daftar proyek), About (foto, teks, Skills), Experience (daftar) dengan Credentials di
  bawahnya (gaya daftar sama), blok kecil Now, lalu Contact (email besar, tombol salin alamat, LinkedIn, GitHub).
- Daftar proyek = baris besar berbasis teks: kode `P-01`…`P-06` sebagai label kecil di kiri (disembunyikan di bawah
  768 px), judul 24 px/500, meta berhuruf kapital (peran, stack), ikon panah, garis tipis antarbaris. Hover/fokus:
  panah bergeser 4 px dan garis bawah baris berubah ke accent; judul tidak ikut bergeser. Screenshot hanya di halaman
  studi kasus.
- Experience dan Credentials = daftar bersih (periode, peran/judul, organisasi). Tanpa Gantt, tanpa penomoran bagian.
- Blok **Now**: HANYA fakta dari CLAUDE.md/briefing. Yang belum terkonfirmasi ditandai `TODO(rindang)`.
- Studi kasus: Context → Problem → My role → Process → Outcome → What I learned, plus galeri screenshot.

## Standar kualitas visual (wajib di setiap langkah)
- Terlihat seperti dirancang dengan sengaja, bukan template: hierarki tipografi yang tegas, jarak antarbagian lega,
  grid konsisten, satu aksen warna yang dipakai hemat, tanpa kartu berbingkai tebal.
- Tidak ada lorem ipsum, gambar placeholder abu-abu, atau tombol yang tidak berfungsi di hasil akhir.
- Gambar: format modern (Astro `<Image />`), ukuran tepat, alt text bermakna, tanpa pergeseran tata letak.

## Responsif
- Diuji di lebar 360, 390, 768, 1024, 1440, dan 1920 px. Tidak boleh ada scroll horizontal.
- < 768 px: pil nav diganti tombol Menu (panel layar penuh), hero satu kolom tanpa indentasi, baris proyek satu kolom
  (meta di bawah judul, panah tetap di kanan). 768-1023 px: pil tampil, tautan sosial berupa ikon. ≥ 1024 px: semua tampil.
- Teks paragraf tidak lebih kecil dari 16 px; label kapital boleh 12-13 px.
- Layar lebar: konten dibatasi (sekitar 1200–1280 px) supaya baris teks tidak terlalu panjang.
- `scroll-padding-top` ≥ 6.5rem agar target anchor dan elemen fokus tidak tertutup pil yang menempel.

## Animasi (halus, bermakna, tanpa library berat)
- Hero: headline muncul per kata (naik dari balik mask), subjudul dan status menyusul berurutan (stagger).
- Bagian halaman muncul saat di-scroll (fade + naik 12–16 px, sekali saja) lewat IntersectionObserver.
- Navigasi: item aktif pada pil mengikuti bagian yang sedang dibaca (scroll spy).
- Baris proyek: panah dan garis bawah berubah ke accent dengan gerak halus.
- Perpindahan halaman daftar proyek ↔ studi kasus memakai View Transitions Astro (`<ClientRouter />`).
- Tanpa layar loading dan tanpa gimmick "swipe".
- Durasi 200–700 ms, easing lembut. Semua animasi dimatikan atau diganti fade instan saat
  `prefers-reduced-motion: reduce`. Konten harus tetap terlihat kalau JavaScript mati.

## Verifikasi visual (wajib sebelum melapor selesai)
- Ambil screenshot dengan Playwright (pakai Edge/Chrome yang terpasang lewat playwright-core) di 360, 390, 768,
  dan 1440 px, mode terang dan gelap, ke folder `.screenshots/` (masuk .gitignore).
- **Lihat screenshot itu sendiri**, perbaiki masalah tampilan yang ditemukan (teks terpotong, jarak tidak rata,
  elemen bertumpuk, kontras rendah), lalu ambil ulang. Laporkan apa yang sudah diperbaiki.
- Cek tambahan: tidak ada scroll horizontal, headline tidak terpotong di 360 px, pil/menu tidak bertabrakan dengan nama.
- Targetkan Lighthouse ≥ 95 untuk Performance, Accessibility, Best Practices, dan SEO; laporkan skornya
  kalau bisa dijalankan.

## Struktur halaman
- `/`: beranda (Work, About, Experience + Credentials, Now, Contact; semua proyek tampil di sini)
- `/projects/[slug]`: studi kasus
- `/404`

## Konten (dari versi lama, perlu diperiksa pemilik)
Experience:
- 2026–sekarang · Backend Developer & Scrum Master · BudgEx — PT Sinergi Dimensi Informatika (Sindika)
  (deskripsi lama tersalin dari E-Code → TODO tulis ulang)
- 2026–sekarang · Project Manager · E-Code — HIMIT
- 2025–sekarang · Development Division Member · UKM Dirgantara — PENS
- 2025 · Master of Ceremony · PKKMB x Technogear 2025 — PENS

Projects:
- RuangKita — Campus Room Reservation System (ASP.NET Core, Laravel, React, PostgreSQL)
- BudgEx — Budget Approval Flow (backend, PostgreSQL, MySQL). Nama "BudgEx" dipakai untuk proyek dan perusahaan.
- DIPENS — Seminar Platform (UX design: Figma, Canva)
- Sistem Informasi Pegawai Rumah Sakit (Laravel, Blade)
- MyMovies — Movie List App (Flutter)
- **Belajar Mandarin (學華語)** — proyek unggulan (tampil pertama). Detail di bagian di bawah.

### Studi kasus unggulan: Belajar Mandarin (學華語)
- Context: mahasiswa pemula yang ikut kelas Mandarin Taiwan (aksara tradisional). Aplikasi umum tidak
  mengikuti materi kelas, banyak yang memakai aksara sederhana, dan tidak berbahasa Indonesia.
- Problem: butuh satu tempat untuk menyimpan kosakata dari kelas, mengulang dengan jadwal yang tepat,
  berlatih menulis, tata bahasa, angka/waktu, dan nada.
- My role: product owner, desainer, dan developer tunggal, memakai **AI-assisted development (Claude Code)**
  dengan alur kerja rencana dulu: draft → review → implementasi → uji → commit per fitur.
- Process: roadmap 7 langkah, branch per fitur, Conventional Commits, Semantic Versioning dengan CHANGELOG
  (nomor versi rilis: rujuk satu nilai di data proyek, sekarang v0.2.0), fungsi murni yang diuji, migrasi skema Dexie bertahap.
- Outcome (pakai angka nyata saja, konfirmasi angka terbaru ke pemilik): 7 bagian belajar (Kosakata, Kartu SRS,
  Menulis, Tata Bahasa, Angka & Waktu, Nada, Beranda), 1000+ tes Vitest, PWA yang bisa dipasang dan jalan
  offline, deploy di Vercel.
- Sorotan teknis: SM-2 dengan fase belajar dan Batalkan, kartu balik 3D dan geser, registry aktivitas untuk
  streak/heatmap, aturan bahasa Mandarin yang dimodelkan (萬/億, 零, 兩, sandhi 一/不, penyaring nada 3-3),
  mode pinyin untuk pemula, aksesibilitas dan reduced-motion.
- What I learned: desain data local-first, menjaga backup lama tetap terbaca, menulis prompt/brief yang jelas
  untuk AI, dan memecah produk menjadi rilis kecil.
- Gambar: screenshot dari `docs/screenshots/` repo Belajar Mandarin (berisi data contoh fiktif, aman),
  disalin ke `src/assets/projects/belajar-mandarin/`.
- Tautan: demo Vercel kalau pemilik memberikan URL-nya. Repo private, jadi jangan tautkan ke GitHub.

Angka dampak lama ("efisiensi naik 40%", "50% lebih cepat", dll.) hanya dipakai setelah dikonfirmasi pemilik.

Credentials:
- Becoming a Software Engineer in the Age of AI — GDG on Campus ITS · 2025
- Panitia PKKMB x Technogear 2025 — BEM PENS · 2025
- Life Management Training PENS 2025 — Sinergi97 · 2025
- AWS Academy Graduate – Cloud Foundations — AWS · 2026

Kontak: rindangtulus@gmail.com · LinkedIn `rindangtulus` · GitHub `rindangtulus`
(Tidak ada backend: formulir kontak diganti tombol email + salin alamat email.)

## Roadmap
1. [x] Fondasi: Astro + Tailwind + token tema terang/gelap + font + layout + navigasi milestone + sistem animasi
       + hero brief + skrip screenshot + deploy GitHub Actions
1b. [x] Redesain tema bersih "Claret Folio": hero dengan frasa aksen, pil nav, daftar proyek berbasis baris,
       beranda satu halaman (Work, About, Experience + Credentials, Now, Contact). Isi konten awal sudah terpasang;
       teks yang belum terkonfirmasi ditandai TODO(rindang)
2. [ ] Beranda: poles dan lengkapi konten (deskripsi BudgEx, apa yang sedang dipelajari di Now, tahun proyek)
3. [ ] Projects + Content Collections + halaman studi kasus (Belajar Mandarin pertama, galeri screenshot) + View Transitions
4. [ ] SEO (meta, Open Graph, sitemap), favicon, 404, sakelar tema
5. [ ] Audit akhir: aksesibilitas, Lighthouse, tampilan HP, isi konten

Tandai item dengan [x] setiap kali selesai.

## Perintah
- `npm run dev` — server pengembangan
- `npm run build` — build statis ke `dist/`
- `npm run preview` — pratinjau hasil build
- `npm run check` — pemeriksaan tipe Astro/TypeScript (`astro check`)
- `npm run shots` — screenshot 360/390/768/1440 px, terang dan gelap, ke `.screenshots/`
