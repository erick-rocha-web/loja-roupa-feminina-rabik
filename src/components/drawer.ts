import { getProduct, productById } from '../data/products.ts';
import { formatPrice } from '../lib/catalog.ts';
import { closeDialog, openDialog, setupDialog } from '../lib/dialog.ts';
import { $, announce, escapeHtml, icon, img } from '../lib/dom.ts';
import type { Store } from '../lib/store.ts';

type Tab = 'favorites' | 'selection';
type View = 'list' | 'summary';

export function createDrawer(store: Store) {
  const dialog = $('#drawer') as HTMLDialogElement;
  let tab: Tab = 'selection';
  let view: View = 'list';

  setupDialog(dialog, () => {
    view = 'list';
  });

  function thumb(productId: string) {
    const item = getProduct(productId);
    return `<span class="mini__thumb">${img(item.image, { sizes: '64px', alt: '' })}</span>`;
  }

  function favoritesList(): string {
    if (!store.favorites.length) {
      return `<p class="drawer__empty">Nenhum favorito ainda. Toque no coração de uma peça para guardá-la aqui.</p>`;
    }
    return `<ul class="mini-list">${store.favorites
      .map((id) => {
        const item = getProduct(id);
        return `<li class="mini">
          ${thumb(id)}
          <span class="mini__text"><strong>${escapeHtml(item.name)}</strong><span>${formatPrice(item.priceInCents)}</span></span>
          <span class="mini__actions">
            <button class="btn btn--text" type="button" data-open-product="${id}">Ver peça<span class="visually-hidden">: ${escapeHtml(item.name)}</span></button>
            <button class="icon-btn icon-btn--small" type="button" data-fav="${id}" aria-pressed="true" aria-label="Remover ${escapeHtml(item.name)} dos favoritos">${icon('close')}</button>
          </span>
        </li>`;
      })
      .join('')}</ul>`;
  }

  function selectionLines() {
    return store.selection.map((entry) => {
      const item = getProduct(entry.productId);
      const variant = item.variants.find((candidate) => candidate.id === entry.variantId)!;
      return { entry, item, variant };
    });
  }

  function selectionList(): string {
    if (!store.selection.length) {
      return `<p class="drawer__empty">Sua seleção está vazia. Abra uma peça, escolha o tamanho e use “Adicionar à seleção”.</p>`;
    }
    return `<ul class="mini-list">${selectionLines()
      .map(
        ({ entry, item, variant }) => `<li class="mini">
          ${thumb(item.id)}
          <span class="mini__text"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(variant.colorName)} · tamanho ${variant.size} · ${formatPrice(item.priceInCents)}</span></span>
          <span class="mini__actions">
            <button class="icon-btn icon-btn--small" type="button" data-remove="${entry.variantId}" aria-label="Remover ${escapeHtml(item.name)}, tamanho ${variant.size}, da seleção">${icon('close')}</button>
          </span>
        </li>`,
      )
      .join('')}</ul>
      <div class="drawer__foot">
        <button class="btn btn--primary btn--block" type="button" data-summary>Ver resumo da seleção</button>
        <p class="drawer__fine">Seleção demonstrativa. Não é pedido, reserva nem pagamento.</p>
      </div>`;
  }

  function summary(): string {
    const lines = selectionLines();
    const total = lines.reduce((sum, line) => sum + line.item.priceInCents, 0);
    return `<div class="summary">
      <p class="summary__lead">Resumo de ${lines.length === 1 ? '1 peça' : `${lines.length} peças`}</p>
      <ol class="summary__list">${lines
        .map(
          ({ item, variant }) =>
            `<li><span>${escapeHtml(item.name)}</span><span>${escapeHtml(variant.colorName)} · ${variant.size}</span><span>${formatPrice(item.priceInCents)}</span></li>`,
        )
        .join('')}</ol>
      <p class="summary__total"><span>Soma dos preços ilustrativos</span><strong>${formatPrice(total)}</strong></p>
      <div class="summary__explain">
        <p>Em um projeto real, este resumo pode ser encaminhado ao atendimento da loja, com as peças e os tamanhos escolhidos.</p>
        <p>Nesta demonstração, nada é enviado: a VÉRIA é fictícia e não há atendimento de vendas.</p>
      </div>
      <div class="summary__actions">
        <button class="btn btn--line" type="button" data-back>Voltar à seleção</button>
        <button class="btn btn--text" type="button" data-clear-selection>Limpar seleção</button>
      </div>
    </div>`;
  }

  function render() {
    const focusedKey = (document.activeElement as HTMLElement | null)?.dataset?.focusKey;
    const title = view === 'summary' ? 'Resumo da seleção' : tab === 'favorites' ? 'Favoritos' : 'Sua seleção';
    dialog.innerHTML = `<div class="drawer__panel">
      <div class="drawer__head">
        <h2 id="drawer-title" class="drawer__title">${title}</h2>
        <button class="icon-btn" type="button" data-close data-focus-key="close" aria-label="Fechar painel">${icon('close')}</button>
      </div>
      ${
        view === 'list'
          ? `<div class="drawer__tabs" role="tablist" aria-label="Favoritos e seleção">
        <button type="button" role="tab" id="tab-favorites" data-tab="favorites" data-focus-key="tab-favorites" aria-selected="${tab === 'favorites'}" aria-controls="drawer-body" tabindex="${tab === 'favorites' ? 0 : -1}">Favoritos <span>${store.favorites.length}</span></button>
        <button type="button" role="tab" id="tab-selection" data-tab="selection" data-focus-key="tab-selection" aria-selected="${tab === 'selection'}" aria-controls="drawer-body" tabindex="${tab === 'selection' ? 0 : -1}">Seleção <span>${store.selection.length}</span></button>
      </div>`
          : ''
      }
      <div class="drawer__body" id="drawer-body" ${view === 'list' ? `role="tabpanel" aria-labelledby="tab-${tab}"` : ''}>
        ${view === 'summary' ? summary() : tab === 'favorites' ? favoritesList() : selectionList()}
        ${store.persistent ? '' : '<p class="drawer__fine">O armazenamento do navegador está indisponível: favoritos e seleção valem só até fechar a página.</p>'}
      </div>
    </div>`;
    if (focusedKey) dialog.querySelector<HTMLElement>(`[data-focus-key="${focusedKey}"]`)?.focus();
    // Um item removido leva o foco junto; mantém o foco dentro do painel.
    const covered = document.querySelector('#product-dialog[open]');
    if (dialog.open && !covered && !dialog.contains(document.activeElement)) $('[data-close]', dialog).focus();
  }

  dialog.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('button');
    if (!target) return;
    if (target.matches('[data-close]')) closeDialog(dialog);
    else if (target.dataset.tab) {
      tab = target.dataset.tab as Tab;
      render();
      $(`[data-tab="${tab}"]`, dialog).focus();
    } else if (target.matches('[data-remove]')) {
      const variantId = target.dataset.remove!;
      const productId = store.selection.find((entry) => entry.variantId === variantId)?.productId;
      store.removeFromSelection(variantId);
      announce(`${productId ? productById.get(productId)?.name : 'Peça'} removida da seleção.`);
      $('[data-close]', dialog).focus();
    } else if (target.matches('[data-summary]')) {
      view = 'summary';
      render();
      $('[data-back]', dialog).focus();
    } else if (target.matches('[data-back]')) {
      view = 'list';
      render();
      $('[data-summary]', dialog).focus();
    } else if (target.matches('[data-clear-selection]')) {
      store.clearSelection();
      view = 'list';
      render();
      announce('Seleção limpa.');
      $('[data-close]', dialog).focus();
    }
  });

  dialog.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'tab' || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    tab = tab === 'favorites' ? 'selection' : 'favorites';
    render();
    $(`[data-tab="${tab}"]`, dialog).focus();
  });

  store.subscribe(() => {
    if (dialog.open) render();
  });

  return {
    open(which: Tab, opener: HTMLElement | null) {
      tab = which;
      view = 'list';
      render();
      openDialog(dialog, opener);
      $('[data-close]', dialog).focus({ preventScroll: true });
    },
  };
}
