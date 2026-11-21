// Scroll spy: item aktif pada pil nav mengikuti bagian yang sedang dibaca.
// Berbasis posisi scroll (bukan IntersectionObserver) supaya bagian pendek
// dan bagian terakhir tetap bisa menjadi aktif.
// Pil nav dipertahankan antar halaman (transition:persist), jadi tanpa bagian target
// (mis. halaman studi kasus) semua aria-current dibersihkan.
export function initScrollSpy(): () => void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy]'));
  const clear = () => links.forEach((a) => a.removeAttribute('aria-current'));
  const ids = Array.from(new Set(links.map((a) => a.dataset.spy!)));
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  if (!sections.length) {
    clear();
    return () => {};
  }

  const ac = new AbortController();
  let current: string | null = null;
  let ticking = false;

  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.35;
    let active: string | null = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) active = s.id;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) active = sections[sections.length - 1].id;
    if (active === current) return;
    current = active;
    for (const a of links) {
      if (a.dataset.spy === active) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true, signal: ac.signal });
  window.addEventListener('resize', onScroll, { signal: ac.signal });
  update();
  return () => ac.abort();
}
