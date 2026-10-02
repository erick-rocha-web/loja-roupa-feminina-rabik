# Guia dos assets VÉRIA

## Origem e associação

As 18 imagens foram geradas individualmente com a ferramenta integrada de geração de imagens nesta conversa. O conjunto usa fundos claros, luz suave e roupas sem logotipos de terceiros. Os prompts completos estão em `GENERATION_PROMPTS.json`.

Imagens são ilustrativas. Não são fotografias da loja de um prospecto, de funcionárias ou de produtos em estoque. Os editoriais e fotos isoladas têm correspondência visual aproximada; não use essa correspondência como garantia sobre uma roupa real.

Cada imagem tem o original PNG em `assets/originals/`, um WebP principal e versões menores com a mesma proporção, sem recolorir, recortar ou alterar o conteúdo. O manifesto registra medidas, texto alternativo e arquivos.

## Mapa de integração

| Arquivo principal | Uso | Produtos relacionados |
| --- | --- | --- |
| `assets/editorial/hero-look-a.webp` | Modelo adulta com camisa clara e jeans reto em arquitetura de tons claros. | product-03, product-04 |
| `assets/editorial/hero-look-b.webp` | Modelo adulta com conjunto de colete e calça em rosa seco. | product-09 |
| `assets/editorial/occasion-work.webp` | Modelo adulta com blazer claro, blusa vinho e calça de alfaiataria bege. | product-02, product-10, product-11 |
| `assets/editorial/occasion-weekend.webp` | Modelo adulta com vestido midi verde em pátio claro. | product-06 |
| `assets/products/product-01.webp` | Camiseta Essencial em fotografia demonstrativa de catálogo. | product-01 |
| `assets/products/product-02.webp` | Blusa Trama em fotografia demonstrativa de catálogo. | product-02 |
| `assets/products/product-03.webp` | Camisa Leve em fotografia demonstrativa de catálogo. | product-03 |
| `assets/products/product-04.webp` | Jeans Reto em fotografia demonstrativa de catálogo. | product-04 |
| `assets/products/product-05.webp` | Jeans Amplo em fotografia demonstrativa de catálogo. | product-05 |
| `assets/products/product-06.webp` | Vestido Horizonte em fotografia demonstrativa de catálogo. | product-06 |
| `assets/products/product-07.webp` | Vestido Movimento em fotografia demonstrativa de catálogo. | product-07 |
| `assets/products/product-08.webp` | Conjunto Brisa em fotografia demonstrativa de catálogo. | product-08 |
| `assets/products/product-09.webp` | Conjunto Aurora em fotografia demonstrativa de catálogo. | product-09 |
| `assets/products/product-10.webp` | Blazer Linha em fotografia demonstrativa de catálogo. | product-10 |
| `assets/products/product-11.webp` | Calça Ritmo em fotografia demonstrativa de catálogo. | product-11 |
| `assets/products/product-12.webp` | Saia Passo em fotografia demonstrativa de catálogo. | product-12 |
| `assets/details/detail-tailoring.webp` | Detalhe de lapela, costura e botão de blazer claro. | product-10 |
| `assets/details/detail-denim.webp` | Detalhe de bolso e costura de jeans azul. | product-04, product-05 |

## Como preservar as proporções

Use `object-fit: contain` nos produtos, com fundo de papel coerente. As fotografias originais de produtos são verticais; não recorte gola, mangas, cós ou barra para fazê-las caber em um card. Um card 4:5 pode conter a imagem 2:3 com espaço de respiro.

Para editoriais, use o recorte de modo consciente. A hero principal tem espaço para título à esquerda. Se o layout mobile não preservar roupa e rosto, apresente a fotografia abaixo do texto. Os originais podem ser examinados antes de decidir o enquadramento.

`srcset` deve usar as larguras do manifesto. Não carregue as 18 versões maiores no primeiro acesso. Carregue a foto principal cedo, reserve dimensões e deixe fotos inferiores sob demanda.

Os caminhos em JSON são relativos à raiz deste kit. Ao montar o projeto, copie ou mova os assets para a pasta pública escolhida e ajuste o prefixo de todos os caminhos uma única vez. Não mantenha URLs com `/workspace/` no site.

## Dados de produtos e looks

`data/products.demo.json` tem 12 produtos, com variantes apenas na cor representada. Os tamanhos e preços são exemplos. Há três looks principais: camisa com jeans, combinação de trabalho e conjunto rosa. O vestido verde aparece no editorial de fim de semana.

Uma foto de conjunto representa um produto do tipo conjunto, com as duas peças, sem duplicar produtos inexistentes. O guia de medidas é ilustrativo e fica em arquivo próprio.

## Fontes

Fraunces e Inter foram obtidas do repositório oficial Google Fonts, com as respectivas licenças SIL Open Font License. Os arquivos originais TTF e versões WOFF2 estão incluídos. Preserve os textos de licença ao redistribuir as fontes.

Use `assets/fonts/fonts.css`. Confirme os caminhos caso a stack copie os arquivos para outro diretório. Não criar uma dependência de requisição ao Google Fonts quando estes arquivos locais bastam.

## Identidade e ícones

O wordmark VÉRIA foi preparado como SVG com letras em curvas a partir de Fraunces. Existem versões em tinta escura, vinho e papel. O símbolo é um V editorial sobre fundo vinho. Os SVGs não dependem de uma fonte carregada para mostrar o nome.

Favicon SVG/ICO, ícones de aplicação e imagem social acompanham a identidade. Os pequenos ícones de interface são SVGs vetoriais locais e podem herdar a cor do contexto. A seleção não é um carrinho de compras com pagamento.

## Transições

As imagens permitem animações de máscara, escala, deslocamento e transição entre looks conforme o SDD. Não é necessária sequência de frames ou vídeo para implementar a hero. Não gere um vídeo só para preencher uma pendência inexistente.

## Procedência

Leia `licenses/PROVENIENCIA.md`. Não atribua as imagens à Antunes, a outra loja ou a uma fotógrafa inexistente. Não anunciar exclusividade jurídica ou registro de marca que não tenham sido avaliados.
