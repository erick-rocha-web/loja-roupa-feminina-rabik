# Uso dos assets no site

Complementa `docs/ASSETS.md` (fornecido, não alterado). Origem: imagens geradas por IA, registradas em `licenses/PROVENIENCIA.md`. Nenhum arquivo foi recortado, recolorido ou substituído; só se escolhe o enquadramento por CSS.

| Arquivo | Onde aparece | Recorte (object-position) | Observação |
| --- | --- | --- | --- |
| `editorial/hero-look-a` | Hero (foto principal), look Dia a dia | `66% 40%` | Máscara reduz de horizontal para vertical; celular 4:5 |
| `editorial/hero-look-b` | Hero (secundária), look Saída | `50% 35%` | Começa com a parte de baixo mascarada e revela o look inteiro |
| `editorial/occasion-work` | Faixa "Do trabalho ao encontro", look Trabalho | `54% 8%` na faixa | Topo preservado para não cortar o rosto |
| `editorial/occasion-weekend` | Composição "Fim de semana" | centro | Proporção 2:3 inteira |
| `products/product-01…12` | Catálogo, dialog, hero, looks, painel | `contain` | Sem corte; fundo do card no tom da foto (`#F7F3ED`) |
| `products/product-01`, `-05` | Recortes de "Dias leves" | `contain` | Uso decorativo (`alt=""`); as peças têm card próprio |
| `products/product-06` | Foto menor de "Fim de semana" | `contain` | Mesmo vestido do editorial |
| `details/detail-tailoring` | Seção De perto; detalhe do Blazer Creme | `cover` | Rotulado "Detalhe ilustrativo" |
| `details/detail-denim` | Seção De perto; detalhe dos dois jeans | `cover` | O mesmo close serve aos dois jeans, sempre como ilustração |

Textos alternativos: `src/data/products.ts`, `src/data/media.ts` e `index.html`.

Carregamento: a foto principal da hero é `fetchpriority="high"`; as demais são `loading="lazy"` com `srcset` nas larguras do manifesto e dimensões reservadas. As imagens do dialog carregam ao abrir.

Identidade: `wordmark-ink.svg` (header), `wordmark-accent.svg` (hero), `symbol.svg` (rodapé), `favicon.svg`/`favicon-32.png`/`apple-touch-icon.png`, `icons.svg` (sprite inserido no documento). Fontes: `assets/fonts/fonts.css` importado pelo bundle; licenças OFL copiadas para `dist/licenses/` e linkadas no rodapé.

Correspondência foto × produto: aproximada. A blusa do editorial de trabalho parece sem mangas ou coberta pelo blazer; a do catálogo tem manga curta. Não usar essa correspondência como garantia sobre uma peça real.
