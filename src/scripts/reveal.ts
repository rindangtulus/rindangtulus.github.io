// Reveal-on-scroll: elemen [data-reveal] muncul sekali saja saat masuk viewport.
// Container [data-reveal-group] memberi stagger otomatis ke anak langsungnya.
// Mengembalikan fungsi cleanup (dipanggil sebelum navigasi ClientRouter berikutnya).
export function initReveal(): () => void {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--i', String(i));
    });
  });

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
