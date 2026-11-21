// Tombol salin alamat email: [data-copy] berisi teks yang disalin; [data-copy-status] adalah live region.
export function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const status = document.querySelector<HTMLElement>('[data-copy-status]');
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy ?? '';
      try {
        await navigator.clipboard.writeText(text);
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to clipboard.';
      } catch {
        if (status) status.textContent = `Copy failed. The address is ${text}.`;
      }
      setTimeout(() => {
        if (label) label.textContent = 'Copy address';
        if (status) status.textContent = '';
      }, 2200);
    });
  });
}
