import type { Media } from '../data/types.ts';

export function srcset(media: Media): string {
  return media.widths
    .map((width) => `${media.src.replace(/\.webp$/, `-${width}.webp`)} ${width}w`)
    .join(', ');
}

type ImgOptions = { sizes: string; className?: string; eager?: boolean; lazy?: boolean; alt?: string };

/** `<img>` responsivo com dimensões reservadas para evitar saltos de layout. */
export function img(media: Media, options: ImgOptions): string {
  const position = media.objectPosition ? ` style="object-position:${media.objectPosition}"` : '';
  const loading = options.eager ? 'fetchpriority="high"' : options.lazy === false ? '' : 'loading="lazy"';
  const alt = options.alt ?? media.alt;
  return `<img src="${media.src.replace(/\.webp$/, `-${media.widths[1]}.webp`)}" srcset="${srcset(media)}" sizes="${options.sizes}" width="${media.width}" height="${media.height}" alt="${escapeHtml(alt)}" ${loading} decoding="async"${options.className ? ` class="${options.className}"` : ''}${position}>`;
}

export function icon(name: string, label?: string): string {
  const a11y = label ? `role="img" aria-label="${escapeHtml(label)}"` : 'aria-hidden="true"';
  return `<svg class="icon" ${a11y} focusable="false"><use href="#icon-${name}"></use></svg>`;
}

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

export function $(selector: string, root: ParentNode = document): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector);
  if (!element) throw new Error(`Elemento ausente: ${selector}`);
  return element;
}

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Mensagem curta para leitores de tela e um aviso visual discreto. */
export function announce(message: string) {
  const live = document.getElementById('live');
  const toast = document.getElementById('toast');
  if (live) {
    live.textContent = '';
    window.setTimeout(() => (live.textContent = message), 30);
  }
  if (toast) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(Number(toast.dataset.timer));
    toast.dataset.timer = String(window.setTimeout(() => toast.classList.remove('is-visible'), 2600));
  }
}
