import { looks } from '../data/looks.ts';
import { getProduct, products } from '../data/products.ts';
import { formatPrice } from '../lib/catalog.ts';
import { $, escapeHtml, icon, img } from '../lib/dom.ts';
import { onEnter, onScrollProgress, refresh } from '../lib/scroll.ts';

/**
 * Hero editorial em três tempos:
 * 1. Abertura (CSS, ~1 s): título por linhas dentro de máscara e foto
 *    principal entrando com ajuste de escala e enquadramento.
 * 2. Desktop ≥1024 × 620: timeline presa por cerca de uma tela de rolagem
 *    (seção com 2 alturas de tela, descontado o cabeçalho). O JS escreve só
 *    `--p` (0..1); o CSS deriva as fases e as transformações.
 * 3. Celular, tablet e telas baixas: sequência vertical sem fixação, com
 *    entradas por IntersectionObserver.
 * Com motion reduzido, ou se o JS falhar, a composição final fica estática.
 */
const TIMELINE_QUERY = '(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)';

export function createHero() {
  const hero = $('#inicio');
  const stage = $('.hero__stage', hero);
  const list = $('[data-hero-pieces]', hero);

  // Peças do look da foto principal (camisa e jeans).
  list.innerHTML = looks[0].productIds
    .map((id, i) => {
      const item = getProduct(id);
      return `<li class="hero-piece" style="--i:${i}">
        <button type="button" class="hero-piece__btn" data-open-product="${id}">
          <span class="hero-piece__img">${img(item.image, { sizes: '(min-width: 1024px) 140px, 40vw', alt: '' })}</span>
          <span class="hero-piece__text"><strong>${escapeHtml(item.name)}</strong><span>${formatPrice(item.priceInCents)}</span></span>
          ${icon('arrow-right')}
        </button>
      </li>`;
    })
    .join('');
  $('[data-hero-count]', hero).textContent = `· ${products.length} peças`;

  const query = window.matchMedia(TIMELINE_QUERY);
  let enabled = false;
  let stickyTop = 0;

  function setMode() {
    enabled = query.matches;
    hero.classList.toggle('is-timeline', enabled);
    if (!enabled) {
      hero.style.removeProperty('--p');
      hero.classList.remove('has-pieces');
    }
    stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
    refresh();
  }

  onScrollProgress(
    hero,
    (value) => {
      hero.style.setProperty('--p', value.toFixed(4));
      // As peças só recebem clique depois de visíveis; o foco por teclado as revela antes.
      hero.classList.toggle('has-pieces', value > 0.6);
    },
    {
      enabled: () => enabled,
      progress: (rect) => {
        const distance = rect.height - stage.offsetHeight;
        return distance > 0 ? (stickyTop - rect.top) / distance : 1;
      },
    },
  );

  // Sem timeline: cada bloco entra quando aparece na rolagem vertical.
  onEnter(hero.querySelectorAll('.hero__second, .hero__pieces, .hero__handoff'), (element) => element.classList.add('is-in'), 0.25);

  // Um único listener: trocar de breakpoint liga/desliga a mesma timeline.
  query.addEventListener('change', setMode);
  window.addEventListener('resize', () => {
    if (enabled) stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
  }, { passive: true });
  setMode();
}
