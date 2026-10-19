# DESIGN.md — Casa Jacarandá

Design system do site. Gerado com a skill `design-taste-frontend` (direção **One motif**, seed `329974786`,
paleta e fontes mantidas da marca). Tudo o que muda por escola mora em `src/config/escola.ts`; este arquivo
descreve as regras que não mudam.

## A ideia

> Neste site, **a flor de cinco pétalas do jacarandá** — a árvore que dá nome à escola e floresce na rua dela
> toda primavera — vira **a única forma do sistema**.

A pétala (um retângulo com dois cantos opostos arredondados) aparece em quatro escalas:

| Escala | Onde |
| --- | --- |
| Gigante | A flor de cinco pétalas cortada pela borda no cartão do hero; a marca no rodapé |
| Grande | Máscara de toda fotografia (`.petala`, `.petala-inv`) |
| Média | Botões (`.botao`), abas do FAQ, campos do formulário |
| Pequena | Marcadores de lista (`.marcador`), inicial das famílias nos depoimentos |

Outra forma (círculo, blob, hexágono) **não entra**. Se precisar de destaque, aumente a pétala ou use um campo de cor.

**Elemento interativo:** "Em qual turma seu filho fica?" — mês e ano de nascimento → turma do ano letivo
(data de corte 31/03), linha destacada na lista e formulário de visita pré-preenchido. Sem JavaScript, a lista
de turmas com as idades continua legível.

## Cor

Uma base, uma tinta, um acento; as outras cores da marca só aparecem em campos chapados e nas pétalas.

| Token (CSS) | Papel | Padrão |
| --- | --- | --- |
| `--cor-fundo` | Base da página | `#FBF8F2` |
| `--cor-texto` | Tinta: todo texto corrido | `#22302A` |
| `--cor-primaria` | Acento: botão principal, links, cartão do formulário | `#2E7552` |
| `--cor-secundaria` | Pétala / campo (amarelo sol) | `#F2B441` |
| `--cor-suave` | Pétala / campo (azul céu) | `#9CCBE8` |
| `--cor-destaque` | Pétala / campo (frutas vermelhas) | `#D9506C` |

Derivados (`globals.css`): `-clara` (12–25% sobre branco) para campos, `-escura` para hover, `creme` para o
papel do cartão. Texto corrido sempre na tinta cheia; `texto-suave` só para notas secundárias.

## Tipo

Duas famílias, cinco tamanhos.

| Passo | Uso | Tamanho |
| --- | --- | --- |
| `t-display` | h1 do hero, marca do rodapé | `clamp(2.5rem, 4.4vw + 0.5rem, 4.75rem)` |
| `t-titulo` | h2 de cada seção | `clamp(2rem, 3.2vw + 0.5rem, 3.5rem)` |
| `t-sub` | h3, nomes, frases de destaque | `clamp(1.25rem, 0.6vw + 1rem, 1.5rem)` |
| `t-corpo` | Texto corrido | `1.0625rem` (17px), entrelinha 1.55 |
| `t-nota` | Legendas, rodapé, notas | `0.875rem` (14px) |

- **Bricolage Grotesque 600** para títulos (tracking −0.03em, entrelinha 1.0–1.05).
- **Figtree 400/500/600** para texto.
- Títulos com no máximo **duas linhas** em qualquer largura. Sem eyebrow, sem caixa-alta espaçada, sem monoespaçada,
  sem numeração 01/02/03, sem palavra destacada dentro do título.

## Espaço e grade

- Margens externas iguais: `16px` (celular) · `24px` (tablet) · `32px` (desktop); conteúdo até `1280px`.
- Hero: tela dividida 50/50 com `12px` de margem e de vão.
- Entre seções: `120–200px` no desktop, `88px` no celular. Dentro de uma seção, nunca mais que isso.
- Vizinhas nunca repetem composição. Nenhuma seção é grade de cards.

## Componentes

- **Botão** (`.botao`): chapado, cor primária, cantos de pétala `1.25rem 0`. Um formato só no site inteiro.
- **Navegação:** barra simples — marca, quatro links, um botão. Sem vidro, sem pílula flutuante.
- **Fotos:** sempre dentro da pétala; mesma luz e enquadramento por grupo; sem sombra.
- **Superfícies** se separam por degrau de tom, nunca por linha ou sombra. Linhas só dentro do formulário
  (picote do cupom).
- **Sombra** só no que flutua de verdade (botão de WhatsApp).
- **Sem gradiente, sem vidro, sem emoji, sem cards com ícone.**

## Seções (ordem do argumento)

| Seção | Afirmação | Composição |
| --- | --- | --- |
| Hero | É um berçário e escola infantil no Jardim do Mar, com matrículas abertas | Cartão de papel com faixa de pétalas ao lado da foto da sala (troca lenta de fotos) |
| Turmas | Há lugar para o seu filho, do 4º mês aos 5 anos | Lista em duas colunas com foto-pétala no lugar do marcador + calculadora de turma |
| Ambientes | Cada espaço foi feito no tamanho deles | Uma moldura em pétala cujo conteúdo muda + lista dos ambientes |
| Rotina | O dia é previsível | Três blocos que crescem: manhã, meio do dia, tarde |
| Faixa | O nome vem das árvores da rua | Faixa de pétalas em largura total |
| Proposta | Brincar é o método | Foto gigante em pétala cortada pela borda + pontos marcados com pétala |
| Quem cuida | Tem uma pessoa responsável, com nome | Painel escuro embutido, retrato em pétala |
| Famílias | Outras famílias aprovam | Bilhetes de papel inclinados + prancha botânica |
| Visita | Agendar é fácil | Formulário-cupom com picote |
| Dúvidas | As respostas estão aqui | Fichas com abas empilhadas |
| Rodapé | — | A palavra Jacarandá construída em blocos-pétala |

## Movimento

- **Assinatura:** troca lenta das fotos do hero (1,6s de fusão, ~5,5s cada), pausa com aba oculta.
- Entrada por partes em cada seção (título → texto → imagem, 60–90ms de intervalo, sobe 16–24px).
- Retorno em todo controle (hover, foco, pressão).
- Só `transform` e `opacity`. Com `prefers-reduced-motion`, nada se desloca e a primeira foto fica parada.

## Imagens

Ordem de preferência: fotos da própria escola (`public/escola/`, ver `LEIA-ME.txt`) → acervos abertos
creditados (`public/acervo/`, créditos no rodapé) → fotos de exemplo do Unsplash (só na demo).
