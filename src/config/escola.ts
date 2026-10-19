/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ESCOLA — o ÚNICO arquivo que você precisa editar.
 * ============================================================================
 *
 *  Para personalizar para uma nova escola:
 *  1. Troque os textos, contatos e cores abaixo.
 *  2. Solte logo e fotos em /public/escola com os NOMES indicados em
 *     cada  foto("nome.jpg", ...)  abaixo. Se o arquivo existir, ele é usado
 *     automaticamente; se não existir, aparece a foto de exemplo do Unsplash.
 *  3. Rode `npm run blur` (placeholders desfocados) e reinicie o `npm run dev`.
 *
 *  Lista completa de arquivos e tamanhos: public/escola/LEIA-ME.txt
 *  Regras visuais (forma, cores, tipos): DESIGN.md na raiz.
 * ============================================================================
 */

/** Arquivos presentes em /public/escola (lidos no build pelo next.config.ts). */
const arquivosLocais = (process.env.ARQUIVOS_ESCOLA ?? "").split("|");
const existeLocal = (arquivo: string) => arquivosLocais.includes(arquivo);

/**
 * Usa /public/escola/<arquivo> se ele existir; senão, a foto de exemplo do Unsplash.
 * Aceita o mesmo nome em .jpg, .jpeg, .png ou .webp.
 */
const foto = (arquivo: string, unsplashId: string) => {
  const base = arquivo.replace(/\.\w+$/, "");
  const achado = ["jpg", "jpeg", "png", "webp"].map((ext) => `${base}.${ext}`).find(existeLocal);
  return achado
    ? `/escola/${achado}`
    : `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=1600&q=80`;
};

/** Primeiro arquivo da lista que existir em /public/escola. */
const arquivoLocal = (...nomes: string[]) => {
  const achado = nomes.find(existeLocal);
  return achado ? `/escola/${achado}` : null;
};

export const escola = {
  /** Mostra a faixa "Site demonstrativo" e marca os depoimentos como exemplo. */
  isDemo: true,

  // ---------------------------------------------------------------------------
  // IDENTIDADE
  // ---------------------------------------------------------------------------
  nome: "Casa Jacarandá",
  nomeCompleto: "Casa Jacarandá – Berçário e Educação Infantil",
  slogan: "Berçário e Educação Infantil",
  /** Palavra construída em blocos no rodapé (curta: 6 a 10 letras). */
  marcaRodape: "Jacarandá",
  descricao:
    "Berçário e educação infantil no Jardim do Mar, em São Bernardo do Campo, do 4º mês aos 5 anos. Das 7h às 19h, com câmeras para os pais, cozinha própria com nutricionista e adaptação gradual.",
  /**
   * Logo: detectado automaticamente em /public/escola/logo.svg (ou .png/.webp).
   * Use um logo HORIZONTAL com fundo transparente. Sem arquivo, aparece o logo em texto.
   * `logo-branco` (opcional) é a versão clara usada sobre fundos escuros.
   */
  logo: {
    imagem: arquivoLocal("logo.svg", "logo.png", "logo.webp"),
    imagemClara: arquivoLocal("logo-branco.svg", "logo-branco.png", "logo-branco.webp"),
    /** Proporção do arquivo (só a razão importa; a altura na tela é fixa). */
    largura: 180,
    altura: 56,
  },
  /** URL final do site (usada no SEO e no Open Graph). */
  siteUrl: "https://casajacaranda.vercel.app",

  // ---------------------------------------------------------------------------
  // CORES — viram CSS variables usadas pelo Tailwind (bg-primaria, text-destaque…)
  // `primaria` precisa de bom contraste com branco (botões e formulário).
  // ---------------------------------------------------------------------------
  cores: {
    primaria: "#2E7552", // verde folha — acento: botões, links, formulário
    secundaria: "#F2B441", // amarelo sol — pétalas e campos
    suave: "#9CCBE8", // azul céu — pétalas e campos
    destaque: "#D9506C", // frutas vermelhas — pétalas e campos
    fundo: "#FBF8F2", // off-white
    texto: "#22302A", // tinta de todo texto corrido
  },

  // ---------------------------------------------------------------------------
  // CONTATO E LOCALIZAÇÃO
  // ---------------------------------------------------------------------------
  contato: {
    telefone: "(11) 4123-4567",
    /** WhatsApp só com números, com DDI 55 + DDD. */
    whatsapp: "5511912345678",
    whatsappExibicao: "(11) 91234-5678",
    email: "contato@casajacaranda.com.br",
    instagram: "casajacaranda",
  },
  endereco: {
    rua: "Rua das Jacarandás, 245",
    bairro: "Jardim do Mar",
    cidade: "São Bernardo do Campo",
    estado: "SP",
    cep: "09750-000",
    /** Link "Como chegar" — cole aqui o link de compartilhamento do Google Maps. */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jardim+do+Mar+S%C3%A3o+Bernardo+do+Campo+SP",
    /** Opcional, melhora o SEO local. */
    latitude: -23.6914,
    longitude: -46.5646,
  },
  horario: {
    /** Texto exibido no site. */
    exibicao: "Segunda a sexta, das 7h às 19h",
    /** Usado no SEO (formato 24h). */
    abre: "07:00",
    fecha: "19:00",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  hero: {
    titulo: "Berçário e escola infantil",
    subtitulo:
      "Do 4º mês aos 5 anos, das 7h às 19h, na Rua das Jacarandás, no Jardim do Mar. Matrículas de 2027 abertas.",
    cta: "Agendar uma visita",
    /** Três fatos curtos no pé do cartão. */
    fatos: ["1 educadora para 4 bebês", "Cozinha própria", "Câmeras para os pais"],
    /** Fotos que se alternam devagar ao lado do cartão (a primeira é a capa e a prévia de compartilhamento). */
    fotos: [
      {
        src: foto("hero-1.jpg", "1567746455504-cb3213f8f5b8"),
        alt: "Sala ampla e iluminada com mesinhas de madeira, pufes coloridos e estantes baixas",
      },
      {
        src: foto("hero-2.jpg", "1763310225230-6e15b125935a"),
        alt: "Sala de brincar com mesinhas brancas, cadeiras pequenas e cozinha de brinquedo",
      },
      {
        src: foto("hero-3.jpg", "1786667395574-8121327f52c8"),
        alt: "Estante branca com cestos coloridos cheios de brinquedos, na altura das crianças",
      },
      {
        src: foto("hero-4.jpg", "1601339434203-130259102db6"),
        alt: "Mural de sala com árvore de papel, alfabeto colorido e bichinho de pelúcia sobre a estante",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // TURMAS — `idadeEmMarco` = idade completa até 31/03 do ano letivo (data de corte)
  // ---------------------------------------------------------------------------
  anoLetivo: 2027,
  turmas: [
    {
      nome: "Berçário",
      faixa: "4 meses a 1 ano",
      idadeEmMarco: [0, 1],
      descricao: "Colo sempre que precisar e uma rotina que respeita o sono e a mamada de cada bebê.",
      nota: "1 educadora para 4 bebês",
      foto: foto("turma-bercario.jpg", "1515488042361-ee00e0ddd4e4"),
      alt: "Bebê visto de cima brincando sobre tapete branco com bichinhos de pelúcia",
    },
    {
      nome: "Maternal I",
      faixa: "2 anos",
      idadeEmMarco: [2, 2],
      descricao: "Descobertas pelo corpo e pelos sentidos: blocos, texturas, música e os primeiros combinados.",
      nota: "1 educadora para 6 crianças",
      foto: foto("turma-maternal-1.jpg", "1484820540004-14229fe36ca4"),
      alt: "Mãos de criança empilhando blocos coloridos com desenhos de animais",
    },
    {
      nome: "Maternal II",
      faixa: "3 anos",
      idadeEmMarco: [3, 3],
      descricao: "Faz de conta, linguagem em expansão e mais autonomia para comer e se vestir.",
      nota: "Desfralde com a família",
      foto: foto("turma-maternal-2.jpg", "1578349035260-9f3d4042f1f7"),
      alt: "Carrinhos de brinquedo sobre um tapete de pista",
    },
    {
      nome: "Jardim I",
      faixa: "4 anos",
      idadeEmMarco: [4, 4],
      descricao: "Projetos investigativos, artes e as primeiras experiências com letras e números.",
      nota: "Inglês brincando, 2x por semana",
      foto: foto("turma-jardim-1.jpg", "1605627079912-97c3810a11a4"),
      alt: "Mãos de criança recortando papel colorido sobre mesa de atividades",
    },
    {
      nome: "Jardim II",
      faixa: "5 anos",
      idadeEmMarco: [5, 5],
      descricao: "Preparação tranquila para o fundamental: escrita espontânea, leitura de mundo e projetos em grupo.",
      nota: "Transição acompanhada para o 1º ano",
      foto: foto("turma-jardim-2.jpg", "1588075592405-d3d4f0846961"),
      alt: "Crianças de costas, sentadas no tapete, ouvindo uma história",
    },
  ],

  // ---------------------------------------------------------------------------
  // AMBIENTES (foto quadrada ou 4:5, assunto no centro)
  // ---------------------------------------------------------------------------
  ambientes: [
    {
      nome: "Berçário",
      descricao: "Berços individuais, poltrona de amamentação e luz natural.",
      foto: foto("ambiente-bercario.jpg", "1774578342155-8d7e44a18bfd"),
      alt: "Berçário claro com berço branco e poltrona de amamentação",
    },
    {
      nome: "Sala de soninho",
      descricao: "Penumbra, ventilação e a roupa de cama de cada criança.",
      foto: foto("ambiente-soninho.jpg", "1542901689-8917f44e3541"),
      alt: "Berço de madeira com travesseiro de ovelhinha e móbile",
    },
    {
      nome: "Parque e solário",
      descricao: "Escorregador, grama e sol da manhã.",
      foto: foto("ambiente-parque.jpg", "1775327510739-0ccba35a0cc9"),
      alt: "Parquinho com escorregador amarelo e estrutura azul sob céu aberto",
    },
    {
      nome: "Salas de atividades",
      descricao: "Mobiliário na altura das crianças e cantinhos temáticos.",
      foto: foto("ambiente-salas.jpg", "1567746512136-f005499a7575"),
      alt: "Sala com bandeirolas verdes, banco circular estofado e estantes baixas",
    },
    {
      nome: "Refeitório",
      descricao: "Mesinhas do tamanho certo para comer com autonomia.",
      foto: foto("ambiente-refeitorio.jpg", "1763310225537-f7161d5c93e9"),
      alt: "Refeitório infantil com mesinhas brancas e cadeiras pequenas",
    },
    {
      nome: "Sala sensorial",
      descricao: "Texturas, luzes, bolinhas e brincadeiras com tinta.",
      foto: foto("ambiente-sensorial.jpg", "1764418717252-07342e14d58a"),
      alt: "Piscina de bolinhas verdes, rosas, amarelas e azuis",
    },
    {
      nome: "Biblioteca",
      descricao: "Livros ao alcance das mãos para a roda de histórias.",
      foto: foto("ambiente-biblioteca.jpg", "1716324339623-384495f47373"),
      alt: "Estante de madeira com livros infantis coloridos",
    },
    {
      nome: "Entrada e acolhida",
      descricao: "Controle de acesso e o escaninho de cada criança.",
      foto: foto("ambiente-entrada.jpg", "1786667395451-3f0cbf620a90"),
      alt: "Acolhida com paredes amarelas e escaninhos de madeira",
    },
  ],

  // ---------------------------------------------------------------------------
  // ROTINA — três períodos que crescem na tela
  // ---------------------------------------------------------------------------
  rotina: [
    {
      periodo: "Manhã",
      faixa: "7h às 11h",
      foto: foto("rotina-manha.jpg", "1558576997-a29a7b11a56c"),
      alt: "Criança sentada no chão tocando um xilofone colorido",
      itens: [
        { hora: "7h", texto: "Acolhida e brincadeira livre" },
        { hora: "8h", texto: "Café da manhã" },
        { hora: "9h", texto: "Projetos, arte e música" },
        { hora: "10h", texto: "Parque e banho de sol" },
      ],
    },
    {
      periodo: "Meio do dia",
      faixa: "11h às 14h30",
      foto: foto("rotina-almoco.jpg", "1782702216473-c5231106c617"),
      alt: "Melancia, morangos e queijo servidos sobre mesa azul",
      itens: [
        { hora: "11h", texto: "Almoço feito na escola" },
        { hora: "12h", texto: "Soninho, no ritmo de cada um" },
        { hora: "14h", texto: "Higiene e troca" },
      ],
    },
    {
      periodo: "Tarde",
      faixa: "14h30 às 19h",
      foto: foto("rotina-tarde.jpg", "1772209177472-fc37fdfd4484"),
      alt: "Parquinho colorido com dois escorregadores entre árvores",
      itens: [
        { hora: "14h30", texto: "Lanche da tarde" },
        { hora: "15h30", texto: "Oficinas: culinária, histórias e sensorial" },
        { hora: "17h", texto: "Jantar leve" },
        { hora: "17h30", texto: "Saída com o recado do dia, até 19h" },
      ],
    },
  ],

  /** Frase da faixa de pétalas que divide a página. */
  faixaNome: "O nome vem das árvores da nossa rua, que florescem toda primavera.",

  // ---------------------------------------------------------------------------
  // PROPOSTA PEDAGÓGICA — pontos em três colunas
  // ---------------------------------------------------------------------------
  proposta: {
    titulo: "Brincar é coisa séria",
    texto:
      "Seguimos a BNCC com um olhar para cada criança: as experiências partem do interesse da turma, com tempo para explorar, errar e descobrir.",
    foto: foto("proposta.jpg", "1596464716127-f2a82984de30"),
    fotoAlt: "Mãos de criança desenhando numa mesa com canetinhas e pedrinhas pintadas",
    pontos: [
      { titulo: "Câmeras para os pais", texto: "Acesso individual pelo celular, em horários definidos." },
      { titulo: "Cozinha própria", texto: "Cardápio da nutricionista e introdução alimentar junto da família." },
      { titulo: "Adaptação gradual", texto: "A família fica nos primeiros dias, no tempo de cada criança." },
      { titulo: "Agenda digital", texto: "Sono, refeições, trocas e fotos do dia direto no app." },
      { titulo: "O eu, o outro e o nós", texto: "Conviver, esperar a vez e cuidar do colega." },
      { titulo: "Corpo e movimento", texto: "Correr, subir, dançar e descobrir o que o corpo consegue." },
      { titulo: "Traços, sons e cores", texto: "Tinta, argila, música e instrumentos todos os dias." },
      { titulo: "Escuta e fala", texto: "Roda de histórias, conversa e as primeiras letras." },
      { titulo: "Espaços e quantidades", texto: "Contar, comparar, medir e plantar na horta." },
    ],
  },

  // ---------------------------------------------------------------------------
  // QUEM CUIDA (diretora / fundadora)
  // ---------------------------------------------------------------------------
  equipe: {
    titulo: "Uma escola com rosto e nome",
    nome: "Patrícia Andrade",
    cargo: "Diretora e fundadora",
    carta:
      "Abri a Casa Jacarandá depois de 15 anos em sala de aula, para ter uma escola pequena o bastante para conhecer cada família pelo nome. Ainda recebo pessoalmente cada visita.",
    equipeTitulo: "A equipe",
    equipeTexto:
      "Todas as educadoras são formadas em Pedagogia, ficam em média 8 anos com a gente e refazem o curso de primeiros socorros todo ano.",
    foto: foto("diretora.jpg", "1580489944761-15a19d654956"),
    alt: "Retrato da diretora sorrindo, de camiseta branca, em fundo claro",
  },

  // ---------------------------------------------------------------------------
  // DEPOIMENTOS (na demo, são exemplos e aparecem marcados como tal)
  // ---------------------------------------------------------------------------
  depoimentos: [
    {
      texto:
        "A adaptação foi no tempo da Helena. Na primeira semana eu ficava na sala, e as educadoras me mandavam fotos quando eu saía. Hoje ela chega correndo.",
      nome: "Mariana S.",
      relacao: "mãe da Helena, Berçário",
    },
    {
      texto:
        "Pesou muito a alimentação. Comida de verdade, feita ali, e a nutricionista ajudou na introdução alimentar.",
      nome: "Rafael e Camila",
      relacao: "pais do Theo, Maternal I",
    },
    {
      texto:
        "Olho a câmera no intervalo do trabalho e a agenda me conta o resto. Escola pequena, todo mundo sabe o nome dela.",
      nome: "Juliana P.",
      relacao: "mãe da Alice, Maternal II",
    },
  ],

  // ---------------------------------------------------------------------------
  // FORMULÁRIO DE VISITA
  // ---------------------------------------------------------------------------
  visita: {
    titulo: "Agende uma visita",
    texto: "Uns 40 minutos, com café, para ver a escola funcionando e conversar com calma. Confirmamos pelo WhatsApp.",
    idades: [
      "Ainda vai nascer",
      "4 a 11 meses",
      "1 ano",
      "2 anos",
      "3 anos",
      "4 anos",
      "5 anos",
    ],
    periodos: ["Manhã", "Tarde", "Tanto faz"],
  },

  // ---------------------------------------------------------------------------
  // FAQ — `topico` aparece na aba da ficha (1 ou 2 palavras)
  // ---------------------------------------------------------------------------
  faq: [
    {
      topico: "Idade",
      pergunta: "A partir de qual idade vocês recebem os bebês?",
      resposta:
        "A partir de 4 meses no Berçário, e acompanhamos as crianças até os 5 anos, no Jardim II.",
    },
    {
      topico: "Horário",
      pergunta: "Vocês têm período integral?",
      resposta:
        "Sim. Abrimos das 7h às 19h, com integral, meio período (manhã ou tarde) e horário estendido.",
    },
    {
      topico: "Comida",
      pergunta: "Como funciona a alimentação?",
      resposta:
        "Tudo é preparado na nossa cozinha, com cardápio da nutricionista. Acompanhamos a introdução alimentar com a família e respeitamos alergias e restrições com laudo.",
    },
    {
      topico: "Câmeras",
      pergunta: "Posso acompanhar meu filho pelas câmeras?",
      resposta:
        "Sim. Salas e áreas comuns têm câmeras, e cada família recebe um acesso individual pelo celular, em horários definidos.",
    },
    {
      topico: "Adaptação",
      pergunta: "Como é a adaptação?",
      resposta:
        "Gradual: nos primeiros dias a família fica junto, e o tempo na escola cresce conforme a criança se sente segura. Costuma levar de 1 a 3 semanas.",
    },
    {
      topico: "Valores",
      pergunta: "Quais são os valores?",
      resposta:
        "Dependem da turma e do período. Na visita mostramos a tabela, o que está incluso (alimentação, material, agenda digital) e as condições para irmãos.",
    },
  ],
};

export type Escola = typeof escola;
