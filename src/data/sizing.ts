import type { Product } from './types.ts';

export type SizeTable = {
  title: string;
  columns: { key: string; label: string }[];
  rows: { size: string; values: Record<string, number> }[];
};

export const sizingNote =
  'Exemplo de guia de medidas, em centímetros, para demonstrar a interface. Não usar para orientar uma compra real.';

const row = (size: string, values: Record<string, number>) => ({ size, values });

export const sizeGuides: Record<Product['sizeGuide'], SizeTable> = {
  tops: {
    title: 'Blusas, vestidos e conjuntos',
    columns: [
      { key: 'bust', label: 'Busto' },
      { key: 'waist', label: 'Cintura' },
    ],
    rows: [
      row('P', { bust: 88, waist: 70 }),
      row('M', { bust: 94, waist: 76 }),
      row('G', { bust: 100, waist: 82 }),
      row('GG', { bust: 108, waist: 90 }),
    ],
  },
  tailoringTops: {
    title: 'Blazers',
    columns: [
      { key: 'bust', label: 'Busto' },
      { key: 'waist', label: 'Cintura' },
    ],
    rows: [
      row('36', { bust: 84, waist: 66 }),
      row('38', { bust: 88, waist: 70 }),
      row('40', { bust: 94, waist: 76 }),
      row('42', { bust: 100, waist: 82 }),
      row('44', { bust: 106, waist: 88 }),
    ],
  },
  bottoms: {
    title: 'Calças, jeans e saias',
    columns: [
      { key: 'waist', label: 'Cintura' },
      { key: 'hip', label: 'Quadril' },
    ],
    rows: [
      row('36', { waist: 68, hip: 94 }),
      row('38', { waist: 72, hip: 98 }),
      row('40', { waist: 76, hip: 102 }),
      row('42', { waist: 82, hip: 108 }),
      row('44', { waist: 88, hip: 114 }),
    ],
  },
};
