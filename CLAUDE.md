# CLAUDE.md — Portofolio Rindang Tulus Sumalyo

## Tentang proyek
Website portofolio pribadi di **https://rindangtulus.github.io/** (repo `rindangtulus.github.io`).
Pemilik: Rindang Tulus Sumalyo, mahasiswa Informatika PENS (tahun ke-3), IT Project Manager & Scrum Master,
Backend Developer & Scrum Master pada proyek BudgEx (Product-Based Learning kampus), berbasis di Surabaya.
Tujuan: menunjukkan kepada perekrut bahwa saya bisa **memimpin dan membangun** proyek teknologi,
lewat studi kasus yang jelas, bukan sekadar daftar teknologi.

Versi lama (HTML statis tunggal) disimpan di tag git `v1-lama`. Isinya boleh dipakai sebagai sumber konten,
tapi tampilannya dirombak total.

## Aturan umum
- Bahasa konten: **Inggris Amerika** (practice, modeled, color, organization, dll.; konsisten di seluruh situs).
  Teks dalam kode/komentar boleh bahasa Indonesia. Periode di Experience ditulis "2026 – Present" / "2025 – Present"
  (en dash, "Present"; data sumber tetap `start`/`end`).
- Konsistensi teks (hasil audit):
  - Label peran (header, meta, baris proyek, Experience, JSON-LD) memakai Title Case, mis. "Backend Developer & Scrum Master".
    Kalimat hero dan prosa memakai huruf biasa. Alt gambar OG mengutip teks yang benar-benar tampil di gambar (`scripts/og.mjs`).
  - "&" hanya di label peran, nama baku, dan baris status "Open to internships & collaborations". Prosa, judul, dan item daftar
    memakai "and" (mis. "Numbers and Time", "HTML and CSS"). Judul default beranda memuat label peran, jadi tetap memakai "&".
  - Title halaman memakai pola "Halaman | Rindang Tulus"; studi kasus "Judul case study | Rindang Tulus" (tanpa titik dua).
    Beranda dan 404 berformat sendiri.
  - Ejaan Inggris Amerika; periode ditulis "2026 – Present" (en dash).
  - Seluruh teks tampil berbahasa Inggris; nama resmi organisasi dan nama baku dibiarkan apa adanya (mis. BEM PENS, Sinergi97,
    "Sistem Informasi Pegawai Rumah Sakit", "學華語 · Belajar Mandarin Taiwan"). Judul kredensial ditulis dalam bahasa Inggris,
    mis. "Committee Member, PKKMB x Technogear 2025".
  - Sengaja tidak diubah: em dash pada baris organisasi BudgEx, nama tautan beranda, dan `overflow-wrap`.
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
- Konten proyek: Astro Content Collection `projects` (`src/content.config.ts`, `src/content/projects/*.md`, glob loader,
  skema zod). Studi kasus = isi Markdown dari entri dengan `caseStudy: true`.
- View Transitions: `<ClientRouter />` di `Base.astro`
- Font (di-host sendiri lewat @fontsource): Inter Tight (teks dan judul, variabel, bobot 500 untuk judul) dan Gloock
  (khusus frasa aksen miring; hanya bobot 400, italic sintetis diterima). Woff2 latin di-preload di `Base.astro` dan
  fallback memakai metrik (size-adjust/ascent-override) agar tidak ada pergeseran tata letak.
- Deploy: GitHub Pages lewat GitHub Actions (Settings → Pages → Source: GitHub Actions). Workflow `.github/workflows/deploy.yml`:
  `pull_request` ke main = job `verify` saja (check, build, check:links; tanpa deploy); push ke main / workflow_dispatch = build
  lalu deploy. Izin minimal (`contents: read`; `pages: write` dan `id-token: write` hanya di job deploy), concurrency deploy tidak
  membatalkan yang berjalan. Aksi: checkout@v7, setup-node@v7, upload-pages-artifact@v5, deploy-pages@v5 (tanpa configure-pages: `site` statis, tanpa
  base, dan job build hanya punya `contents: read`, jadi API Pages bisa memberi 403). Job build/deploy tidak bisa dites lewat PR;
  hanya job `verify` yang berjalan di PR.
- Node: `.nvmrc` = 22; `engines.node` >= 22.22.1 (syarat `sitemap`). Upgrade `astro` ke >= 7.4.7 (perbaikan `npm audit`) butuh
  Node >= 22.23.4. README.md ada untuk repo publik (tanpa LICENSE; catatan hak cipta desain dan konten ada di README).

## Tema: "Claret Folio"
Tampilan bersih dan simpel ala portofolio desainer modern: sans grotesk besar dan rapat, ruang kosong lega,
hierarki lewat ukuran (bukan dekorasi). Kertas blush terang (mode gelap: plum sangat gelap), teks ink, aksen wine
"Claret" dipakai hemat.

Catatan lisensi dan referensi: **Neue Montreal tidak dipakai (lisensi)**; Inter Tight adalah stand-in open-source (OFL).
Referensi vibe: perryw-2023.webflow.io. Hanya untuk kesan; **jangan menyalin layout, teks, atau aset**-nya.

Warna (token CSS, versi gelap ikut preferensi sistem; ikut sistem, sakelar manual di header):
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
`public/favicon.svg` (hex di dalam SVG; mengikuti prefers-color-scheme). Kontras diperiksa: teks normal ≥ 4.5:1, teks besar dan komponen UI ≥ 3:1. Cincin fokus memakai
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
- Sakelar tema (`ThemeToggle.astro`, `src/scripts/theme.ts`): dua keadaan, ikon berganti (bulan di tema terang, matahari di
  gelap), `aria-label` dinamis ("Switch to dark theme" / "Switch to light theme"), tanpa `aria-pressed`. Pilihan eksplisit
  SELALU disimpan di `localStorage["theme"]` (try/catch), juga bila sama dengan sistem; tanpa pilihan, tema mengikuti sistem.
  Skrip inline di `<head>` menerapkan `data-theme` sebelum cat pertama; `page.ts` menyalin `data-theme` (dan kelas `js`) ke
  dokumen baru di `astro:before-swap`. `<meta theme-color>` ikut berganti (nilai dibaca dari token `--paper`). Tombol
  tersembunyi tanpa JavaScript. Tanpa transisi warna.
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
- Blok **Now** (`src/data/now.ts`, `string[]` dengan awalan teks biasa): tiga butir dari briefing pemilik. "Working on: backend and
  Scrum Master work for BudgEx, a Product-Based Learning (PdBL) project at PENS with Sindika." / "Building: Rain Mandarin, a
  Traditional-character Mandarin PWA, currently at v{version}." / "Studying: third year of Informatics at PENS." Versi dibaca dari
  `getEntry('projects', 'rain-mandarin').data.version` (satu sumber dengan halaman proyek); build gagal bila `version` hilang.
  Jangan menambah fakta lain tanpa konfirmasi pemilik.
- Studi kasus: Context → Problem → My role → Process → Outcome → What I learned, plus galeri screenshot.

## Standar kualitas visual (wajib di setiap langkah)
- Terlihat seperti dirancang dengan sengaja, bukan template: hierarki tipografi yang tegas, jarak antarbagian lega,
  grid konsisten, satu aksen warna yang dipakai hemat, tanpa kartu berbingkai tebal.
- Tidak ada lorem ipsum, gambar placeholder abu-abu, atau tombol yang tidak berfungsi di hasil akhir.
- Gambar: format modern (Astro `<Image />`), ukuran tepat, alt text bermakna, tanpa pergeseran tata letak.

## Aksesibilitas (hasil audit langkah 5)
- Skip link "Skip to content" di `Base.astro`. Satu `h1` per halaman, landmark header/nav/main/footer; dua `nav` bernama berbeda
  ("Sections" dan "Sections, mobile").
- Menu HP: saat panel terbuka, `body > a[href="#main"]`, `body > header`, `main`, dan `footer` diberi `inert`; dilepas saat menutup,
  di cleanup `menu.ts`, dan di `astro:before-swap`. Escape menutup dan mengembalikan fokus ke tombol Menu.
- Zoom: lulus di 200% dan 400% (viewport 320 px) dan pada ukuran font bawaan browser 200%/400% tanpa scroll horizontal. `body` memakai
  `overflow-wrap: anywhere`; header HP menyisakan ruang `min(8.5rem,70vw)` untuk tombol Menu. Batas yang diketahui: pada font
  bawaan 400% di lebar 390 px, tombol Menu menempel dan dapat menimpa nama (tidak ada scroll horizontal).
- `forced-colors: active`: item pil/menu aktif diberi outline + garis bawah, titik status memakai `LinkText`, sakelar tema diberi batas.

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
- `/projects/[slug]`: studi kasus. HANYA proyek dengan `caseStudy: true` yang punya halaman (sekarang `rain-mandarin`).
  Proyek lain tampil sebagai baris non-link di beranda (tanpa panah dan tanpa hover). Jangan membuat halaman tipis.

## Koleksi `projects` (skema)
Frontmatter per entri: `title`, `subtitle`, `code` (`P-01`…`P-06`), `order`, `role`, `stack[]`, `summary` (satu kalimat
hasil, kualitatif), `version?` (satu sumber untuk blok Now dan studi kasus), `year?`, `links.demo?`, `cover` (`image()`) dan
`coverAlt` (opsional untuk `caseStudy: false`, wajib untuk `caseStudy: true`; PNG cover proyek non-studi-kasus tetap di
`src/assets/projects/` tetapi tidak dirujuk, jadi tidak terbit ke `dist/`), `gallery[{ image, alt, caption }]`, `caseStudy` (boolean, bawaan false). `alt`, `caption`, `coverAlt` tidak boleh
kosong (build gagal). `caseStudy: true` wajib punya galeri dan isi Markdown. Isi studi kasus memakai heading Context, Problem,
My role, Process, Outcome, What I learned, Technical highlights. Teks Mandarin dalam prosa dibungkus
`<span lang="zh-Hant">`.

Perpindahan halaman: judul proyek memakai `transition:name="title-{slug}"` (baris ↔ header studi kasus); pil nav
`transition:persist="site-pill"` (id eksplisit wajib, id otomatis berubah per halaman). Semua init skrip (`reveal`, `scrollspy`,
`menu`, `copy`) lewat `src/scripts/page.ts` pada `astro:page-load` dan dibersihkan di `astro:before-swap` (tiap init
mengembalikan fungsi cleanup; listener memakai AbortController).
- `/404`: `src/pages/404.astro` (headline dengan frasa aksen, satu tautan ke beranda, `noindex`, tanpa canonical); terbit sebagai `dist/404.html`.

## SEO, OG, favicon
- `Base.astro` menerima `title`, `description`, `image`, `imageAlt`, `type`, `noindex`: canonical (dari `site` di astro.config),
  Open Graph, Twitter card, `robots` noindex bila diminta. Beranda memuat JSON-LD Person (name, jobTitle, url, sameAs
  LinkedIn dan GitHub; tanpa email, tanpa `worksFor`). Sitemap lewat `@astrojs/sitemap` (404 dikecualikan); `public/robots.txt`.
- Gambar OG 1200×630: `npm run og` (`scripts/og.mjs`, playwright-core) membuat `public/og.png` dan `public/og/<slug>.png`
  per studi kasus; og:image studi kasus menunjuk ke OG-nya sendiri. Warna dibaca dari blok `:root` di `global.css`; bila token
  tidak ada, skrip berhenti dengan error (tanpa hex cadangan). Skrip juga memeriksa ukuran dan teks tidak terpotong.
- Favicon: monogram RT (`public/favicon.svg`, wine terang / rose gelap), `favicon-32.png`, `apple-touch-icon.png` (180 px) lewat
  `npm run icons`. Bintang jatuh lama dibuang (bukan logo pemilik, berisiko hak cipta). Tanpa `favicon.ico`.

## Konten (dari versi lama, perlu diperiksa pemilik)
Experience:
- 2026–sekarang · Backend Developer & Scrum Master · BudgEx — Product-Based Learning (PdBL) project, PENS in
  collaboration with PT Sinergi Dimensi Informatika (Sindika). BudgEx adalah NAMA PROYEK PdBL kampus, BUKAN perusahaan,
  dan ini BUKAN pekerjaan atau magang di Sindika (jangan menyiratkan karyawan Sindika di hero, About, Now, Experience,
  data, meta, atau JSON-LD). Periode "2026 – Present" belum dikonfirmasi pemilik (jangan diubah dulu). Tampil sebagai butir di daftar Experience (`points` di
  `src/data/experience.ts`): aturan pengajuan anggaran (satu RAB aktif, pengajuan baru saat review, kedaluwarsa otomatis
  setelah disetujui), validasi OPEX dan metadata review CAPEX dengan unit test, endpoint laporan (variance anggaran,
  ringkasan direksi, drill-down kepala departemen) dan sistem peringatan pemakaian anggaran, serta dashboard realisasi
  yang dipercepat (cache in-memory, kurangi over-fetching), dan "As Scrum Master, supported each individual team member."
  Tanpa angka dampak.
  Deskripsi prosa E-Code/Dirgantara/MC di data tidak ditampilkan (keputusan pemilik).
- 2026–sekarang · Project Manager · E-Code — HIMIT
- 2025–sekarang · Development Division Member · UKM Dirgantara — PENS
- 2025 · Master of Ceremony · PKKMB x Technogear 2025 — PENS

Projects:
- RuangKita — Campus Room Reservation System (ASP.NET Core, Laravel, React, PostgreSQL)
- BudgEx — Budget Approval Flow (`caseStudy: false`, baris non-link). Ringkasan: aplikasi Android yang membawa anggaran
  perusahaan dari perencanaan, persetujuan, catatan pengeluaran, sampai laporan, dalam satu tempat. Stack: PostgreSQL, MySQL.
  TODO(rindang): framework dan bahasa backend (jangan ditebak). Jangan tautkan repo BudgEx dan jangan pajang nomor PR.
  "BudgEx" hanya nama proyek (koreksi: bukan nama perusahaan).
- DIPENS — Seminar Platform (UX design: Figma, Canva)
- Sistem Informasi Pegawai Rumah Sakit (Laravel, Blade)
- MyMovies — Movie List App (Flutter)
- **Rain Mandarin** (subjudul "學華語 · Belajar Mandarin Taiwan", slug `rain-mandarin`) — proyek unggulan (tampil pertama).
  Nama aplikasi di situs demo (title dan sidebar) adalah "Rain Mandarin"; screenshot lama masih menampilkan sidebar
  "學華語 Belajar Mandarin Taiwan". Detail di bagian di bawah.

### Studi kasus unggulan: Rain Mandarin (學華語 · Belajar Mandarin Taiwan)
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
- Gambar: screenshot dari `docs/screenshots/` repo aplikasi (berisi data contoh fiktif, aman), disalin ke
  `src/assets/projects/belajar-mandarin/` (nama folder tidak diubah). Cover = `laptop-beranda`; galeri = 8 gambar lain
  (6 laptop, 2 HP). Tile HP rasio 9/13, lebar maks 280 px, `object-top`; alt text mendeskripsikan bagian yang tampil di tile.
- Tautan: demo Vercel https://belajar-mandarin-alpha.vercel.app/ ("Live demo", tab baru, `rel="noopener"`). Repo private,
  jadi jangan tautkan ke GitHub.
- Tes ditulis "1,000+ Vitest tests" di situs (tetap benar saat tes bertambah). Terkonfirmasi pemilik: `npx vitest run`
  pada 2026-11-21 = 1.046 tes lulus di 44 berkas. Versi hanya dari field `version`.
- Sudut pandang teks studi kasus: ORANG PERTAMA ("I was a beginner student in a Taiwanese Mandarin class…"). Pemilik
  memang pelajar kelas Mandarin Taiwan itu.

Angka dampak lama ("efisiensi naik 40%", "50% lebih cepat", dll.) hanya dipakai setelah dikonfirmasi pemilik.

Credentials:
- Becoming a Software Engineer in the Age of AI — GDG on Campus ITS · 2025
- Committee Member, PKKMB x Technogear 2025 — BEM PENS · 2025
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
2. [x] Beranda lengkap (dibangun di 1b; data BudgEx diperbarui di langkah 3). TODO(rindang) tersisa: tanggung jawab Scrum
       Master (selesai), blok Now (selesai), tahun proyek, framework/bahasa backend BudgEx;
       periode BudgEx menunggu konfirmasi pemilik
3. [x] Content Collection `projects` + halaman studi kasus (Rain Mandarin pertama, galeri screenshot) + View Transitions
       + data BudgEx baru + `npm run check:links`
4. [x] SEO (meta, Open Graph, sitemap, JSON-LD), OG per studi kasus, favicon RT, 404, sakelar tema
5. [x] Audit akhir: konten (ekstraksi teks, ejaan Amerika), aksesibilitas (keyboard, `inert` pada menu HP, zoom/reflow, forced-colors),
       teknis (README, .nvmrc, workflow dengan job verify, bersih-bersih aset), Lighthouse. Menunggu: merge ke main (dikerjakan pemilik).
       TODO(rindang) tersisa: tahun proyek, framework/bahasa backend BudgEx; periode BudgEx
       menunggu konfirmasi pemilik. Belum bisa diperbarui sampai Node lokal >= 22.23.4: `astro` 7.3.8 -> >= 7.4.7 (audit moderate)

Tandai item dengan [x] setiap kali selesai.

## Perintah
- Prosedur: hentikan `npm run dev` sebelum menjalankan `npm run build`, `npm run check`, atau `npm run shots`. Semuanya memakai
  folder cache konten yang sama (`.astro/` dan `node_modules/.astro/`), dan `shots` gagal ("Preview server tidak siap") bila
  ada `astro preview` lain yang sedang berjalan. Bila daftar proyek tampak kosong atau studi kasus 404 di dev: hentikan dev,
  hapus `.astro` dan `node_modules/.astro`, lalu jalankan ulang; di Chrome periksa juga service worker lama pada `localhost:4321`
  (DevTools, Application, Clear site data) atau buka jendela penyamaran.
- `npm run dev` — server pengembangan
- `npm run build` — build statis ke `dist/`
- `npm run preview` — pratinjau hasil build
- `npm run check` — pemeriksaan tipe Astro/TypeScript (`astro check`)
- `npm run check:links` — periksa `dist/`: tautan/aset internal, canonical, og:image, sitemap, robots, 404, dan kebersihan
  (tanpa TODO/lorem/placeholder/localhost/console.log/href kosong; chunk vendor Astro dikecualikan) (setelah build)
- `npm run og` — buat ulang gambar OG (`public/og.png`, `public/og/<slug>.png`)
- `npm run icons` — render PNG favicon (32 px) dan apple-touch-icon (180 px) dari `public/favicon.svg`
- `npm run shots` — screenshot beranda dan studi kasus di 360/390/768/1440 px, terang dan gelap, ke `.screenshots/`
