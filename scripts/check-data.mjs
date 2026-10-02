// Verifica a integridade dos dados demonstrativos e a lógica com risco real
// (filtros, sanitização do armazenamento local e link da Rabik).
// Executar com: npm run check  (Node 22.18+ ou 24, que removem tipos de .ts nativamente)
import { existsSync } from 'node:fs';
import { brand, categoryLabels, occasionLabels, rabik } from '../src/data/brand.ts';
import { looks } from '../src/data/looks.ts';
import { details, editorial } from '../src/data/media.ts';
import { products } from '../src/data/products.ts';
import { sizeGuides } from '../src/data/sizing.ts';
import { availableSizes, emptyFilters, filterProducts } from '../src/lib/catalog.ts';
import { sanitizeState } from '../src/lib/store.ts';

const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

function checkMedia(media, owner) {
  check(existsSync(media.src), `${owner}: imagem ausente ${media.src}`);
  for (const width of media.widths) {
    const path = media.src.replace(/\.webp$/, `-${width}.webp`);
    check(existsSync(path), `${owner}: versão responsiva ausente ${path}`);
  }
  check(media.alt && media.alt.length > 20, `${owner}: texto alternativo curto ou ausente`);
}

// Produtos -------------------------------------------------------------------
const productIds = new Set();
const variantIds = new Set();
const imageOwners = new Map();
check(products.length >= 12, `São necessários ao menos 12 produtos (há ${products.length}).`);

for (const item of products) {
  check(!productIds.has(item.id), `ID de produto duplicado: ${item.id}`);
  productIds.add(item.id);
  check(item.isDemonstrative === true, `${item.id}: deve ser demonstrativo`);
  check(item.category in categoryLabels, `${item.id}: categoria inválida ${item.category}`);
  check(item.occasions.length > 0, `${item.id}: sem ocasião`);
  for (const occasion of item.occasions) check(occasion in occasionLabels, `${item.id}: ocasião inválida ${occasion}`);
  check(Number.isInteger(item.priceInCents) && item.priceInCents > 0, `${item.id}: preço inválido`);
  check(item.sizeGuide in sizeGuides, `${item.id}: guia de medidas inexistente`);
  checkMedia(item.image, item.id);
  if (item.detailImage) checkMedia(item.detailImage, `${item.id} (detalhe)`);

  // A mesma foto não pode representar produtos diferentes.
  check(!imageOwners.has(item.image.src), `${item.id}: foto já usada por ${imageOwners.get(item.image.src)}`);
  imageOwners.set(item.image.src, item.id);

  check(item.variants.length > 0, `${item.id}: sem variantes`);
  const guideSizes = new Set(sizeGuides[item.sizeGuide].rows.map((row) => row.size));
  for (const variant of item.variants) {
    check(!variantIds.has(variant.id), `ID de variante duplicado: ${variant.id}`);
    variantIds.add(variant.id);
    check(variant.id.startsWith(`${item.id}-`), `${variant.id}: não pertence a ${item.id}`);
    check(/^#[0-9a-f]{6}$/i.test(variant.colorHex), `${variant.id}: cor inválida`);
    check(guideSizes.has(variant.size), `${variant.id}: tamanho ${variant.size} ausente no guia ${item.sizeGuide}`);
    if (variant.imageSrc) check(variant.imageSrc === item.image.src, `${variant.id}: imagem de variante sem foto própria`);
  }
}

for (const key of Object.keys(categoryLabels)) {
  check(products.some((item) => item.category === key), `Categoria sem produtos: ${key}`);
}

// Looks ----------------------------------------------------------------------
const lookIds = new Set();
check(looks.length === 3, 'Devem existir três looks prontos.');
for (const look of looks) {
  check(!lookIds.has(look.id), `ID de look duplicado: ${look.id}`);
  lookIds.add(look.id);
  check(look.occasion in occasionLabels, `${look.id}: ocasião inválida`);
  checkMedia(look.image, look.id);
  check(look.productIds.length > 0, `${look.id}: sem peças`);
  for (const id of [...look.productIds, ...look.alsoMatches]) check(productIds.has(id), `${look.id}: produto inexistente ${id}`);
  for (const id of look.alsoMatches) check(!look.productIds.includes(id), `${look.id}: ${id} repetido em alsoMatches`);
}

for (const [key, media] of Object.entries({ ...editorial, ...details })) checkMedia(media, key);

// Filtros --------------------------------------------------------------------
const run = (filters) => filterProducts(products, { ...emptyFilters, ...filters }, categoryLabels).map((item) => item.id);
check(run({}).length === products.length, 'Sem filtros, todos os produtos devem aparecer.');
check(run({ category: 'denim' }).every((id) => id === 'product-04' || id === 'product-05'), 'Filtro de categoria incorreto.');
check(run({ query: 'calca' }).includes('product-11'), 'Busca deve ignorar acentos (calca → Calça).');
check(run({ query: 'jeans' }).length === 2, 'Busca por categoria deve encontrar os dois jeans.');
check(run({ category: 'dresses', size: '40' }).length === 0, 'Vestidos não têm tamanho 40: o resultado deve ser vazio.');
check(run({ occasion: 'work', category: 'tailoring' }).length === 3, 'Trabalho + Alfaiataria deve ter 3 peças.');
for (const size of availableSizes(products)) check(run({ size }).length > 0, `Tamanho ${size} oferecido sem produtos.`);
for (const key of Object.keys(occasionLabels)) check(run({ occasion: key }).length > 0, `Ocasião ${key} vazia.`);

// Armazenamento local --------------------------------------------------------
const isProduct = (id) => productIds.has(id);
const isVariant = (productId, variantId) => products.find((item) => item.id === productId)?.variants.some((v) => v.id === variantId) ?? false;
const corrupted = [null, 'texto', 42, { favorites: 'x' }, { selection: [null, 1, { productId: 'product-99', variantId: 'x' }] }];
for (const raw of corrupted) {
  const state = sanitizeState(raw, isProduct, isVariant);
  check(state.favorites.length === 0 && state.selection.length === 0, `Estado corrompido não descartado: ${JSON.stringify(raw)}`);
}
const mixed = sanitizeState(
  {
    favorites: ['product-01', 'product-01', 'product-77'],
    selection: [
      { productId: 'product-04', variantId: 'product-04-38' },
      { productId: 'product-04', variantId: 'product-04-38' },
      { productId: 'product-04', variantId: 'product-01-p' },
    ],
  },
  isProduct,
  isVariant,
);
check(mixed.favorites.join() === 'product-01', 'Favoritos duplicados ou antigos não foram limpos.');
check(mixed.selection.length === 1, 'Seleção com variantes duplicadas ou inconsistentes não foi limpa.');

// Identidade e contato -------------------------------------------------------
check(brand.demoMode === true, 'demoMode deve ser true.');
check(brand.shopContact === null && brand.location === null, 'Contato e localização da loja fictícia devem ser nulos.');
const expectedUrl = `https://wa.me/5561983645763?text=${encodeURIComponent(rabik.message)}`;
check(rabik.phone === '5561983645763', 'Telefone da Rabik incorreto.');
check(rabik.whatsappUrl === expectedUrl, 'URL do WhatsApp da Rabik mal formada.');
check(!/\s/.test(rabik.whatsappUrl), 'URL do WhatsApp contém espaços não codificados.');
check(decodeURIComponent(new URL(rabik.whatsappUrl).searchParams.get('text') ?? '') === rabik.message, 'Mensagem do WhatsApp não decodifica para o texto esperado.');

if (errors.length) {
  console.error(`Integridade dos dados: ${errors.length} problema(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Integridade dos dados: ok · ${products.length} produtos, ${variantIds.size} variantes, ${looks.length} looks, ` +
    `${imageOwners.size} fotos de produto distintas.`,
);
console.log(`WhatsApp da Rabik: ${rabik.whatsappUrl}`);
