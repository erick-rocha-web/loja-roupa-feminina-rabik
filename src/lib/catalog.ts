import type { Category, Occasion, Product } from '../data/types.ts';

export type Filters = {
  category: Category | 'all';
  occasion: Occasion | 'all';
  size: string | 'all';
  query: string;
};

export const emptyFilters: Filters = { category: 'all', occasion: 'all', size: 'all', query: '' };

/** Remove acentos e caixa para a busca textual. */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function filterProducts(
  list: Product[],
  filters: Filters,
  categoryLabels: Record<Category, string>,
): Product[] {
  const terms = normalize(filters.query).split(/\s+/).filter(Boolean);
  return list.filter((item) => {
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.occasion !== 'all' && !item.occasions.includes(filters.occasion)) return false;
    if (filters.size !== 'all' && !item.variants.some((variant) => variant.size === filters.size)) return false;
    if (terms.length) {
      const haystack = normalize(`${item.name} ${categoryLabels[item.category]}`);
      if (!terms.every((term) => haystack.includes(term))) return false;
    }
    return true;
  });
}

/** Tamanhos realmente presentes nas variantes, em ordem de tabela. */
export function availableSizes(list: Product[]): string[] {
  const order = ['P', 'M', 'G', 'GG', '36', '38', '40', '42', '44'];
  const found = new Set(list.flatMap((item) => item.variants.map((variant) => variant.size)));
  return [...found].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function isDefault(filters: Filters): boolean {
  return (
    filters.category === 'all' && filters.occasion === 'all' && filters.size === 'all' && filters.query.trim() === ''
  );
}

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatPrice(cents: number): string {
  return money.format(cents / 100);
}
