// Menu HP: <details data-menu>. Berfungsi tanpa JS; skrip ini menambah
// penutupan otomatis (klik tautan, Esc, klik di luar) dan kunci scroll.
export function initMenu() {
  const menu = document.querySelector<HTMLDetailsElement>('details[data-menu]');
  if (!menu) return;
  const summary = menu.querySelector<HTMLElement>('summary')!;

  const sync = () => {
    summary.setAttribute('aria-expanded', String(menu.open));
    document.documentElement.style.overflow = menu.open ? 'hidden' : '';
  };
  const close = (refocus = false) => {
    if (!menu.open) return;
    menu.open = false;
    sync();
    if (refocus) summary.focus();
  };

  menu.addEventListener('toggle', sync);
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close()));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close(true);
  });
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target as Node)) close();
  });
  // Pindah ke layar lebar: tutup panel.
  window.matchMedia('(min-width: 768px)').addEventListener('change', (m) => {
    if (m.matches) close();
  });
  sync();
}
