import '../assets/fonts/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/overlays.css';
import sprite from '../assets/brand/icons.svg?raw';
import { occasionLabels } from './data/brand.ts';
import { productById } from './data/products.ts';
import type { Occasion } from './data/types.ts';
import { createCatalog } from './components/catalog.ts';
import { createDrawer } from './components/drawer.ts';
import { createHero } from './components/hero.ts';
import { createLooks } from './components/looks.ts';
import { createProductDialog } from './components/productDialog.ts';
import { setupRabikContact, setupSectionMotion } from './components/sections.ts';
import { $, announce, reducedMotion } from './lib/dom.ts';
import { createStore } from './lib/store.ts';

document.body.insertAdjacentHTML('afterbegin', sprite.replace('<svg ', '<svg class="sprite" aria-hidden="true" '));
const syncMotionClass = () => document.documentElement.classList.toggle('motion-ok', !reducedMotion.matches);
syncMotionClass();
reducedMotion.addEventListener('change', syncMotionClass);

const store = createStore(
  (id) => productById.has(id),
  (productId, variantId) => Boolean(productById.get(productId)?.variants.some((variant) => variant.id === variantId)),
);

const catalog = createCatalog(store);
const drawer = createDrawer(store);
const productDialog = createProductDialog(store, (opener) => drawer.open('selection', opener));
createHero();
createLooks(store);
setupSectionMotion();
setupRabikContact();

function scrollToId(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
}

// Contadores do header e estado dos corações em toda a página.
function syncCounts() {
  const favorites = store.favorites.length;
  const selection = store.selection.length;
  for (const [key, value, label] of [
    ['favorites', favorites, 'Favoritos'],
    ['selection', selection, 'Seleção'],
  ] as const) {
    const badge = $(`[data-count="${key}"]`);
    badge.textContent = String(value);
    badge.hidden = value === 0;
    badge.closest('button')?.setAttribute('aria-label', `${label}, ${value === 1 ? '1 peça' : `${value} peças`}`);
  }
  document.querySelectorAll<HTMLElement>('[data-fav]').forEach((button) => {
    button.setAttribute('aria-pressed', String(store.isFavorite(button.dataset.fav!)));
  });
}
store.subscribe(syncCounts);
syncCounts();

// Delegação global: abrir peça, favoritar, filtros de ocasião, painéis.
document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('button, a');
  if (!target) return;

  if (target.dataset.openProduct) {
    // A imagem do card é um atalho de mouse; o foco volta ao botão "Ver peça".
    const opener = target.classList.contains('card__image')
      ? target.closest('.card')?.querySelector<HTMLElement>('.card__open') ?? null
      : target;
    productDialog.open(target.dataset.openProduct, opener);
    return;
  }
  if (target.dataset.fav) {
    const id = target.dataset.fav;
    store.toggleFavorite(id);
    if (store.isFavorite(id)) {
      target.classList.remove('is-burst');
      void target.offsetWidth;
      target.classList.add('is-burst');
      window.setTimeout(() => target.classList.remove('is-burst'), 600);
    }
    const name = productById.get(id)?.name ?? 'Peça';
    announce(store.isFavorite(id) ? `${name} salva nos favoritos.` : `${name} removida dos favoritos.`);
    return;
  }
  if (target.dataset.occasion && !target.closest('[data-filters]')) {
    const occasion = target.dataset.occasion as Occasion;
    catalog.showOccasion(occasion);
    announce(`Catálogo filtrado por ${occasionLabels[occasion]}.`);
    scrollToId('colecao');
    return;
  }
  if (target.dataset.action === 'open-drawer') {
    drawer.open(target.dataset.tab === 'favorites' ? 'favorites' : 'selection', target);
    return;
  }
  if (target.dataset.action === 'search') {
    closeMenu();
    scrollToId('colecao');
    catalog.focusSearch();
  }
});

// Menu mobile.
const menuToggle = $('.menu-toggle');
const nav = $('#site-nav');
function closeMenu() {
  if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuToggle.querySelector('use')?.setAttribute('href', '#icon-menu');
  nav.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuToggle.querySelector('use')?.setAttribute('href', open ? '#icon-close' : '#icon-menu');
  nav.classList.toggle('is-open', open);
  if (open) nav.querySelector<HTMLElement>('a')?.focus();
});
nav.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) {
    closeMenu();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 900px)').addEventListener('change', closeMenu);

// Só agora os estados iniciais ocultos das animações passam a valer.
document.documentElement.classList.add('js-ready');
