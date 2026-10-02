# Decisões

**Stack: Vite + TypeScript, sem framework.** Página única com interatividade local; componentes como módulos que geram HTML e usam delegação de eventos. Bundle final ≈ 12 kB de JS e 8 kB de CSS (gzip). React ou Astro não trariam ganho para este escopo.

**Sem GSAP.** Não há biblioteca de animação instalada, e o refinamento de animações não adicionou nenhuma. As sequências ligadas ao scroll usam um laço único (`src/lib/scroll.ts`) que escreve variáveis CSS (`--p`, `--reveal`, `--zoom`, `--wipe`…) só para elementos perto da tela; entradas pontuais usam IntersectionObserver; a abertura e as trocas usam animações CSS. Trocar de breakpoint liga/desliga a mesma timeline por `matchMedia`; nada é recriado no resize. O scroll continua nativo.

**Hero.** Abertura em CSS (~1 s): título em duas linhas mascaradas, foto principal com ajuste de escala e enquadramento; os botões nunca ficam ocultos. Em ≥ 1024 × 620 sem motion reduzido, a seção mede 2 alturas de tela menos o cabeçalho (cerca de uma tela presa) e tem quatro fases: assentamento; a principal passa de horizontal a vertical pela máscara e se desloca; a secundária sobe por baixo com máscara e escala interna; os recortes da camisa e do jeans entram; a composição sobe e surge "Continue para a coleção". Controles ainda invisíveis não recebem clique, mas aparecem ao receber foco. No celular e no tablet, sequência vertical com entradas por IntersectionObserver. Com motion reduzido, composição final estática.

**Estados ocultos só com JS.** Uma linha inline no `<head>` marca `motion-ok` (evita um quadro estático antes da abertura); estados iniciais ocultos de entradas exigem também `js-ready`, adicionada ao fim de `main.ts`. Se o script falhar, nada fica escondido.

**Movimento por seção.** Catálogo: entrada em grupos com máscara na foto; filtros com View Transitions (cards deslizam, saem encolhendo, entram crescendo), sem recriar os botões de filtro e com altura da grade preservada durante a troca; hover, foco e clique nos cards; anel e pulso ao salvar favorito. Ocasiões: máscaras em direções diferentes por bloco e texto em outro tempo. Looks: a foto anterior esmaece e recua, a próxima entra pela direita; lista em sequência. Detalhes: aproximação lenta por escala durante a rolagem. Sobre: troca de fundo (trecho calmo). Encerramento: cortina na cor de destaque que recolhe ao entrar; título por máscara, texto e botão em sequência.

**Nomes ajustados às fotos.** Base demonstrativa de `data/*.demo.json` preservada; os dados usados pelo site ficam em `src/data/`. Trocas: Blusa Trama → Blusa Canelada; Vestido Horizonte → Vestido Midi Sálvia; Vestido Movimento → Vestido Camiseta; Blazer Linha → Blazer Creme; Calça Ritmo → Calça Pregas; Saia Passo → Saia Midi Evasê. Textos alternativos reescritos para descrever a roupa. IDs, variantes e referências dos looks mantidos.

**Saia na categoria Alfaiataria.** O SDD fixa cinco categorias; a saia de cós estruturado ficou em Alfaiataria (como na base). Em uma loja real, criar a categoria Saias.

**Cores dos vestidos e da blusa.** Hex das amostras ajustados para o tom fotografado (sálvia `#9DAA88`, vinho `#7E2234`, chocolate `#5E4038`). Cada produto tem só uma cor; as variantes mudam o tamanho. Nenhuma foto foi recolorida.

**Guia de medidas.** Valores de `data/sizing.demo.json` mantidos. Foi acrescentada a tabela "Blazers" (36 a 44, busto/cintura) porque o blazer usa numeração e a tabela de calças (cintura/quadril) não serve. Todas as tabelas são rotuladas como exemplo.

**Looks.** Três combinações fixas, ligadas a fotos editoriais existentes. "Também combina com" sugere peças do catálogo sem afirmar que estão na foto. Adicionar o conjunto exige tamanho por peça.

**Armazenamento.** Chave única `veria-demo:v1`; dados corrompidos, duplicados ou de produtos inexistentes são descartados. Sem `localStorage`, tudo funciona em memória e o painel avisa.

**Imagens no build.** O HTML referencia as fotos pelo caminho do kit (Vite gera cópias com hash das que aparecem no HTML); as usadas por dados são copiadas de `assets/` para `dist/`. Os PNG originais não entram na publicação. O plugin usa cópia manual porque `fs.cpSync` encerra o Node 24 sem erro em caminhos com acento no Windows.

**Ocasião "Fim de semana" → filtro Saída.** As três ocasiões do catálogo são Dia a dia, Trabalho e Saída; a composição de fim de semana abre Saída.
