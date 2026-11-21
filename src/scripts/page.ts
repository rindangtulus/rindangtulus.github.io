// Satu titik masuk untuk semua inisialisasi halaman (dipakai Base.astro).
// Dengan <ClientRouter />, skrip modul hanya berjalan sekali, jadi inisialisasi dipasang di
// `astro:page-load` dan dibersihkan di `astro:before-swap`: tidak ada listener ganda.
import { initReveal } from './reveal';
import { initScrollSpy } from './scrollspy';
import { initMenu } from './menu';
import { initCopy } from './copy';
import { initTheme } from './theme';

let cleanups: Array<() => void> = [];
const teardown = () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
};

export function setupPages() {
  document.addEventListener('astro:before-swap', (e) => {
    teardown();
    const next = (e as Event & { newDocument: Document }).newDocument.documentElement;
    // Astro mengganti atribut <html> dengan milik dokumen baru: pertahankan kelas `js` dan data-theme.
    next.classList.add('js');
    const theme = document.documentElement.dataset.theme;
    if (theme) next.dataset.theme = theme;
    else delete next.dataset.theme;
  });
  document.addEventListener('astro:page-load', () => {
    teardown(); // jaga-jaga bila page-load datang tanpa before-swap
    cleanups = [initReveal(), initScrollSpy(), initMenu(), initCopy(), initTheme()];
  });
}
