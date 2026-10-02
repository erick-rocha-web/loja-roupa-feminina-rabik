import { brand, occasionLabels } from '../data/brand.ts';
import { looks } from '../data/looks.ts';
import { getProduct } from '../data/products.ts';
import type { Look } from '../data/types.ts';
import { formatPrice } from '../lib/catalog.ts';
import { $, announce, escapeHtml, icon, img, reducedMotion } from '../lib/dom.ts';
import type { SelectionItem, Store } from '../lib/store.ts';

export function createLooks(store: Store) {
  const root = $('[data-looks]');
  let index = 0;

  root.innerHTML = `<div class="looks__layout">
    <div class="looks__stage" data-stage>
      ${looks
        .map(
          (look, i) =>
            `<figure class="look-photo${i === 0 ? ' is-active' : ''}" data-photo="${look.id}" ${i === 0 ? '' : 'aria-hidden="true"'}>${img(look.image, { sizes: '(min-width: 1024px) 560px, 92vw' })}</figure>`,
        )
        .join('')}
      <p class="looks__badge">${brand.lookNotice}</p>
    </div>
    <div class="looks__tabs" role="tablist" aria-label="Escolha uma combinação">
        ${looks
          .map(
            (look, i) =>
              `<button type="button" role="tab" id="look-tab-${look.id}" aria-controls="look-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-look="${i}">
                <span class="looks__tab-occasion">${occasionLabels[look.occasion]}</span>
                <span class="looks__tab-title">${escapeHtml(look.title)}</span>
              </button>`,
          )
          .join('')}
    </div>
    <div class="look" id="look-panel" role="tabpanel" aria-labelledby="look-tab-${looks[0].id}" data-panel></div>
  </div>`;

  const panel = $('[data-panel]', root);
  const stage = $('[data-stage]', root);

  function renderPanel(look: Look) {
    const pieces = look.productIds.map(getProduct);
    const total = pieces.reduce((sum, item) => sum + item.priceInCents, 0);
    panel.innerHTML = `
      <p class="look__note">${escapeHtml(look.note)}</p>
      <ul class="look__pieces">
        ${pieces
          .map(
            (item, i) => `<li class="piece" style="--i:${i}">
              <span class="piece__thumb">${img(item.image, { sizes: '72px', alt: '' })}</span>
              <span class="piece__text">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${formatPrice(item.priceInCents)}</span>
              </span>
              <label class="piece__size">
                <span class="visually-hidden">Tamanho de ${escapeHtml(item.name)}</span>
                <select data-piece-size="${item.id}">
                  <option value="">Tamanho</option>
                  ${item.variants.map((variant) => `<option value="${variant.id}">${variant.size}</option>`).join('')}
                </select>
              </label>
              <button class="btn btn--text piece__open" type="button" data-open-product="${item.id}">Ver peça<span class="visually-hidden">: ${escapeHtml(item.name)}</span></button>
            </li>`,
          )
          .join('')}
      </ul>
      <div class="look__add">
        <button class="btn btn--primary" type="button" data-add-look>${icon('selection')} Adicionar ${pieces.length > 1 ? 'o conjunto' : 'a peça'} à seleção</button>
        <span class="look__total">${pieces.length > 1 ? `${pieces.length} peças · ` : ''}${formatPrice(total)} <small>ilustrativo</small></span>
      </div>
      <p class="look__error" data-look-error hidden></p>
      <div class="look__also">
        <span>Também combina com</span>
        ${look.alsoMatches
          .map((id) => `<button class="chip chip--small" type="button" data-open-product="${id}">${escapeHtml(getProduct(id).name)}</button>`)
          .join('')}
      </div>`;
  }

  function select(next: number, focus = false) {
    index = (next + looks.length) % looks.length;
    const look = looks[index];
    // Foto e lista mudam no mesmo quadro; a animação é só visual.
    root.querySelectorAll<HTMLElement>('[role="tab"]').forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      if (focus && i === index) tab.focus();
    });
    stage.querySelectorAll<HTMLElement>('[data-photo]').forEach((photo) => {
      const active = photo.dataset.photo === look.id;
      // A foto que sai fica por baixo, esmaecendo, enquanto a próxima entra.
      const leaving = photo.classList.contains('is-active') && !active;
      photo.classList.toggle('is-leaving', leaving);
      if (!leaving && !active) photo.classList.remove('is-leaving');
      photo.classList.toggle('is-active', active);
      if (active) photo.removeAttribute('aria-hidden');
      else photo.setAttribute('aria-hidden', 'true');
    });
    panel.setAttribute('aria-labelledby', `look-tab-${look.id}`);
    panel.classList.remove('is-switching');
    if (!reducedMotion.matches) {
      void panel.offsetWidth;
      panel.classList.add('is-switching');
    }
    renderPanel(look);
  }

  root.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('button');
    if (!target) return;
    if (target.dataset.look) select(Number(target.dataset.look));
    if (target.matches('[data-add-look]')) {
      const look = looks[index];
      const error = $('[data-look-error]', panel);
      const items: SelectionItem[] = [];
      for (const productId of look.productIds) {
        const select = panel.querySelector<HTMLSelectElement>(`[data-piece-size="${productId}"]`);
        if (!select?.value) {
          error.textContent = `Escolha o tamanho de ${getProduct(productId).name}.`;
          error.hidden = false;
          select?.focus();
          return;
        }
        items.push({ productId, variantId: select.value });
      }
      error.hidden = true;
      const added = store.addToSelection(items);
      announce(added ? `${added === 1 ? '1 peça adicionada' : `${added} peças adicionadas`} à seleção.` : 'Essas peças já estão na seleção.');
    }
  });

  root.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'tab') return;
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: looks.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  });

  renderPanel(looks[0]);
}
