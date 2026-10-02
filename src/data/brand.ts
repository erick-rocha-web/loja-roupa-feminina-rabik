import type { Category, Occasion } from './types.ts';

const rabikPhone = '5561983645763';
const rabikMessage =
  'Olá! Vi a demonstração de moda feminina da Rabik e quero conversar sobre um site para minha loja de roupas.';

export const brand = {
  name: 'VÉRIA',
  description:
    'Marca fictícia criada pela Rabik para demonstrar uma vitrine de moda feminina com curadoria visual e navegação por peças.',
  demoMode: true,
  notice: 'Marca fictícia · demonstração de site',
  productNotice: 'Peças e preços ilustrativos. Não há vendas nesta demonstração.',
  lookNotice: 'Combinações demonstrativas, sem reserva de estoque.',
  heroTitle: 'Vista o seu momento.',
  heroDescription: 'Peças para combinar de novo, do seu jeito.',
  /** Contato da loja: nulo enquanto for demonstração. Não usar o contato da Rabik aqui. */
  shopContact: null,
  /** Sem endereço, mapa ou localização inventados. */
  location: null,
} as const;

export const rabik = {
  name: 'Rabik',
  phone: rabikPhone,
  phoneLabel: '+55 61 98364-5763',
  email: 'rabik.digital@gmail.com',
  message: rabikMessage,
  whatsappUrl: `https://wa.me/${rabikPhone}?text=${encodeURIComponent(rabikMessage)}`,
} as const;

export const categoryLabels: Record<Category, string> = {
  tops: 'Blusas',
  denim: 'Jeans',
  dresses: 'Vestidos',
  sets: 'Conjuntos',
  tailoring: 'Alfaiataria',
};

export const occasionLabels: Record<Occasion, string> = {
  daily: 'Dia a dia',
  work: 'Trabalho',
  'going-out': 'Saída',
};
