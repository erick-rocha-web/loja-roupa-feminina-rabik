# SPEC · VÉRIA (demonstração Rabik)

Vitrine editorial interativa de moda feminina, com dados locais e sem backend. Marca fictícia; autoria da Rabik. Especificação completa em `SDD_MODA_FEMININA_RABIK.md`.

Os identificadores abaixo servem para rastreabilidade interna e não aparecem na interface.

| ID | Requisito | Onde está implementado |
| --- | --- | --- |
| R01 | Marca fictícia e autoria claras | Barra superior, menu mobile, rodapé, seção Sobre, fechamento da Rabik, `<title>`/description, `noindex` |
| R02 | Hero editorial com narrativa de scroll | `src/components/hero.ts`, `src/styles/hero.css` (timeline por `--p`, ~1,5 tela) |
| R03 | Catálogo funcional | `src/components/catalog.ts`, `src/lib/catalog.ts` |
| R04 | Detalhes e variantes | `src/components/productDialog.ts` |
| R05 | Favoritos e seleção locais | `src/lib/store.ts`, `src/components/drawer.ts` |
| R06 | Looks ligados ao catálogo | `src/data/looks.ts`, `src/components/looks.ts` |
| R07 | Animação além da hero | Catálogo (entrada em grupos + View Transitions), Ocasiões (aproximação, máscara, deslize), Looks (cortina), Detalhes (deslocamento interno), Sobre (troca de fundo), Rabik (máscara do título) |
| R08 | Layout compacto e responsivo | 4/3/2 colunas; hero sem fixação abaixo de 1024 × 620 |
| R09 | Contato real da Rabik | `src/data/brand.ts` (`rabik.whatsappUrl` gerada com `encodeURIComponent`) |
| R10 | Assets íntegros | `docs/ASSETS_USO.md`, verificação em `scripts/check-data.mjs` |
| R11 | Conteúdo honesto | Sem depoimentos, estoque, endereço ou política comercial; `shopContact` e `location` nulos |
| R12 | Entrega utilizável | `npm run build`; `docs/HANDOFF.md` |

## Arquitetura

- `index.html`: estrutura semântica estática (header, hero, seções, FAQ, rodapé, dialogs vazios).
- `src/data/`: identidade (`brand.ts`), produtos, looks, imagens editoriais (`media.ts`) e guia de medidas. Nenhum nome ou telefone espalhado pelos componentes.
- `src/lib/`: lógica pura (filtros, armazenamento tolerante a falhas), diálogos acessíveis, laço único de scroll.
- `src/components/`: um módulo por responsabilidade.
- `src/styles/`: tokens, base, hero, seções, painéis.
- `assets/`: material original do kit, referenciado diretamente; o build copia só as pastas usadas.
