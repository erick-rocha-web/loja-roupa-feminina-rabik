import { details } from './media.ts';
import type { Category, Media, Occasion, Product, Variant } from './types.ts';

const letterSizes = ['P', 'M', 'G', 'GG'];
const numericSizes = ['36', '38', '40', '42', '44'];

/** Cada produto tem uma única cor fotografada; as variantes mudam só o tamanho. */
function variants(id: string, colorName: string, colorHex: string, sizes: string[]): Variant[] {
  return sizes.map((size) => ({
    id: `${id}-${size.toLowerCase()}`,
    colorName,
    colorHex,
    size,
    imageSrc: `assets/products/${id}.webp`,
  }));
}

function photo(id: string, alt: string): Media {
  return {
    src: `assets/products/${id}.webp`,
    alt,
    width: 1024,
    height: 1536,
    widths: [480, 768, 1024],
    objectPosition: '50% 50%',
  };
}

type Input = {
  id: string;
  name: string;
  category: Category;
  occasions: Occasion[];
  priceInCents: number;
  description: string;
  alt: string;
  color: [string, string];
  sizes: 'letter' | 'numeric';
  sizeGuide: Product['sizeGuide'];
  detailImage?: Media;
};

function product(input: Input): Product {
  const { alt, color, sizes, ...rest } = input;
  return {
    ...rest,
    isDemonstrative: true,
    image: photo(input.id, alt),
    variants: variants(input.id, color[0], color[1], sizes === 'letter' ? letterSizes : numericSizes),
  };
}

export const products: Product[] = [
  product({
    id: 'product-01',
    name: 'Camiseta Essencial',
    category: 'tops',
    occasions: ['daily'],
    priceInCents: 7990,
    description: 'Camiseta off-white de manga curta e gola redonda, com caimento reto. Base para jeans, saias e alfaiataria.',
    alt: 'Camiseta off-white de manga curta e gola redonda sobre fundo claro.',
    color: ['Off-white', '#F4F0E6'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-02',
    name: 'Blusa Canelada',
    category: 'tops',
    occasions: ['daily', 'work', 'going-out'],
    priceInCents: 8990,
    description: 'Blusa vinho de malha canelada, manga curta e decote redondo amplo. Ajustada ao corpo.',
    alt: 'Blusa vinho canelada de manga curta e decote redondo sobre fundo claro.',
    color: ['Vinho', '#7E2234'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-03',
    name: 'Camisa Leve',
    category: 'tops',
    occasions: ['daily', 'work'],
    priceInCents: 15990,
    description: 'Camisa off-white de manga longa com punhos, gola simples, botões frontais e barra arredondada.',
    alt: 'Camisa off-white de manga longa com botões e barra arredondada sobre fundo claro.',
    color: ['Off-white', '#F4F0E6'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-04',
    name: 'Jeans Reto',
    category: 'denim',
    occasions: ['daily', 'going-out'],
    priceInCents: 18990,
    description: 'Jeans azul médio de cintura alta e pernas retas, sem rasgos, com cinco bolsos.',
    alt: 'Calça jeans azul médio de cintura alta e corte reto sobre fundo claro.',
    color: ['Azul médio', '#5B7892'],
    sizes: 'numeric',
    sizeGuide: 'bottoms',
    detailImage: details.denim,
  }),
  product({
    id: 'product-05',
    name: 'Jeans Amplo',
    category: 'denim',
    occasions: ['daily'],
    priceInCents: 19990,
    description: 'Jeans azul claro de cintura alta com pernas amplas até a barra.',
    alt: 'Calça jeans azul claro de cintura alta e pernas amplas sobre fundo claro.',
    color: ['Azul claro', '#94ABBC'],
    sizes: 'numeric',
    sizeGuide: 'bottoms',
    detailImage: details.denim,
  }),
  product({
    id: 'product-06',
    name: 'Vestido Midi Sálvia',
    category: 'dresses',
    occasions: ['daily', 'going-out'],
    priceInCents: 22990,
    description: 'Vestido midi verde-sálvia sem mangas, com recorte na cintura e saia evasê.',
    alt: 'Vestido midi verde-sálvia sem mangas, com cintura marcada e saia evasê, sobre fundo claro.',
    color: ['Sálvia', '#9DAA88'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-07',
    name: 'Vestido Camiseta',
    category: 'dresses',
    occasions: ['daily', 'going-out'],
    priceInCents: 17990,
    description: 'Vestido vinho de malha com manga curta, gola redonda e corte trapézio acima do joelho.',
    alt: 'Vestido vinho de manga curta em corte trapézio, comprimento acima do joelho, sobre fundo claro.',
    color: ['Vinho', '#7E2234'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-08',
    name: 'Conjunto Brisa',
    category: 'sets',
    occasions: ['daily', 'work'],
    priceInCents: 28990,
    description: 'Conjunto areia de camisa curta com gola aberta e calça ampla com pregas. As duas peças formam um único item.',
    alt: 'Conjunto areia com camisa de manga curta e gola aberta e calça ampla com pregas, sobre fundo claro.',
    color: ['Areia', '#D3C6B4'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-09',
    name: 'Conjunto Aurora',
    category: 'sets',
    occasions: ['work', 'going-out'],
    priceInCents: 31990,
    description: 'Conjunto rosa seco de colete com botões e bolsos frontais e calça reta com pregas.',
    alt: 'Conjunto rosa seco com colete de botões e calça reta com pregas, sobre fundo claro.',
    color: ['Rosa seco', '#BA8590'],
    sizes: 'letter',
    sizeGuide: 'tops',
  }),
  product({
    id: 'product-10',
    name: 'Blazer Creme',
    category: 'tailoring',
    occasions: ['work', 'going-out'],
    priceInCents: 25990,
    description: 'Blazer creme de manga longa com lapela, dois botões e bolsos com aba.',
    alt: 'Blazer creme de lapela com dois botões e bolsos com aba, sobre fundo claro.',
    color: ['Creme', '#E9DFC9'],
    sizes: 'numeric',
    sizeGuide: 'tailoringTops',
    detailImage: details.tailoring,
  }),
  product({
    id: 'product-11',
    name: 'Calça Pregas',
    category: 'tailoring',
    occasions: ['work', 'going-out'],
    priceInCents: 18990,
    description: 'Calça bege de alfaiataria com cintura alta, pregas frontais e pernas amplas.',
    alt: 'Calça bege de alfaiataria com pregas frontais e pernas amplas, sobre fundo claro.',
    color: ['Areia', '#D3C6B4'],
    sizes: 'numeric',
    sizeGuide: 'bottoms',
  }),
  product({
    id: 'product-12',
    name: 'Saia Midi Evasê',
    category: 'tailoring',
    occasions: ['daily', 'work', 'going-out'],
    priceInCents: 16990,
    description: 'Saia midi chocolate de cós estruturado e barra evasê, para compor com camisa ou blazer.',
    alt: 'Saia midi chocolate de cós estruturado e barra evasê sobre fundo claro.',
    color: ['Chocolate', '#5E4038'],
    sizes: 'numeric',
    sizeGuide: 'bottoms',
  }),
];

export const productById = new Map(products.map((item) => [item.id, item]));

export function getProduct(id: string): Product {
  const item = productById.get(id);
  if (!item) throw new Error(`Produto inexistente: ${id}`);
  return item;
}
