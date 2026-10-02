/**
 * Diálogos nativos em modo modal: o navegador torna o resto da página inerte
 * (contenção de foco) e fecha com Escape. Aqui garantimos o retorno do foco
 * ao controle que abriu, o fechamento pelo fundo e o bloqueio do scroll de
 * fundo sem perder a posição da página.
 */
const openers = new WeakMap<HTMLDialogElement, HTMLElement | null>();

function syncLock() {
  const anyOpen = document.querySelector('dialog[open]');
  document.documentElement.classList.toggle('is-locked', Boolean(anyOpen));
}

export function setupDialog(dialog: HTMLDialogElement, onClose?: () => void) {
  dialog.addEventListener('click', (event) => {
    // Clique no fundo (fora do conteúdo) fecha.
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    syncLock();
    onClose?.();
    const opener = openers.get(dialog);
    openers.delete(dialog);
    if (opener && opener.isConnected && opener.offsetParent !== null) {
      opener.focus({ preventScroll: true });
    } else {
      // O controle de origem foi recriado: mantém o foco no diálogo que ficou por baixo.
      const below = [...document.querySelectorAll<HTMLDialogElement>('dialog[open]')].pop();
      below?.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });
    }
  });
}

export function openDialog(dialog: HTMLDialogElement, opener: HTMLElement | null) {
  if (!dialog.open) {
    openers.set(dialog, opener);
    dialog.showModal();
  }
  syncLock();
  const first = dialog.querySelector<HTMLElement>('[data-autofocus]');
  first?.focus({ preventScroll: true });
}

export function closeDialog(dialog: HTMLDialogElement) {
  if (!dialog.open) return;
  dialog.classList.add('is-closing');
  const finish = () => {
    dialog.classList.remove('is-closing');
    dialog.close();
  };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) finish();
  else window.setTimeout(finish, 160);
}
