/**
 * Favoritos e seleção locais. Funcionam em memória quando o armazenamento do
 * navegador está bloqueado e descartam dados antigos, corrompidos ou que
 * apontem para produtos e variantes que não existem mais.
 */
export type SelectionItem = { productId: string; variantId: string };

type State = { favorites: string[]; selection: SelectionItem[] };

const KEY = 'veria-demo:v1';

export function sanitizeState(raw: unknown, isProduct: (id: string) => boolean, isVariant: (productId: string, variantId: string) => boolean): State {
  const state: State = { favorites: [], selection: [] };
  if (!raw || typeof raw !== 'object') return state;
  const data = raw as Record<string, unknown>;
  if (Array.isArray(data.favorites)) {
    state.favorites = [...new Set(data.favorites.filter((id): id is string => typeof id === 'string' && isProduct(id)))];
  }
  if (Array.isArray(data.selection)) {
    const seen = new Set<string>();
    for (const entry of data.selection) {
      if (!entry || typeof entry !== 'object') continue;
      const { productId, variantId } = entry as Record<string, unknown>;
      if (typeof productId !== 'string' || typeof variantId !== 'string') continue;
      if (!isVariant(productId, variantId) || seen.has(variantId)) continue;
      seen.add(variantId);
      state.selection.push({ productId, variantId });
    }
  }
  return state;
}

function readStorage(): unknown {
  try {
    const text = window.localStorage.getItem(KEY);
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export function createStore(isProduct: (id: string) => boolean, isVariant: (productId: string, variantId: string) => boolean) {
  let state = sanitizeState(readStorage(), isProduct, isVariant);
  let persistent = true;
  const listeners = new Set<() => void>();

  function commit(next: State) {
    state = next;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
      persistent = true;
    } catch {
      persistent = false;
    }
    listeners.forEach((listener) => listener());
  }

  return {
    get favorites() {
      return state.favorites;
    },
    get selection() {
      return state.selection;
    },
    get persistent() {
      return persistent;
    },
    isFavorite: (id: string) => state.favorites.includes(id),
    toggleFavorite(id: string) {
      const favorites = state.favorites.includes(id)
        ? state.favorites.filter((item) => item !== id)
        : [...state.favorites, id];
      commit({ ...state, favorites });
    },
    hasVariant: (variantId: string) => state.selection.some((item) => item.variantId === variantId),
    /** Retorna quantos itens foram realmente incluídos (variantes repetidas são ignoradas). */
    addToSelection(items: SelectionItem[]): number {
      const fresh = items.filter((item) => !state.selection.some((current) => current.variantId === item.variantId));
      if (fresh.length) commit({ ...state, selection: [...state.selection, ...fresh] });
      return fresh.length;
    },
    removeFromSelection(variantId: string) {
      commit({ ...state, selection: state.selection.filter((item) => item.variantId !== variantId) });
    },
    clearSelection() {
      commit({ ...state, selection: [] });
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export type Store = ReturnType<typeof createStore>;
