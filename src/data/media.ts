import type { Media } from './types.ts';

const wide = [480, 768, 1536];
const tall = [480, 768, 1024];

export const editorial = {
  heroA: {
    src: 'assets/editorial/hero-look-a.webp',
    alt: 'Mulher adulta de camisa off-white com mangas dobradas e jeans azul reto, em pé junto a uma parede clara com sombras de folhas.',
    width: 1536,
    height: 1024,
    widths: wide,
    objectPosition: '66% 40%',
  },
  heroB: {
    src: 'assets/editorial/hero-look-b.webp',
    alt: 'Mulher adulta de cabelo cacheado vestindo colete de botões e calça reta em rosa seco, em salão claro com arco.',
    width: 1024,
    height: 1536,
    widths: tall,
    objectPosition: '50% 35%',
  },
  work: {
    src: 'assets/editorial/occasion-work.webp',
    alt: 'Mulher adulta caminhando em galeria clara com blazer creme, blusa vinho e calça bege ampla com pregas.',
    width: 1536,
    height: 1024,
    widths: wide,
    objectPosition: '50% 40%',
  },
  weekend: {
    src: 'assets/editorial/occasion-weekend.webp',
    alt: 'Mulher adulta ruiva sorrindo em pátio de pedras com vestido midi verde-sálvia sem mangas e sandálias rasteiras.',
    width: 1024,
    height: 1536,
    widths: tall,
    objectPosition: '50% 40%',
  },
} satisfies Record<string, Media>;

export const details = {
  tailoring: {
    src: 'assets/details/detail-tailoring.webp',
    alt: 'Close ilustrativo de lapela, pesponto e botão de um blazer creme.',
    width: 1536,
    height: 1024,
    widths: wide,
  },
  denim: {
    src: 'assets/details/detail-denim.webp',
    alt: 'Close ilustrativo de bolso de jeans azul com pesponto dourado e rebite.',
    width: 1536,
    height: 1024,
    widths: wide,
  },
} satisfies Record<string, Media>;
