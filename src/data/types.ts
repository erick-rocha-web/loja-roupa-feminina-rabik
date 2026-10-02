export type Occasion = 'daily' | 'work' | 'going-out';
export type Category = 'tops' | 'denim' | 'dresses' | 'sets' | 'tailoring';
export type SizeSystem = 'letter' | 'numeric';

/** Imagem com versões responsivas: `widths` lista os arquivos `<nome>-<largura>.webp`. */
export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
  objectPosition?: string;
};

export type Variant = {
  id: string;
  colorName: string;
  colorHex: string;
  size: string;
  imageSrc?: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  occasions: Occasion[];
  priceInCents: number;
  isDemonstrative: true;
  description: string;
  sizeGuide: 'tops' | 'tailoringTops' | 'bottoms';
  image: Media;
  detailImage?: Media;
  variants: Variant[];
};

export type Look = {
  id: string;
  title: string;
  note: string;
  occasion: Occasion;
  image: Media;
  productIds: string[];
  /** Peças do catálogo que combinam com o look, mas não aparecem na foto. */
  alsoMatches: string[];
};
