import { editorial } from './media.ts';
import type { Look } from './types.ts';

export const looks: Look[] = [
  {
    id: 'look-daily',
    title: 'Camisa clara e jeans reto',
    note: 'Mangas dobradas e barra reta. Num dia mais quente, a camiseta entra no lugar da camisa.',
    occasion: 'daily',
    image: editorial.heroA,
    productIds: ['product-03', 'product-04'],
    alsoMatches: ['product-01', 'product-05'],
  },
  {
    id: 'look-work',
    title: 'Blazer, blusa vinho e pregas',
    note: 'Alfaiataria clara com um ponto de cor. Sem o blazer, a blusa segue para o fim do dia.',
    occasion: 'work',
    image: editorial.work,
    productIds: ['product-02', 'product-10', 'product-11'],
    alsoMatches: ['product-12', 'product-03'],
  },
  {
    id: 'look-going-out',
    title: 'Conjunto rosa seco',
    note: 'Colete e calça no mesmo tom. Para variar, o jeans reto ou a camiseta essencial entram na combinação.',
    occasion: 'going-out',
    image: editorial.heroB,
    productIds: ['product-09'],
    alsoMatches: ['product-04', 'product-01'],
  },
];
