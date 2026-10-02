# SDD · VÉRIA · Demonstração de moda feminina para a Rabik

## Instrução para o Claude Code

Você vai construir uma demonstração nova de uma loja de moda feminina, seguindo esta especificação. Implemente o site, faça o build e confira o resultado visual; não entregue apenas um planejamento.

A marca de trabalho será **VÉRIA**, fictícia neste projeto. Não é uma loja real nem uma marca cuja disponibilidade foi verificada. O site será uma peça de portfólio da Rabik, usada para apresentar a lojas reais como uma vitrine própria pode funcionar. Não anuncie que a VÉRIA existe, vende ou atende clientes.

Trabalhe em uma pasta nova. Preserve todos os projetos, repositórios, remotes e deployments existentes, especialmente as demonstrações da Antunes e o portfólio urbano que já ficou pronto. Não faça push, deploy, troca de remote, contratação de serviço ou publicação automática.

Antes de implementar, leia as instruções locais e inspecione os arquivos e assets disponíveis. Se este documento estiver dentro de `assets/`, trate-o como especificação, não como imagem. Escolha uma solução simples compatível com o ambiente. Avance com as decisões reversíveis descritas aqui, sem pedir aprovação para cada componente.

O objetivo é produzir uma apresentação de moda com direção de arte, navegação útil e animação bem executada. Não basta trocar as cores de uma landing page genérica.

## Contexto e resultado esperado

A planilha fornecida à Rabik reúne 102 lojas. Sua classificação registra 79 de moda feminina e outras quatro de moda feminina/plus size: 83 exclusivamente femininas. O modelo urbano com estética de anime/game pode funcionar para parte da lista, mas não representa bem tantas lojas de básicos, vestidos, jeans e multimarcas femininas.

Precisamos de **uma segunda demonstração reutilizável**, não de um site personalizado gratuito para cada prospecto. O resultado deve permitir mostrar uma referência pronta, identificar o interesse da loja e só depois adaptar uma proposta aprovada.

Quem visitar precisa conseguir:

- Entender o estilo da marca em poucos segundos.
- Navegar por peças e ocasiões dentro do site.
- Abrir detalhes, escolher variações e salvar favoritos.
- Explorar combinações de looks sem depender de uma conversa no WhatsApp.
- Perceber como isso poderia funcionar para sua própria loja.
- Conversar com a Rabik sobre um projeto semelhante, por um link direto com mensagem pronta.

A qualidade visual desta demonstração não define o escopo do plano básico de R$ 997. Recursos adicionais serão avaliados por orçamento. Não publique preço, parcelamento, prazo comercial ou promessa de resultado da Rabik neste projeto.

## Produto e limites

**Tipo de projeto:** vitrine editorial interativa de moda feminina, com dados locais e sem backend.

**Público da marca fictícia:** mulheres adultas com interesse em roupas casuais, jeans, vestidos, conjuntos e alfaiataria para diferentes momentos do dia. Representar variedade de tons de pele e corpos, sem reduzir moda feminina a um único padrão.

**Tom:** seguro, leve e direto. Fotografias fortes, textos curtos e navegação clara. Pode ser alegre e expressivo sem parecer infantil.

Não implementar nesta versão:

- Checkout, cobrança, carrinho de compras ou integração de pagamento.
- Login, cadastro, banco de dados, estoque sincronizado ou painel administrativo.
- Newsletter ou formulários que finjam enviar dados.
- Avaliações, depoimentos, quantidades vendidas ou histórias de clientes inventadas.
- Frete calculado, política comercial ou disponibilidade apresentados como fatos reais.
- Feed de Instagram integrado, pixels de anúncio ou rastreamento de visitantes.

Favoritos e seleção de peças são funções locais de demonstração. Não representam pedido, pagamento, reserva ou estoque real.

## Direção de arte

### Conceito visual

**Uma revista de moda que se transforma em vitrine.** A abertura apresenta um editorial; conforme a pessoa rola, a composição se reorganiza e entrega as peças que aparecem nos looks. Depois, o catálogo assume a navegação.

O diferencial deve vir da composição, das fotografias, da transição entre editorial e produto e dos detalhes de interação. Evite uma sequência de seções idênticas com título centralizado e três caixas arredondadas.

### Paleta e tipografia

Tokens iniciais, ajustáveis somente se o contraste ou as fotografias exigirem:

| Token | Valor | Aplicação |
| --- | --- | --- |
| `paper` | `#F7F3EC` | Fundo principal claro |
| `surface` | `#FFFDFA` | Painéis e detalhes |
| `ink` | `#211D1F` | Texto principal |
| `muted` | `#625B5E` | Texto secundário |
| `accent` | `#A72F4C` | Botões, foco e pequenos destaques |
| `rose` | `#E7C6CD` | Planos de fundo decorativos |
| `sage` | `#DCE2D5` | Um contraste secundário na parte editorial |
| `border` | `#D8D0CC` | Divisórias discretas |

Use uma serifada editorial expressiva nos títulos e uma sans legível nos controles e textos. Sugestão: Fraunces + Inter, em arquivos locais licenciados. Se não estiverem disponíveis, escolha alternativas de qualidade e registre a escolha. No máximo duas famílias e os pesos realmente usados.

A tipografia não deve tomar toda a tela. O foco é a roupa. Não use letras gigantes em todas as seções, outlines de texto repetidos, neon, glow ou gradientes como decoração padrão.

### Proporções obrigatórias

- Container principal de até 1320 px; texto corrido com largura menor.
- Margens laterais de 20 px no celular e de 40 a 64 px no desktop.
- Título da hero entre aproximadamente 38 e 78 px, variando com o viewport.
- Títulos de seção entre 28 e 44 px; corpo entre 16 e 18 px.
- Header de aproximadamente 64 px no desktop e 56 px no celular.
- Espaço vertical entre seções normalmente entre 64 e 104 px no desktop, reduzido no celular.
- Cantos discretos: fotos editoriais podem ser retas; componentes interativos podem ter raio de 8 a 16 px. Não colocar tudo dentro de pílulas.
- Catálogo: quatro colunas em telas largas, três em telas médias e duas em celulares quando houver espaço legível. Usar uma coluna onde duas prejudicarem os controles.
- Fotos dos cards em proporção próxima de 4:5; cards de catálogo não devem ter altura de tela inteira. Fotos não podem esconder nome e ações.

Conferir particularmente 1366 × 768 e celulares de pouca altura. Em cenas fixadas pelo scroll, dimensionar o conteúdo pela altura disponível após o header. Quando uma composição não couber, remover a fixação e usar fluxo normal. Nunca cortar controles para preservar a animação.

### Evitar

Não enumerar as seções com “01”, “02”, “03”. Não usar travessões como recurso de redação. Não escrever “transforme sua essência”, “eleve seu estilo”, “experiência única” e outros slogans vagos. Não repetir botões verdes de WhatsApp em cada card. Não repetir o mesmo reveal de entrada em toda a página.

## Arquitetura da experiência

### Header

Wordmark VÉRIA original em SVG ou texto, menu enxuto com Coleção, Looks e Sobre, busca no catálogo e acesso aos favoritos com contador. Menu mobile utilizável por toque e teclado.

Mostrar um aviso discreto e legível: **“Marca fictícia · demonstração de site”**. O aviso não pode ser uma tela de bloqueio nem competir com as fotografias.

### Hero: editorial que se abre durante o scroll

Texto inicial sugerido:

> Vista o seu momento.
>
> Peças para combinar de novo, do seu jeito.

CTA principal: **Explorar a coleção**. Leva ao catálogo, sem depender da animação terminar. CTA secundário: **Ver os looks**. Ambos internos.

Composição inicial: fundo de papel, uma fotografia principal em grande escala e uma segunda fotografia menor, assimétrica. A marca aparece como elemento editorial, sem cobrir rosto nem roupa. Um pequeno recorte de produto ajuda a conectar a abertura ao catálogo.

No desktop, usar uma timeline de scroll com aproximadamente 1,5 a 2 alturas de viewport de duração. Não criar uma travessia interminável para sair da hero.

| Progresso aproximado | Comportamento |
| --- | --- |
| 0% a 25% | Editorial legível; texto e fotos assentados, com movimento leve |
| 25% a 55% | A fotografia principal muda de enquadramento com máscara; a secundária se aproxima e revela outro look |
| 55% a 80% | Pequenas imagens de peças entram próximas ao look, conectando editorial e catálogo |
| 80% a 100% | A composição se resolve e entrega a seção seguinte sem saltos de layout |

Use transformações, máscaras e opacidade com propósito. Não fazer o texto girar, deformar ou desaparecer antes de poder ser lido. Navegação, foco e CTA precisam funcionar em qualquer ponto da timeline.

No celular, priorizar uma sequência vertical compacta, com transições mais simples e sem prender a rolagem se faltar espaço. Para `prefers-reduced-motion`, apresentar uma composição estática completa.

Vídeo e sequência de centenas de frames não são necessários. A primeira versão deve ficar excelente com fotografias bem escolhidas. Se houver um vídeo local adequado, usá-lo só como melhoria opcional, com poster, sem som e com uma alternativa estática.

### Catálogo: a parte mais útil

Título sugerido: **Sua próxima combinação começa aqui.**

Criar pelo menos 12 produtos demonstrativos distribuídos entre Blusas, Jeans, Vestidos, Conjuntos e Alfaiataria. Os filtros devem ser reais, derivados dos dados.

Controles:

- Categoria.
- Ocasião: Dia a dia, Trabalho e Saída.
- Tamanho, quando houver variantes correspondentes.
- Busca textual por nome e categoria.
- Limpar filtros e contador de resultados.

Não criar filtros de cores ou tamanhos que deixem todas as combinações vazias por falta de variantes. Quando não houver resultado, oferecer uma explicação curta e o botão Limpar filtros.

Cada card mostra fotografia, nome, categoria, preço demonstrativo e favorito. “Ver peça” abre os detalhes dentro do site. Seleção de tamanho e consulta ficam nos detalhes, não como quatro botões externos no card.

Identificar junto ao catálogo: **“Peças e preços ilustrativos. Não há vendas nesta demonstração.”**

### Detalhes da peça

Abrir um painel ou dialog acessível com:

- Imagem principal e imagem de detalhe quando disponível.
- Nome, preço de exemplo, categoria e descrição curta.
- Variações de cor e tamanho realmente presentes nos dados.
- Guia de medidas demonstrativo em centímetros, identificado como exemplo.
- Favoritar e **Adicionar à seleção**.

Ao selecionar uma variante, atualizar o resumo correspondente. Não recolorir digitalmente a mesma fotografia para fingir que existem cores diferentes fotografadas. Variantes sem imagem própria podem usar uma amostra de cor acompanhada dessa informação.

O dialog precisa fechar por botão e Escape, conter o foco enquanto aberto e devolvê-lo ao controle que o abriu. Não deixar a página perder a posição de scroll ao fechar.

### Editorial de ocasiões

Três composições distintas: **Dias leves**, **Do trabalho ao encontro** e **Fim de semana**.

Uma delas pode ocupar uma faixa ampla com fotografia; outra pode combinar um recorte de produto e texto; a terceira usa duas fotos em proporções diferentes. Evitar três cards grandes idênticos.

Cada composição abre os produtos daquela ocasião no catálogo e atualiza o filtro. A animação pode aproximar dois recortes, revelar a fotografia por máscara ou acompanhar um título curto. A pessoa deve conseguir clicar antes de a animação acabar.

### Looks combináveis

Criar três looks prontos, compostos por produtos existentes no catálogo. Apresentar uma fotografia do look e miniaturas das peças correspondentes.

Oferecer troca entre combinações compatíveis. A experiência pode alternar entre três conjuntos previamente definidos; não precisa sintetizar roupas no corpo da modelo ou fingir um provador virtual.

Uma interação bem resolvida é melhor que um “montador” com dezenas de opções desconectadas. Ao trocar, imagens e lista de peças devem atualizar juntas. Permitir abrir o detalhe de cada peça e adicionar o conjunto à seleção.

Mensagem clara no componente: **“Combinações demonstrativas, sem reserva de estoque.”**

### Seleção e favoritos

Favoritos podem ser persistidos no navegador, com tratamento para armazenamento indisponível. A seleção deve permitir incluir e remover variantes, sem formulário de pagamento ou contagem de frete.

No modo demonstração, a ação final é **Ver resumo da seleção**. Mostrar produtos e variantes escolhidos e explicar que um projeto real pode encaminhar esse resumo ao atendimento da loja.

Não enviar esse suposto pedido para o WhatsApp do Erick como se ele fosse a VÉRIA. Não abrir conversas automaticamente. Não mostrar “Pedido realizado”, “Pagamento aprovado” ou “Reserva confirmada”.

### Sobre a proposta e FAQ

Apresentação curta: a VÉRIA é uma marca fictícia criada para demonstrar uma vitrine de moda com curadoria visual e navegação por peças. Não inventar fundadora, data de abertura, endereço, fábrica própria ou resultados comerciais.

FAQ com respostas breves:

- É uma loja real? Não, é uma demonstração criada pela Rabik.
- Posso comprar as peças? Não há vendas; os produtos são exemplos.
- Esse tipo de site pode usar as fotos da minha loja? Sim, com materiais fornecidos ou autorizados por ela.
- Posso ter categorias, tamanhos e looks diferentes? Sim, o projeto pode ser adaptado ao catálogo real.
- É necessário ter carrinho? Não. Uma vitrine pode organizar as peças antes de encaminhar uma consulta ao atendimento.
- Posso editar os produtos sozinho? É possível desenvolver essa opção; painel e operação são definidos à parte no orçamento.

### Fechamento da Rabik

Separar visualmente a marca fictícia da autoria real:

> Essa apresentação poderia ser da sua loja.
>
> A Rabik cria sites com a identidade, as peças e as informações do seu negócio.

CTA: **Conversar sobre um site para minha loja**.

Usar o WhatsApp confirmado da Rabik: **+55 61 98364-5763**, número internacional sem sinais **5561983645763**.

Mensagem:

> Olá! Vi a demonstração de moda feminina da Rabik e quero conversar sobre um site para minha loja de roupas.

Gerar o link pelo código, sem copiar uma mensagem solta:

```ts
const rabikPhone = '5561983645763';
const rabikMessage = 'Olá! Vi a demonstração de moda feminina da Rabik e quero conversar sobre um site para minha loja de roupas.';
const rabikUrl = `https://wa.me/${rabikPhone}?text=${encodeURIComponent(rabikMessage)}`;
```

O link só abre por ação explícita da pessoa. Não use o navegador ou o WhatsApp Web do proprietário para testar. Confira a formação da URL no código. O e-mail real da Rabik é `rabik.digital@gmail.com` e pode aparecer no rodapé com `mailto:`.

## Conteúdo demonstrativo e modelo de dados

Separar identidade, produtos, looks, assets e contato em arquivos de dados. Evitar nomes e telefones espalhados pelos componentes.

Estrutura sugerida, adaptável à stack escolhida:

```text
docs/
  SPEC.md
  ACCEPTANCE.md
  TASKS.md
  DECISIONS.md
  ASSETS.md
  HANDOFF.md
src/
  data/
    brand.ts
    products.ts
    looks.ts
  components/
    Header
    EditorialHero
    Catalog
    ProductDetails
    OccasionEditorial
    LookExplorer
    SelectionSummary
    FAQ
    RabikContact
  styles/
    tokens.css
    global.css
public/
  assets/
    editorial/
    products/
    details/
```

Esses nomes são responsabilidades, não uma obrigação de criar dezenas de abstrações.

Modelo mínimo de produto:

```ts
type Occasion = 'daily' | 'work' | 'going-out';
type Category = 'tops' | 'denim' | 'dresses' | 'sets' | 'tailoring';

type Product = {
  id: string;
  name: string;
  category: Category;
  occasions: Occasion[];
  priceInCents: number;
  isDemonstrative: true;
  description: string;
  image: { src: string; alt: string; objectPosition?: string };
  detailImage?: { src: string; alt: string };
  variants: {
    id: string;
    colorName: string;
    colorHex: string;
    size: string;
    imageSrc?: string;
  }[];
};

type Look = {
  id: string;
  title: string;
  occasion: Occasion;
  imageSrc: string;
  productIds: string[];
};
```

Validar unicidade dos IDs e referências dos looks. Todos os tamanhos, preços e medidas são demonstrativos. Não afirmar composição têxtil específica, certificação ou procedência que as imagens não comprovem.

Configuração de identidade:

- Nome e descrição da marca fictícia.
- `demoMode: true` como padrão.
- Contato da loja real inicialmente nulo.
- Contato da Rabik separado do contato da loja.
- Dados de localização inicialmente ausentes, sem mapa ou endereço inventados.
- Avisos de conteúdo ilustrativo.

Um projeto adaptado a uma loja real não pode simplesmente ocultar os avisos e conservar fatos fictícios. A documentação deve listar o que precisa ser substituído e confirmado.

## Imagens: plano de produção e uso

As imagens serão decisivas. Não entregar uma vitrine com três fotografias repetidas em todas as seções.

### Origem dos materiais

1. Priorize assets locais fornecidos pelo proprietário quando houver autorização e adequação à proposta.
2. Fotos da Antunes, de prospects, perfis de Instagram ou Google Maps não entram automaticamente nesta marca fictícia. Não copiar marcas, rostos, logotipos ou produtos desses negócios.
3. Pode usar imagens geradas com ferramenta de geração realmente disponível. Não declare que as gerou se apenas escreveu os prompts.
4. Para banco de imagens, confira a licença específica e registre a origem. Não presuma que encontrar uma foto na busca autoriza qualquer uso.
5. Armazene os arquivos usados localmente. Evite hotlink, URLs que expiram, imagens de busca aleatórias ou dependência de feed externo.

Se não tiver acesso à geração ou a fotografias adequadas, implemente a estrutura e escreva **um pedido único de assets**, com os briefings abaixo. Informe com clareza que a direção de arte final depende deles. Não compense a falta de foto boa aumentando os cards ou colocando emojis.

### Pacote recomendado

| Grupo | Quantidade | Papel |
| --- | ---: | --- |
| Editoriais principais | 2 | Hero e transição entre looks |
| Editoriais de ocasiões | 2 | Composições de meio de página; uma cena da hero também pode ser reaproveitada |
| Fotos individuais de produtos | 12 | Uma por produto, sem repetir a mesma foto para produtos diferentes |
| Detalhes de tecido/modelagem | 2 | Complemento de peças escolhidas e seção editorial |

Total recomendado: **18 imagens distintas**. Reutilizar uma imagem editorial em um contexto secundário é aceitável; fingir que uma mesma peça representa produtos diferentes não é.

Arquivos sugeridos: `hero-look-a`, `hero-look-b`, `occasion-work`, `occasion-weekend`, `product-01` até `product-12`, `detail-tailoring` e `detail-denim`. Gerar formatos responsivos WebP/AVIF durante a implementação, preservando os originais.

### Direção para fotografias geradas

Mantenha consistência de iluminação, acabamento e roupas. Fotografias editoriais com mulheres claramente adultas, roupas casuais contemporâneas e pose natural. Sem nudez, erotização, logotipos de terceiros ou texto dentro da imagem. Valorize textura e caimento reais. Inspecione anatomia, mãos, costuras e acessórios.

**Hero A:** fotografia editorial de moda feminina, mulher adulta brasileira com camisa clara e jeans de corte reto, plano de corpo inteiro, iluminação de janela suave, ambiente arquitetônico claro, composição com espaço negativo para o título, acabamento de revista contemporânea, sem marcas ou texto. Formato horizontal, com enquadramento aproveitável em recorte vertical.

**Hero B:** fotografia da mesma coleção, mulher adulta brasileira de outro tom de pele e outro tipo de corpo, conjunto de alfaiataria em tom rosado ou vinho suave, cenário claro e luz coerente com a primeira foto, pose em movimento natural, roupa inteira visível, espaço negativo, sem logos e sem texto.

**Ocasião trabalho:** modelo adulta usando combinação que possa corresponder a peças reais do catálogo demonstrativo, alfaiataria contemporânea e blusa simples, arquitetura urbana clara, foco no look. Evitar escritório artificial e poses corporativas clichês.

**Ocasião fim de semana:** modelo adulta com vestido ou combinação casual, luz natural, cenário urbano simples, enquadramento confortável e expressão espontânea. Não parecer campanha de luxo incompatível com uma loja acessível.

**Produtos:** fotografia de produto isolado em fundo claro, uma peça inteira por imagem, luz uniforme, tecido legível, sem logo, sem lettering e sem mãos. Alternar apenas quando necessário entre peça em cabide invisível e flat lay; manter coerência dentro de cada categoria.

Produtos de exemplo para essas 12 fotos: camiseta off-white, blusa vinho, camisa branca, jeans reto, jeans amplo, vestido midi, vestido curto casual, conjunto claro, conjunto rosado, blazer, calça de alfaiataria e saia midi. As combinações editoriais devem usar roupas visualmente compatíveis com esses produtos.

**Detalhes:** close de tecido e costura de alfaiataria; close de jeans. Sem alegar composição ou qualidade certificada. Esses detalhes não representam duas peças extras.

Se a geração em lote produzir imagens inconsistentes, solicite variações a partir da imagem aprovada ou ajuste o catálogo às peças efetivamente representadas. Não prometer correspondência entre foto e produto quando ela não existir.

Em `docs/ASSETS.md`, registre nome do arquivo, finalidade, origem, licença/autorização ou geração, texto alternativo, ponto de recorte e eventuais limitações. Prefira descrição da roupa e da composição no texto alternativo, sem repetir slogans.

## Animação nas outras seções

O site não pode ter uma hero excelente e todo o restante parado. Também não deve transformar cada seção em uma hero nova.

| Seção | Movimento proposto | Limite |
| --- | --- | --- |
| Catálogo | Entrada curta em grupos e transição suave dos filtros | Produto e ações continuam disponíveis; nada de cards presos ao scroll |
| Ocasiões | Revelação por máscara e aproximação moderada dos recortes | Uma composição mais expressiva, sem fixar todas as faixas |
| Looks | Transição entre fotografia e peças do look | Atualização rápida após o clique, com opção sem animação |
| Detalhes editoriais | Deslocamento sutil da imagem dentro do enquadramento | Movimento pequeno; não distorcer o tecido |
| Sobre e fechamento | Entrada discreta e mudança de plano de fundo | Texto estável e legível |

Microinterações: foco visível, estado de favorito, troca de filtros, abertura do painel e feedback de seleção. Não esconder todas as informações até hover; celular precisa oferecer o mesmo acesso.

Utilize GSAP/ScrollTrigger somente onde a timeline justificar. CSS e recursos nativos resolvem as interações simples. Se usar GSAP, confira a documentação oficial da versão instalada, registre os plugins usados e limpe timelines/listeners quando os componentes desmontarem ou o breakpoint mudar. Não inicializar uma segunda timeline a cada resize.

Não interceptar a roda do mouse, bloquear o scroll nativo ou exigir arrastar para navegar. Carrossel, se existir, terá controles visíveis, gesto opcional e operação por teclado.

## Implementação, acessibilidade e desempenho

Use a stack existente apenas se o projeto novo já tiver uma base adequada. Caso contrário, escolha uma stack pequena para site estático com interatividade local, como Astro com componentes interativos ou React com Vite e TypeScript. Justifique a escolha em poucas linhas. Não adicionar backend ou bibliotecas de estado sem necessidade.

Requisitos técnicos:

- HTML semântico, navegação por teclado e botões com nomes acessíveis.
- Contraste adequado para texto, controles e foco; não depender só de cor.
- Menu, dialog, seleção e FAQ operáveis sem mouse.
- Ações de toque confortáveis e sem sobreposição com banners.
- Imagens com dimensões reservadas para evitar saltos de layout.
- Primeira imagem importante carregada com prioridade; imagens inferiores carregadas sob demanda.
- Arquivos responsivos: não enviar uma fotografia de 4000 px a um card de celular.
- Conteúdo e navegação básica visíveis mesmo se a animação falhar.
- Estado local tolerante a armazenamento desabilitado, dados antigos ou conteúdo corrompido.
- Ausência de erros no console e de assets quebrados.
- Identidade visual reconhecível também com motion reduzido.

Meta de desempenho: abertura leve em rede móvel e Lighthouse móvel na faixa de 90 ou mais, se puder medir no ambiente. É meta de avaliação, não um resultado a anunciar sem executar. Priorize não carregar todas as 18 imagens antes de mostrar a primeira tela.

Não faça o usuário esperar por um loader cinematográfico para conseguir navegar. Não colocar preload em todas as imagens. Evite canvas/WebGL pesado: a proposta deve funcionar com fotografia, CSS e animação bem escolhida.

SEO da demonstração: título e descrição identificam claramente o projeto fictício e a autoria da Rabik. Por padrão, `noindex` para esta vitrine demonstrativa. Não publicar dados estruturados de loja real, endereço inventado ou disponibilidade de produtos. Crie favicon original coerente com o wordmark. Se criar imagem social, use material autorizado ou gerado e identifique a demonstração.

## SDD: requisitos e critérios de aceite

Documente estes requisitos em `docs/SPEC.md`. Os identificadores servem para rastreabilidade interna e **não aparecem numerados na interface**.

| ID | Requisito | Critério verificável |
| --- | --- | --- |
| R01 | Marca fictícia e autoria claras | A pessoa identifica a demonstração e a Rabik sem abrir o código |
| R02 | Hero editorial com narrativa de scroll | Transição completa em desktop, composição alternativa legível no celular e com motion reduzido |
| R03 | Catálogo funcional | Pelo menos 12 produtos; busca e filtros alteram resultados; limpeza e estado vazio funcionam |
| R04 | Detalhes e variantes | Nome, imagem, preço ilustrativo e seleção correspondem ao produto aberto |
| R05 | Favoritos e seleção locais | Incluir/remover funciona; favoritos sobrevivem ao reload quando o armazenamento permite |
| R06 | Looks ligados ao catálogo | As peças de cada look existem; trocar a combinação atualiza foto e lista juntas |
| R07 | Animação além da hero | Pelo menos três seções têm movimentos coerentes e distintos, sem bloquear ações |
| R08 | Layout compacto e responsivo | Sem overflow horizontal acidental; cards e controles não cortados nos viewports conferidos |
| R09 | Contato real da Rabik | Link com `5561983645763` e texto codificado; sem contato fictício ou abertura automática |
| R10 | Assets íntegros | Imagens suficientes, origem registrada e correspondência entre fotos e produtos |
| R11 | Conteúdo honesto | Sem depoimentos, estoque, vendas, políticas ou endereço apresentados como fatos inexistentes |
| R12 | Entrega utilizável | Build passa; instruções de execução, configuração e limitações estão documentadas |

### Verificação necessária

Faça a verificação proporcional ao projeto, com foco no que pode quebrar:

- Build e checagem de tipos disponíveis na stack.
- Integridade dos dados: IDs, variantes e referências de looks.
- Interação manual: filtros combinados, nenhum resultado, abrir/fechar detalhes, seleção, favoritos e recarregar a página.
- Teclado: menu, detalhe da peça, Escape, retorno de foco e CTA.
- Visual em 360 × 740, 390 × 844, 768 × 1024, 1366 × 768 e 1440 × 900.
- Rolagem da hero até o fim e retorno ao topo; mudança de breakpoint sem duplicar animações.
- Motion reduzido e, quando viável, armazenamento local indisponível.
- URL do WhatsApp conferida como string, sem abri-la.

Capture screenshots reais e inspecione-as se houver ferramenta disponível. Corrija cortes, espaços exagerados, repetições de imagem e problemas de composição. Se não puder abrir o preview, informe isso; não declare que conferiu visualmente só porque o build passou.

Não escreva testes que apenas repetem o CSS ou verificam que um texto fixo existe. Automatize a integridade e a lógica que de fato tenham risco; avalie composição e legibilidade visualmente.

## Ordem de trabalho

1. Inspecionar o ambiente e os assets; registrar decisões e pendências.
2. Criar a base da marca, tokens, estrutura e dados demonstrativos.
3. Fazer a primeira tela e sua versão mobile com fotografias adequadas.
4. Implementar catálogo, detalhes, favoritos, seleção e looks.
5. Integrar a timeline principal e os movimentos das demais seções.
6. Ajustar proporções, acessibilidade, carregamento e conteúdo.
7. Executar build e verificações; revisar screenshots quando possível.
8. Entregar o projeto e o resumo do que falta, sem publicar automaticamente.

Use `docs/TASKS.md` para o progresso e `docs/DECISIONS.md` para escolhas que afetem o projeto. Mantenha documentos objetivos; a maior parte do trabalho deve ser o site.

## Entrega para o proprietário

No final, informe:

- Pasta exata do novo projeto e comandos para instalar, executar e gerar o build.
- O que está funcionando e quais verificações foram realmente executadas.
- Onde trocar identidade, produtos, preços ilustrativos, looks e assets.
- Imagens geradas/usadas, suas origens e eventuais arquivos faltantes.
- Diferenças entre esta demonstração estática e uma loja com painel, estoque ou checkout.
- O que precisa ser confirmado antes de adaptar para uma empresa real.
- Confirmação de que os outros projetos e deployments foram preservados.

Não ofereça como “site pronto para vender” enquanto for uma marca fictícia. Entregue uma demonstração bonita e navegável, com uma separação clara entre o que funciona e o que ainda dependeria de um projeto real.

## Apêndice: onde esta demonstração será mais útil

Na shortlist analisada pela Rabik, Basiquinha Store, Jessica Carvalho Moda Feminina, Ella Piracicaba, Billie Prudente e Elo Co. Multimarcas são exemplos de lojas que podem se beneficiar de uma referência feminina. Isso é uma hipótese de adequação visual, não previsão de compra nem autorização dessas lojas para usar suas marcas ou fotografias.

Fonte dos números e perfis: arquivo `prospeccao_rabik_lojas_de_roupas.xlsx`, aba `Prospectos`, pesquisa registrada em 30/09/2026. Os links comerciais dessa pesquisa não fazem parte dos dados da marca fictícia. Não os importe para o site e não os abra para testar.
