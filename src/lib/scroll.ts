/**
 * Um único laço de scroll para todos os efeitos ligados à rolagem.
 * Cada efeito recebe um progresso 0..1 e só é calculado enquanto o elemento
 * está perto da área visível. Nada intercepta a roda do mouse ou o toque:
 * o scroll continua nativo e os efeitos apenas leem a posição.
 */
type Effect = {
  element: HTMLElement;
  progress: (rect: DOMRect, viewport: number) => number;
  apply: (value: number) => void;
  enabled: () => boolean;
  last: number;
};

const effects: Effect[] = [];
const active = new Set<Effect>();
let frame = 0;

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const effect = effects.find((item) => item.element === entry.target);
      if (!effect) continue;
      if (entry.isIntersecting) active.add(effect);
      else active.delete(effect);
    }
    schedule();
  },
  { rootMargin: '20% 0px 20% 0px' },
);

function update() {
  frame = 0;
  const viewport = window.innerHeight;
  for (const effect of active) {
    if (!effect.enabled()) continue;
    const value = Math.min(1, Math.max(0, effect.progress(effect.element.getBoundingClientRect(), viewport)));
    if (Math.abs(value - effect.last) < 0.0005) continue;
    effect.last = value;
    effect.apply(value);
  }
}

export function schedule() {
  if (!frame) frame = window.requestAnimationFrame(update);
}

/** Força o recálculo de todos os efeitos (ex.: mudança de breakpoint). */
export function refresh() {
  for (const effect of effects) effect.last = -1;
  schedule();
}

window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', refresh, { passive: true });

export function onScrollProgress(
  element: HTMLElement,
  apply: (value: number) => void,
  options: { progress?: Effect['progress']; enabled?: () => boolean } = {},
) {
  const effect: Effect = {
    element,
    apply,
    progress: options.progress ?? throughViewport,
    enabled: options.enabled ?? (() => true),
    last: -1,
  };
  effects.push(effect);
  observer.observe(element);
}

/** 0 quando o topo do elemento entra pela base da tela; 1 quando a base sai pelo topo. */
export function throughViewport(rect: DOMRect, viewport: number): number {
  return (viewport - rect.top) / (viewport + rect.height);
}

/** Revela uma vez quando o elemento entra na tela. */
export function onEnter(elements: Iterable<Element>, callback: (element: Element) => void, threshold = 0.15) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        callback(entry.target);
      }
    },
    { threshold, rootMargin: '0px 0px -8% 0px' },
  );
  for (const element of elements) io.observe(element);
  return io;
}
