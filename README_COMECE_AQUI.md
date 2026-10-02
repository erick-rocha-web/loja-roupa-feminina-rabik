# VÉRIA · Kit de implementação para o Claude Code

Este pacote contém a especificação e os materiais para construir uma demonstração de loja de moda feminina da Rabik. O site ainda deve ser implementado; não há um projeto compilado neste ZIP.

## Como usar

1. Extraia o ZIP em uma pasta nova, sem substituir seus outros projetos.
2. Abra essa pasta no Claude Code.
3. Envie o conteúdo de `PROMPT_CLAUDE_CODE.md` ou peça para ele ler esse arquivo.
4. Ele deve ler o SDD, conferir as imagens e implementar o site usando os arquivos incluídos.

## Ordem de leitura

- `PROMPT_CLAUDE_CODE.md`: instrução de execução.
- `SDD_MODA_FEMININA_RABIK.md`: especificação completa.
- `docs/ASSETS.md`: associação de imagens, produtos, looks, fontes e identidade.
- `data/products.demo.json` e `data/looks.demo.json`: dados demonstrativos, adaptáveis à stack.
- `assets/manifest.json`: dimensões, formatos, origem e arquivos das imagens.
- `PREVIEW_ASSETS.html`: galeria local para inspecionar os materiais antes de construir o site.

## Pastas

| Pasta | Conteúdo |
| --- | --- |
| `assets/editorial/` | Quatro fotografias editoriais geradas |
| `assets/products/` | Doze fotografias de produtos demonstrativos |
| `assets/details/` | Dois detalhes de tecido e acabamento |
| `assets/brand/` | Wordmark, símbolo, favicon e ícones em SVG/PNG |
| `assets/fonts/` | Fraunces e Inter locais, com CSS de integração |
| `assets/originals/` | Originais PNG das 18 gerações |
| `data/` | Produtos, looks e configuração da demonstração |
| `docs/` | Guia de integração e prompts de geração |
| `licenses/` | Licenças originais das fontes e registro de procedência |

## Observações para a implementação

As versões WebP e suas alternativas responsivas já estão incluídas. Use o manifesto para escolher os arquivos, reserve dimensões no layout e preserve os originais. Não é necessário gerar outra coleção de fotografias para a primeira versão.

A imagem horizontal principal foi composta para texto no lado esquerdo e modelo no lado direito. No celular, use um recorte adequado ou coloque a fotografia separada do texto; não corte rosto, roupa ou controles para imitar o desktop.

VÉRIA é uma marca fictícia de trabalho, sem pesquisa de disponibilidade. Mulheres, roupas e ambientes das fotografias foram gerados por IA. Os produtos, tamanhos, medidas e preços dos dados são exemplos, sem estoque ou vendas reais. Uma correspondência de estilo entre editorial e produto não certifica que se trata de uma peça real idêntica.

O contato real é o da Rabik. A seleção de peças fica dentro da demonstração e não deve ser enviada ao Erick como pedido de uma loja inexistente. Não abra WhatsApp ou conversas durante os testes.

Não reutilize fotos, dados ou logotipos de prospects neste projeto. Não publique, faça push ou altere seus repositórios existentes automaticamente.

