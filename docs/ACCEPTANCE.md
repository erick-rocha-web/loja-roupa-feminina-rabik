# Aceite · verificações executadas em 01/10/2026

Ambiente: Windows 11, Node 24.14, Vite 8.3, Chrome local via `playwright-core` (ferramenta só da revisão, fora do projeto). Servidor: `vite preview`.

## Automático

- `npm run build`: integridade dos dados + `tsc --noEmit` + build. Passa.
- `npm run check`: 12 produtos, 53 variantes, 3 looks, 12 fotos de produto distintas; IDs únicos; variantes pertencem ao produto; tamanhos presentes no guia; referências dos looks existem; todos os arquivos e versões responsivas existem; filtros (acentos, combinações, vazio); sanitização de estado corrompido; URL do WhatsApp conferida como string.

## Interação (roteiro automatizado no Chrome, 45/45)

Skip link no primeiro Tab; filtros combinados; estado vazio e Limpar; faixa Trabalho filtra o catálogo; abrir detalhe com Enter; foco no Fechar; foco contido após 25 Tabs; aviso sem tamanho; resumo da variante; detalhe ilustrativo; Escape fecha e devolve o foco a "Ver peça"; scroll preservado; contadores; troca de look por seta atualiza foto e lista juntas; conjunto exige tamanhos e adiciona 3 variantes; painel, resumo ("nada é enviado"), remover, Escape devolve o foco; favoritos e seleção após reload; JSON corrompido descartado; timeline desligada no celular e religada no desktop sem duplicar; volta ao topo zera; sem erros de console; menu mobile por toque, Escape e link; dialog cabe em 360 × 740; `localStorage` bloqueado funciona em memória com aviso; motion reduzido mostra composição estática completa.

## Visual (screenshots inspecionados)

360 × 740, 390 × 844, 768 × 1024, 1366 × 768, 1440 × 900 e 1366 × 768 com motion reduzido. Hero em 0, 20, 40, 55, 70, 85 e 100% da timeline. Sem overflow horizontal e sem imagens quebradas em todos.

Corrigido após a revisão: cópia de imagens no build, título da Rabik oculto pela máscara, `hidden` sobrescrito por `display`, palco dos looks deslocado, rosto cortado na faixa de trabalho, fundo dos cards, foto secundária solta no tablet, abas dos looks abaixo da foto no celular, imagem de detalhe vazia no dialog.

## Não executado

Lighthouse, leitor de tela real, Safari/Firefox e dispositivos físicos.

## Refinamento de animações · verificação

- `npm run build` e `npm run check` passam; os 131 checksums do kit conferem.
- Roteiro de interação: 48/48, incluindo foco por teclado em uma peça da hero no início da timeline (fica visível e abre o detalhe), filtro sem perda de foco e sem mudança de `scrollY`, resize desktop → celular → desktop sem duplicar a timeline.
- Screenshots inspecionados: abertura a 120 ms, 450 ms e 1,5 s (1366 × 768 e 390 × 844); hero em 0, 20, 40, 55, 70, 85 e 100% (1366 × 768 e 1440 × 900); seções no meio e no fim das transições (ocasiões, detalhes, encerramento, reorganização dos filtros, troca de look) em 1366 × 768 e 390 × 844; páginas completas em 360 × 740, 390 × 844, 768 × 1024, 1366 × 768 e 1440 × 900; motion reduzido em 1366 × 768 e 390 × 844. Sem overflow horizontal, imagens quebradas ou erros de console.
- Corrigido durante a revisão: moldura principal encolhida por `align-self` em elemento absoluto, cabeça encostando na borda no fim da timeline, recortes das peças invadindo a foto em 1440 × 900, etiqueta da secundária aparecendo antes da foto no celular, legenda do close coberta pelo jeans.
