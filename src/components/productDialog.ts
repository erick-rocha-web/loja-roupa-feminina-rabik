import { categoryLabels, occasionLabels } from '../data/brand.ts';
import { getProduct } from '../data/products.ts';
import { sizeGuides, sizingNote } from '../data/sizing.ts';
import type { Product, Variant } from '../data/types.ts';
import { formatPrice } from '../lib/catalog.ts';
import { closeDialog, openDialog, setupDialog } from '../lib/dialog.ts';
import { $, announce, escapeHtml, icon, img } from '../lib/dom.ts';
import type { Store } from '../lib/store.ts';
import { favoriteButton } from './catalog.ts';

function uniqueColors(item: Product): Variant[] {
  const seen = new Map<string, Variant>();
  for (const variant of item.variants) if (!seen.has(variant.colorName)) seen.set(variant.colorName, variant);
  return [...seen.values()];
}

function sizeGuide(item: Product): string {
  const table = sizeGuides[item.sizeGuide];
  return `<details class="pd__guide">
    <summary>Guia de medidas (exemplo)${icon('chevron-down')}</summary>
    <table>
      <caption>${table.title}, em centímetros</caption>
      <thead><tr><th scope="col">Tamanho</th>${table.columns.map((column) => `<th scope="col">${column.label}</th>`).join('')}</tr></thead>
      <tbody>${table.rows
        .map(
          (row) =>
            `<tr><th scope="row">${row.size}</th>${table.columns.map((column) => `<td>${row.values[column.key]}</td>`).join('')}</tr>`,
        )
        .join('')}</tbody>
    </table>
    <p>${sizingNote}</p>
  </details>`;
}

export function createProductDialog(store: Store, onOpenSelection: (opener: HTMLElement | null) => void) {
  const dialog = $('#product-dialog') as HTMLDialogElement;
  let current: Product | null = null;
  let lastOpener: HTMLElement | null = null;
  let color = '';
  let size = '';

  setupDialog(dialog, () => {
    current = null;
  });

  function selectedVariant(): Variant | undefined {
    return current?.variants.find((variant) => variant.colorName === color && variant.size === size);
  }

  function updateSummary() {
    if (!current) return;
    const summary = $('[data-summary]', dialog);
    const add = $('[data-add]', dialog) as HTMLButtonElement;
    const variant = selectedVariant();
    const inSelection = variant ? store.hasVariant(variant.id) : false;
    summary.innerHTML = variant
      ? `<strong>${escapeHtml(current.name)}</strong> · ${escapeHtml(variant.colorName)} · tamanho ${variant.size} · ${formatPrice(current.priceInCents)}`
      : `${escapeHtml(color)} · escolha um tamanho para adicionar à seleção.`;
    add.innerHTML = inSelection ? `${icon('check')} Na seleção` : `${icon('selection')} Adicionar à seleção`;
    add.classList.toggle('is-done', inSelection);
    $('[data-view-selection]', dialog).hidden = !inSelection;
  }

  function render(item: Product) {
    const colors = uniqueColors(item);
    color = colors[0].colorName;
    size = '';
    const sizes = item.variants.filter((variant) => variant.colorName === color);
    const media = item.detailImage
      ? `<div class="pd__views" role="group" aria-label="Imagens da peça">
          <button type="button" class="pd__view" data-view="main" aria-pressed="true">Peça</button>
          <button type="button" class="pd__view" data-view="detail" aria-pressed="false">Detalhe ilustrativo</button>
        </div>`
      : '';

    dialog.innerHTML = `<div class="pd">
      <button class="icon-btn pd__close" type="button" data-close aria-label="Fechar detalhes">${icon('close')}</button>
      <div class="pd__media">
        <div class="pd__frame" data-frame="main">${img(item.image, { sizes: '(min-width: 900px) 440px, 90vw', lazy: false })}</div>
        ${item.detailImage ? `<div class="pd__frame pd__frame--detail" data-frame="detail" hidden>${img(item.detailImage, { sizes: '(min-width: 900px) 440px, 90vw', lazy: false })}</div>` : ''}
        ${media}
      </div>
      <div class="pd__info">
        <p class="pd__meta">${categoryLabels[item.category]} · ${item.occasions.map((key) => occasionLabels[key]).join(', ')}</p>
        <h2 id="pd-title" class="pd__title">${escapeHtml(item.name)}</h2>
        <p class="pd__price">${formatPrice(item.priceInCents)} <span>preço ilustrativo</span></p>
        <p class="pd__desc">${escapeHtml(item.description)}</p>

        <fieldset class="pd__field">
          <legend>Cor</legend>
          <div class="pd__colors">
            ${colors
              .map(
                (variant) =>
                  `<label class="swatch"><input type="radio" name="pd-color" value="${escapeHtml(variant.colorName)}" checked><span class="swatch__dot" style="--swatch:${variant.colorHex}"></span>${escapeHtml(variant.colorName)}</label>`,
              )
              .join('')}
          </div>
          <p class="pd__hint">Única cor fotografada nesta demonstração.</p>
        </fieldset>

        <fieldset class="pd__field" data-sizes>
          <legend>Tamanho</legend>
          <div class="pd__sizes">
            ${sizes
              .map(
                (variant) =>
                  `<label class="size"><input type="radio" name="pd-size" value="${variant.size}"><span>${variant.size}</span></label>`,
              )
              .join('')}
          </div>
        </fieldset>

        <p class="pd__summary" data-summary aria-live="polite"></p>
        <p class="pd__error" data-error hidden>Escolha um tamanho antes de adicionar.</p>

        <div class="pd__actions">
          <button class="btn btn--primary" type="button" data-add></button>
          ${favoriteButton(item, store, 'fav-btn--labeled')}
        </div>
        <button class="btn btn--text pd__view-selection" type="button" data-view-selection hidden>Ver seleção</button>
        ${sizeGuide(item)}
        <p class="pd__note">Produto demonstrativo. Sem estoque, reserva ou venda.</p>
      </div>
    </div>`;
    updateSummary();
  }

  dialog.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name === 'pd-size') {
      size = input.value;
      $('[data-error]', dialog).hidden = true;
    }
    if (input.name === 'pd-color') color = input.value;
    updateSummary();
  });

  dialog.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('button');
    if (!target || !current) return;
    if (target.matches('[data-close]')) closeDialog(dialog);
    if (target.matches('[data-view]')) {
      const view = target.dataset.view;
      dialog.querySelectorAll<HTMLElement>('[data-frame]').forEach((frame) => (frame.hidden = frame.dataset.frame !== view));
      dialog.querySelectorAll<HTMLElement>('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button === target)));
    }
    if (target.matches('[data-add]')) {
      const variant = selectedVariant();
      if (!variant) {
        $('[data-error]', dialog).hidden = false;
        dialog.querySelector<HTMLInputElement>('input[name="pd-size"]')?.focus();
        return;
      }
      if (store.addToSelection([{ productId: current.id, variantId: variant.id }])) {
        announce(`${current.name}, tamanho ${variant.size}, adicionado à seleção.`);
      }
      updateSummary();
    }
    if (target.matches('[data-view-selection]')) {
      const opener = lastOpener;
      dialog.close();
      onOpenSelection(opener);
    }
  });

  store.subscribe(() => {
    if (current && dialog.open) updateSummary();
  });

  return {
    open(productId: string, opener: HTMLElement | null) {
      current = getProduct(productId);
      lastOpener = opener;
      render(current);
      openDialog(dialog, opener);
      $('[data-close]', dialog).focus({ preventScroll: true });
      dialog.scrollTop = 0;
      dialog.querySelector('.pd__info')?.scrollTo?.(0, 0);
    },
  };
}
