# Handoff · VÉRIA

Pasta: `C:\Users\E-Rick\Desktop\sites\portifólio-rabik\site-roupa-feminina`

## Comandos

```bash
npm install        # dependências (Vite, TypeScript, @types/node)
npm run dev        # desenvolvimento em http://localhost:5173
npm run check      # integridade dos dados e lógica de filtros/armazenamento
npm run build      # check + tsc + build em dist/
npm run preview    # serve dist/ (use --port se 4173 estiver ocupada)
```

Requer Node 22.18+ ou 24 (o `check` importa os `.ts` de dados direto pelo Node). `dist/` é estático e funciona em subpasta (`base: './'`). Nada foi publicado.

## Onde trocar

| O quê | Arquivo |
| --- | --- |
| Nome, avisos, textos da hero, contato da loja, localização | `src/data/brand.ts` |
| Contato da Rabik (telefone, mensagem, e-mail) | `src/data/brand.ts` (`rabik`) |
| Produtos, preços ilustrativos, cores, tamanhos, alt | `src/data/products.ts` |
| Looks e sugestões | `src/data/looks.ts` |
| Fotos editoriais e closes | `src/data/media.ts` + `index.html` (hero, ocasiões, detalhes) |
| Guia de medidas | `src/data/sizing.ts` |
| Cores e espaçamentos | `src/styles/tokens.css` |
| Textos das seções e FAQ | `index.html` |

Rodar `npm run check` após qualquer troca de dados.

## Demonstração × loja real

Esta versão não tem carrinho, checkout, pagamento, estoque, login, painel nem envio da seleção. Favoritos e seleção vivem só no navegador. Uma loja real precisaria de: fonte de dados editável (painel ou planilha), estoque/disponibilidade, envio do resumo ao atendimento da loja (WhatsApp da loja, não o da Rabik), política de trocas e frete reais, endereço e dados da empresa, análise de privacidade se houver coleta.

## Antes de adaptar para uma empresa

- Substituir marca, fotos, produtos, preços, tamanhos e medidas por materiais fornecidos ou autorizados pela loja.
- Preencher `shopContact` e `location` só com dados confirmados.
- Remover avisos de demonstração apenas depois de trocar todos os fatos fictícios.
- Rever `noindex`, título, descrição e imagem social (`og:image` precisa de URL absoluta no domínio final).
- Criar categorias que reflitam o catálogo real (ex.: Saias).

## Limitações conhecidas

- Fontes variáveis completas (Inter ~350 kB, Fraunces ~195 kB em WOFF2). Um subconjunto latino reduziria bastante; não havia ferramenta de subset no ambiente.
- Lighthouse não foi medido.
- A View Transition dos filtros só anima em navegadores com suporte; nos demais, a troca é imediata.
- Imagens referenciadas no `index.html` aparecem duas vezes em `dist/` (cópia com hash do Vite e cópia da pasta `assets/`). Só uma é baixada pelo navegador.

## Preservação

Só esta pasta foi alterada. Os materiais do kit (`assets/`, `data/`, `docs/ASSETS.md`, `docs/GENERATION_PROMPTS.json`, `licenses/`, SDD, README, prompt) não foram modificados. Nenhum outro projeto, repositório, remote ou deployment foi tocado. Durante a revisão, um servidor de outro projeto já ocupava a porta 4173 e não foi encerrado nem alterado.
