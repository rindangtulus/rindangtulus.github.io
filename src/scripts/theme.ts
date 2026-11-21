// Sakelar tema. Pilihan eksplisit pengguna SELALU disimpan di localStorage ('light' | 'dark');
// tanpa pilihan tersimpan tema mengikuti sistem. Skrip inline di <head> (Base.astro) menerapkan
// data-theme sebelum cat pertama; modul ini mengurus tombol, aria-label, ikon, dan <meta theme-color>.
const KEY = 'theme';
type Theme = 'light' | 'dark';

export function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function storeTheme(t: Theme) {
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* penyimpanan diblokir: tema tetap berlaku untuk sesi ini */
  }
}

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

export function effectiveTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'light' || attr === 'dark') return attr;
  return systemDark() ? 'dark' : 'light';
}

// <meta name="theme-color">: bila ada pilihan eksplisit, kedua meta memakai warna --paper tema aktif
// (dibaca dari CSS, tanpa hex di JS); tanpa pilihan, nilai awal dari HTML dipulihkan.
function syncThemeColor() {
  const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  const explicit = document.documentElement.dataset.theme;
  const paper = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();
  metas.forEach((m) => {
    m.dataset.orig ??= m.content;
    m.content = explicit && paper ? paper : m.dataset.orig;
  });
}

export function initTheme(): () => void {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]'));
  const ac = new AbortController();
  const { signal } = ac;

  const render = () => {
    const dark = effectiveTheme() === 'dark';
    buttons.forEach((b) => {
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      b.querySelector<HTMLElement>('[data-theme-icon="moon"]')!.hidden = dark;
      b.querySelector<HTMLElement>('[data-theme-icon="sun"]')!.hidden = !dark;
    });
    syncThemeColor();
  };

  buttons.forEach((b) =>
    b.addEventListener(
      'click',
      () => {
        const next: Theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        storeTheme(next); // selalu simpan, termasuk bila sama dengan sistem
        render();
      },
      { signal },
    ),
  );
  // Sistem berganti tema saat tidak ada pilihan: perbarui label dan ikon.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render, { signal });
  render();
  return () => ac.abort();
}
