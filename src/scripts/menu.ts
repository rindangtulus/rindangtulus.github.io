// Menu HP: <details data-menu>. Berfungsi tanpa JS; skrip ini menambah
// penutupan otomatis (klik tautan, Esc, klik di luar) dan kunci scroll.
// Mengembalikan fungsi cleanup: semua listener dilepas, kunci scroll dibuka, dan inert dilepas
// (page.ts memanggilnya juga di astro:before-swap).
export function initMenu(): () => void {
  const menu = document.querySelector<HTMLDetailsElement>('details[data-menu]');
  if (!menu) return () => {};
  const summary = menu.querySelector<HTMLElement>('summary')!;
  const ac = new AbortController();
  const { signal } = ac;
  // Saat panel terbuka, konten di belakangnya tidak boleh bisa difokuskan (tanpa jebakan fokus manual).
  const behind = () => document.querySelectorAll<HTMLElement>('body > a[href="#main"], body > header, main, footer');
  const setInert = (on: boolean) => behind().forEach((el) => (el.inert = on));

  const sync = () => {
    summary.setAttribute('aria-expanded', String(menu.open));
    document.documentElement.style.overflow = menu.open ? 'hidden' : '';
    setInert(menu.open);
  };
  const close = (refocus = false) => {
    if (!menu.open) return;
    menu.open = false;
    sync();
    if (refocus) summary.focus();
  };

  menu.addEventListener('toggle', sync, { signal });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close(), { signal }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); }, { signal });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target as Node)) close(); }, { signal });
  // Pindah ke layar lebar: tutup panel.
  window
    .matchMedia('(min-width: 768px)')
    .addEventListener('change', (m) => { if (m.matches) close(); }, { signal });
  sync();

  return () => {
    ac.abort();
    document.documentElement.style.overflow = '';
    setInert(false);
  };
}
