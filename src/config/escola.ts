/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ESCOLA — o ÚNICO arquivo que você precisa editar.
 * ============================================================================
 *
 *  Para personalizar para uma nova escola:
 *  1. Troque os textos, contatos e cores abaixo.
 *  2. Solte logo, fotos e vídeo em /public/escola com os NOMES indicados em
 *     cada  foto("nome.jpg", ...)  abaixo. Se o arquivo existir, ele é usado
 *     automaticamente; se não existir, aparece a foto de exemplo do Unsplash.
 *  3. Rode `npm run blur` (placeholders desfocados) e reinicie o `npm run dev`.
 *
 *  Lista completa de arquivos e tamanhos: public/escola/LEIA-ME.txt
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
  descricao:
    "Berçário e educação infantil em São Bernardo do Campo para bebês a partir de 4 meses até 5 anos. Período integral, câmeras com acesso dos pais, nutricionista e adaptação gradual.",
  /**
   * Logo: detectado automaticamente em /public/escola/logo.svg (ou .png/.webp).
   * Use um logo HORIZONTAL com fundo transparente. Sem arquivo, aparece o logo em texto.
   * `logo-branco` (opcional) é a versão clara usada no rodapé escuro.
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
  // Use cores com bom contraste com branco para `primaria` (botões).
  // ---------------------------------------------------------------------------
  cores: {
    primaria: "#2E7552", // verde folha — botões, títulos de destaque
    secundaria: "#F2B441", // amarelo sol — selos, detalhes
    suave: "#9CCBE8", // azul céu — fundos e formas
    destaque: "#D9506C", // frutas vermelhas — acentos pontuais
    fundo: "#FBF8F2", // off-white
    texto: "#22302A", // cor do texto principal
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
  // HERO + VÍDEO TOUR
  // ---------------------------------------------------------------------------
  hero: {
    selo: "Matrículas 2027 abertas",
    titulo: "Conheça cada cantinho da escola antes mesmo da visita",
    /** Trecho do título que ganha o sublinhado desenhado à mão (precisa existir no título). */
    tituloDestaque: "cada cantinho",
    /** Prova social ao lado dos botões. */
    nota: "4,9",
    notaTexto: "no Google · mais de 180 famílias avaliaram",
    /** Selo flutuante sobre o vídeo. */
    seloVideo: "Câmeras ao vivo para os pais",
    subtitulo:
      "Um berçário e educação infantil de bairro, com rotina acolhedora, equipe próxima e câmeras para você acompanhar o dia do seu filho de onde estiver.",
    ctaPrincipal: "Agendar uma visita",
    ctaSecundario: "Assistir ao tour",
  },
  video: {
    /**
     * Aceita:
     *  - vídeo local:  "/escola/tour.mp4"   (coloque o arquivo em /public/escola)
     *  - YouTube:      "https://www.youtube.com/watch?v=XXXXXXXXXXX" ou "https://youtu.be/XXXXXXXXXXX"
     *  - qualquer .mp4 público
     * Se existir /public/escola/tour.mp4, ele é usado; senão, vídeo de exemplo do Mixkit.
     */
    url: arquivoLocal("tour.mp4") ?? "https://assets.mixkit.co/videos/42165/42165-720.mp4",
    titulo: "Tour pela Casa Jacarandá",
    duracao: "2 min",
    capa: foto("capa-video.jpg", "1567746455504-cb3213f8f5b8"),
    capaAlt: "Sala ampla e iluminada com mesinhas de madeira, pufes coloridos e estantes de brinquedos",
  },
  /** Faixa com 4 números de confiança. Ícones: casa, coracao, relogio, estrela */
  numeros: [
    { icone: "casa", valor: "12 anos", rotulo: "cuidando de famílias do bairro" },
    { icone: "coracao", valor: "1 para 4", rotulo: "educadora por bebê no berçário" },
    { icone: "relogio", valor: "7h às 19h", rotulo: "período integral ou meio período" },
    { icone: "estrela", valor: "4,9", rotulo: "nota no Google (180+ avaliações)" },
  ] as const,

  // ---------------------------------------------------------------------------
  // TURMAS
  // ---------------------------------------------------------------------------
  turmas: [
    {
      nome: "Berçário",
      faixa: "4 meses a 1 ano e 11 meses",
      descricao:
        "Ambiente tranquilo, colo sempre que precisar e rotina respeitando o sono e a alimentação de cada bebê.",
      foto: foto("turma-bercario.jpg", "1515488042361-ee00e0ddd4e4"),
      alt: "Bebê visto de cima brincando sobre tapete branco com bichinhos de pelúcia e livrinhos",
    },
    {
      nome: "Maternal I",
      faixa: "2 anos",
      descricao:
        "Descobertas pelo corpo e pelos sentidos: blocos, texturas, música e os primeiros combinados em grupo.",
      foto: foto("turma-maternal-1.jpg", "1484820540004-14229fe36ca4"),
      alt: "Mãos de criança empilhando blocos coloridos de papelão com desenhos de animais",
    },
    {
      nome: "Maternal II",
      faixa: "3 anos",
      descricao:
        "Faz de conta, linguagem em expansão e mais autonomia para comer, se vestir e escolher brincadeiras.",
      foto: foto("turma-maternal-2.jpg", "1578349035260-9f3d4042f1f7"),
      alt: "Carrinhos de brinquedo sobre um tapete de pista com crianças brincando ao fundo",
    },
    {
      nome: "Jardim I",
      faixa: "4 anos",
      descricao:
        "Projetos investigativos, artes, contação de histórias e primeiras experiências com letras e números.",
      foto: foto("turma-jardim-1.jpg", "1605627079912-97c3810a11a4"),
      alt: "Mãos de criança recortando e desenhando em papel colorido sobre mesa com materiais de arte",
    },
    {
      nome: "Jardim II",
      faixa: "5 anos",
      descricao:
        "Preparação tranquila para o fundamental: leitura de mundo, escrita espontânea e projetos em grupo.",
      foto: foto("turma-jardim-2.jpg", "1588075592405-d3d4f0846961"),
      alt: "Crianças de costas sentadas no tapete ouvindo a professora contar uma história",
    },
  ],

  // ---------------------------------------------------------------------------
  // ESTRUTURA / AMBIENTES
  // ---------------------------------------------------------------------------
  ambientes: [
    {
      nome: "Berçário",
      descricao: "Berços individuais, poltrona de amamentação e luz natural.",
      foto: foto("ambiente-bercario.jpg", "1774578342155-8d7e44a18bfd"),
      alt: "Berçário claro com berço branco, poltrona de amamentação e quadros delicados na parede",
    },
    {
      nome: "Sala de soninho",
      descricao: "Penumbra, ventilação e roupa de cama de cada criança.",
      foto: foto("ambiente-soninho.jpg", "1542901689-8917f44e3541"),
      alt: "Berço de madeira com travesseiro de ovelhinha e móbile, em ambiente tranquilo",
    },
    {
      nome: "Parque e solário",
      descricao: "Área externa com escorregador, grama e sol da manhã.",
      foto: foto("ambiente-parque.jpg", "1775327510739-0ccba35a0cc9"),
      alt: "Parquinho colorido com escorregador amarelo e estrutura azul sob céu aberto",
    },
    {
      nome: "Salas de atividades",
      descricao: "Mobiliário na altura das crianças e cantinhos temáticos.",
      foto: foto("ambiente-salas.jpg", "1567746512136-f005499a7575"),
      alt: "Sala de atividades com bandeirolas verdes, banco circular estofado e estantes baixas",
    },
    {
      nome: "Refeitório",
      descricao: "Mesinhas e cadeiras do tamanho certo para comer com autonomia.",
      foto: foto("ambiente-refeitorio.jpg", "1763310225537-f7161d5c93e9"),
      alt: "Refeitório infantil com mesinhas brancas e cadeiras pequenas de madeira",
    },
    {
      nome: "Sala sensorial",
      descricao: "Texturas, luzes, piscina de bolinhas e brincadeiras com tinta.",
      foto: foto("ambiente-sensorial.jpg", "1764418717252-07342e14d58a"),
      alt: "Piscina de bolinhas em tons de verde, rosa, amarelo e azul",
    },
    {
      nome: "Biblioteca",
      descricao: "Livros ao alcance das mãos para a roda de histórias.",
      foto: foto("ambiente-biblioteca.jpg", "1716324339623-384495f47373"),
      alt: "Estante de madeira com livros infantis coloridos organizados por prateleira",
    },
    {
      nome: "Entrada e acolhida",
      descricao: "Recepção segura com controle de acesso e escaninho de cada criança.",
      foto: foto("ambiente-entrada.jpg", "1786667395451-3f0cbf620a90"),
      alt: "Espaço de acolhida com paredes amarelas e escaninhos de madeira para as mochilas",
    },
  ],

  // ---------------------------------------------------------------------------
  // ROTINA DO DIA
  // ---------------------------------------------------------------------------
  /** Ícones: chegada, cafe, arte, parque, refeicao, sono, lanche, musica, jantar, saida */
  rotina: [
    { icone: "chegada", hora: "7h", titulo: "Acolhida", descricao: "Chegada tranquila, brincadeiras livres e conversa com a família." },
    { icone: "cafe", hora: "8h", titulo: "Café da manhã", descricao: "Frutas, pães e leite, com cardápio da nutricionista." },
    { icone: "arte", hora: "9h", titulo: "Atividades e projetos", descricao: "Arte, música, movimento e exploração por turma." },
    { icone: "parque", hora: "10h", titulo: "Parque e solário", descricao: "Brincar ao ar livre e banho de sol." },
    { icone: "refeicao", hora: "11h", titulo: "Almoço", descricao: "Comida caseira feita na escola, todos os dias." },
    { icone: "sono", hora: "12h", titulo: "Soninho", descricao: "Descanso respeitando o ritmo de cada criança." },
    { icone: "lanche", hora: "14h30", titulo: "Lanche e higiene", descricao: "Lanche da tarde, troca e cuidado com o corpo." },
    { icone: "musica", hora: "15h30", titulo: "Oficinas", descricao: "Culinária, histórias, brincadeiras cantadas e sensorial." },
    { icone: "jantar", hora: "17h", titulo: "Jantar", descricao: "Refeição leve para chegar em casa tranquilo." },
    { icone: "saida", hora: "17h30", titulo: "Saída até 19h", descricao: "Brincadeiras calmas e entrega com recado do dia." },
  ] as const,

  // ---------------------------------------------------------------------------
  // PROPOSTA PEDAGÓGICA
  // ---------------------------------------------------------------------------
  proposta: {
    titulo: "Brincar é coisa séria por aqui",
    texto:
      "Seguimos a BNCC com um olhar sensível para cada criança. As experiências partem do interesse da turma, com tempo para explorar, errar e descobrir. A família participa de perto, com devolutivas frequentes e portas abertas.",
    foto: foto("proposta.jpg", "1596464716127-f2a82984de30"),
    fotoAlt: "Mesa de atividades com canetinhas coloridas, pedrinhas pintadas e mãos de criança desenhando",
    camposBncc: [
      "O eu, o outro e o nós",
      "Corpo, gestos e movimentos",
      "Traços, sons, cores e formas",
      "Escuta, fala, pensamento e imaginação",
      "Espaços, tempos, quantidades, relações e transformações",
    ],
  },
  /** Ícones disponíveis: camera, nutricao, adaptacao, agenda, seguranca, natureza */
  diferenciais: [
    {
      icone: "camera",
      titulo: "Câmeras com acesso dos pais",
      descricao: "Acompanhe as salas pelo celular, com acesso seguro e individual.",
    },
    {
      icone: "nutricao",
      titulo: "Nutricionista e cozinha própria",
      descricao: "Cardápio sazonal, introdução alimentar e atenção a restrições.",
    },
    {
      icone: "adaptacao",
      titulo: "Adaptação gradual",
      descricao: "Família presente nos primeiros dias, no tempo de cada criança.",
    },
    {
      icone: "agenda",
      titulo: "Agenda digital",
      descricao: "Sono, alimentação, trocas e fotos do dia direto no app.",
    },
  ] as const,

  // ---------------------------------------------------------------------------
  // QUEM CUIDA (diretora / fundadora)
  // ---------------------------------------------------------------------------
  equipe: {
    titulo: "Uma escola com rosto, nome e porta aberta",
    texto:
      "Abri a Casa Jacarandá depois de 15 anos em sala de aula, com uma ideia simples: uma escola pequena o bastante para conhecer cada família pelo nome. Até hoje recebo pessoalmente cada visita, e é isso que eu gostaria de fazer com você.",
    nome: "Patrícia Andrade",
    cargo: "Diretora e fundadora · Pedagoga, pós em Educação Infantil",
    foto: foto("diretora.jpg", "1580489944761-15a19d654956"),
    alt: "Retrato da diretora da escola sorrindo em um ambiente iluminado",
    destaques: [
      { valor: "100%", rotulo: "das educadoras formadas em Pedagogia" },
      { valor: "8 anos", rotulo: "tempo médio da equipe na escola" },
      { valor: "Todo ano", rotulo: "reciclagem em primeiros socorros" },
    ],
  },

  /** Faixa de chamada final, antes do rodapé. */
  ctaFinal: {
    titulo: "As vagas de 2027 estão sendo preenchidas",
    texto: "Agende uma visita sem compromisso e conheça a escola com calma.",
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
        "O que mais pesou para nós foi a alimentação. Comida de verdade, feita na escola, e a nutricionista ajudou muito na introdução alimentar.",
      nome: "Rafael e Camila",
      relacao: "pais do Theo, Maternal I",
    },
    {
      texto:
        "Consigo olhar a câmera no intervalo do trabalho e a agenda digital me conta tudo. Isso me dá uma tranquilidade enorme.",
      nome: "Juliana P.",
      relacao: "mãe da Alice, Maternal II",
    },
    {
      texto:
        "Escola pequena, todo mundo sabe o nome do meu filho. Ele aprendeu muito brincando e chegou no Jardim II super preparado.",
      nome: "André L.",
      relacao: "pai do Miguel, Jardim II",
    },
  ],

  // ---------------------------------------------------------------------------
  // FORMULÁRIO DE VISITA
  // ---------------------------------------------------------------------------
  visita: {
    titulo: "Venha tomar um café e conhecer a escola",
    texto:
      "A visita dura cerca de 40 minutos. Você conhece os ambientes, a equipe e tira todas as dúvidas com calma. Preencha e a gente confirma o horário pelo WhatsApp.",
    idades: [
      "4 a 11 meses",
      "1 ano",
      "2 anos",
      "3 anos",
      "4 anos",
      "5 anos",
      "Ainda vai nascer",
    ],
    periodos: ["Manhã", "Tarde", "Tanto faz"],
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  faq: [
    {
      pergunta: "A partir de qual idade vocês recebem os bebês?",
      resposta:
        "Recebemos bebês a partir de 4 meses no Berçário e acompanhamos as crianças até os 5 anos, no Jardim II.",
    },
    {
      pergunta: "Vocês têm período integral?",
      resposta:
        "Sim. Funcionamos das 7h às 19h, com opções de período integral (até 12h), meio período manhã ou tarde e horários estendidos.",
    },
    {
      pergunta: "Como funciona a alimentação?",
      resposta:
        "Todas as refeições são preparadas na nossa cozinha, com cardápio elaborado por nutricionista. Acompanhamos a introdução alimentar junto com a família e respeitamos alergias e restrições com laudo.",
    },
    {
      pergunta: "Posso acompanhar meu filho pelas câmeras?",
      resposta:
        "Sim. As salas e áreas comuns têm câmeras, e cada família recebe um acesso individual pelo celular, em horários definidos.",
    },
    {
      pergunta: "Como é a adaptação?",
      resposta:
        "Gradual e personalizada. Nos primeiros dias a família fica junto, e o tempo de permanência aumenta conforme a criança se sente segura. Em geral leva de 1 a 3 semanas.",
    },
    {
      pergunta: "Quais são os valores?",
      resposta:
        "Os valores variam conforme a turma e o período escolhido. Na visita apresentamos a tabela completa, o que está incluso (alimentação, material, agenda digital) e as condições para irmãos.",
    },
  ],
};

export type Escola = typeof escola;
