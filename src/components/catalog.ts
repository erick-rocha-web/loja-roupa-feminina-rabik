import { categoryLabels, occasionLabels } from '../data/brand.ts';
import { products } from '../data/products.ts';
import type { Category, Occasion, Product } from '../data/types.ts';
import { availableSizes, emptyFilters, filterProducts, formatPrice, isDefault, type Filters } from '../lib/catalog.ts';
import { $, escapeHtml, icon, img, reducedMotion } from '../lib/dom.ts';
import { onEnter } from '../lib/scroll.ts';
import type { Store } from '../lib/store.ts';

export function favoriteButton(item: Product, store: Store, extraClass = ''): string {
  const pressed = store.isFavorite(item.id);
  return `<button class="fav-btn ${extraClass}" type="button" data-fav="${item.id}" aria-pressed="${pressed}" aria-label="Favoritar ${escapeHtml(item.name)}">${icon('heart')}</button>`;
}

function card(item: Product, store: Store): string {
  return `<li class="card" data-id="${item.id}" style="view-transition-name: card-${item.id}; view-transition-class: card">
    <div class="card__media">
      <button class="card__image" type="button" tabindex="-1" aria-hidden="true" data-open-product="${item.id}">
        ${img(item.image, { sizes: '(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 700px) 31vw, 46vw' })}
      </button>
      ${favoriteButton(item, store, 'fav-btn--card')}
    </div>
    <div class="card__body">
      <p class="card__category">${categoryLabels[item.category]}</p>
      <h3 class="card__name">${escapeHtml(item.name)}</h3>
      <p class="card__price">${formatPrice(item.priceInCents)}</p>
      <button class="card__open" type="button" data-open-product="${item.id}">
        Ver peça<span class="visually-hidden">: ${escapeHtml(item.name)}</span>${icon('arrow-right')}
      </button>
    </div>
  </li>`;
}

function chips<T extends string>(name: string, options: [T | 'all', string][], current: string): string {
  return options
    .map(
      ([value, label]) =>
        `<button type="button" class="chip" data-${name}="${value}" aria-pressed="${value === current}">${label}</button>`,
    )
    .join('');
}

export function createCatalog(store: Store) {
  const section = $('#colecao');
  const form = $('[data-filters]', section) as HTMLFormElement;
  const grid = $('[data-grid]', section);
  const empty = $('[data-empty]', section);
  const countLabel = $('[data-count-label]', section);
  const clear = $('[data-clear]', section);
  const search = $('#catalog-search', section) as HTMLInputElement;
  const sizeSelect = $('select[data-filter="size"]', section) as HTMLSelectElement;
  const categoryBox = $('[data-filter="category"]', section);
  const occasionBox = $('[data-filter="occasion"]', section);

  let filters: Filters = { ...emptyFilters };

  // Opções derivadas dos dados: só aparecem categorias, ocasiões e tamanhos existentes.
  const usedCategories = (Object.keys(categoryLabels) as Category[]).filter((key) =>
    products.some((item) => item.category === key),
  );
  const usedOccasions = (Object.keys(occasionLabels) as Occasion[]).filter((key) =>
    products.some((item) => item.occasions.includes(key)),
  );

  function renderControls() {
    if (categoryBox.childElementCount) {
      // Depois da primeira renderização, só o estado muda: o foco do teclado fica onde está.
      categoryBox.querySelectorAll<HTMLElement>('[data-category]').forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.category === filters.category)));
      occasionBox.querySelectorAll<HTMLElement>('[data-occasion]').forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.occasion === filters.occasion)));
      return;
    }
    categoryBox.innerHTML = chips('category', [['all', 'Todas'], ...usedCategories.map((key) => [key, categoryLabels[key]] as [Category, string])], filters.category);
    occasionBox.innerHTML = chips('occasion', [['all', 'Todas'], ...usedOccasions.map((key) => [key, occasionLabels[key]] as [Occasion, string])], filters.occasion);
  }

  sizeSelect.innerHTML = [`<option value="all">Todos</option>`, ...availableSizes(products).map((size) => `<option value="${size}">${size}</option>`)].join('');
  grid.innerHTML = products.map((item) => card(item, store)).join('');

  function apply(animate = true) {
    const visible = new Set(filterProducts(products, filters, categoryLabels).map((item) => item.id));
    const update = () => {
      for (const element of grid.children as HTMLCollectionOf<HTMLElement>) {
        element.hidden = !visible.has(element.dataset.id ?? '');
      }
      empty.hidden = visible.size > 0;
      grid.hidden = visible.size === 0;
      countLabel.textContent =
        visible.size === 0 ? 'Nenhuma peça' : visible.size === 1 ? '1 peça' : `${visible.size} peças`;
      clear.hidden = isDefault(filters);
      renderControls();
      search.value = filters.query;
      sizeSelect.value = filters.size;
    };
    const canTransition = animate && !reducedMotion.matches && 'startViewTransition' in document;
    if (canTransition) {
      grid.classList.add('is-filtering');
      // Mantém a posição da página: a grade não encolhe durante a reorganização.
      grid.style.minHeight = `${grid.offsetHeight}px`;
      const transition = document.startViewTransition(update);
      transition.finished.finally(() => {
        grid.classList.remove('is-filtering');
        grid.style.minHeight = '';
      });
    } else {
      update();
    }
  }

  form.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-category], button[data-occasion]');
    if (!target) return;
    if (target.dataset.category) filters = { ...filters, category: target.dataset.category as Filters['category'] };
    if (target.dataset.occasion) filters = { ...filters, occasion: target.dataset.occasion as Filters['occasion'] };
    apply();
  });

  sizeSelect.addEventListener('change', () => {
    filters = { ...filters, size: sizeSelect.value };
    apply();
  });

  let searchTimer = 0;
  search.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      filters = { ...filters, query: search.value };
      apply(false);
    }, 140);
  });

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', (event) => {
    event.preventDefault();
    reset();
    search.focus();
  });
  $('[data-clear-empty]', section).addEventListener('click', () => {
    reset();
    search.focus();
  });

  function reset() {
    filters = { ...emptyFilters };
    apply();
  }

  // Entrada em grupos: cada linha visível entra em sequência curta.
  if (!reducedMotion.matches) {
    grid.classList.add('has-entrance');
    let batch: Element[] = [];
    let timer = 0;
    onEnter(grid.children, (element) => {
      batch.push(element);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        batch.forEach((item, index) => {
          (item as HTMLElement).style.setProperty('--delay', `${Math.min(index, 7) * 55}ms`);
          item.classList.add('is-in');
        });
        batch = [];
      }, 40);
    });
  }

  renderControls();
  apply(false);

  return {
    showOccasion(occasion: Occasion) {
      filters = { ...emptyFilters, occasion };
      apply(false);
    },
    focusSearch() {
      search.focus({ preventScroll: true });
    },
    get filters() {
      return filters;
    },
  };
}
