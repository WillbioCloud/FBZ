// Adicionamos o "export const" para o app.js conseguir ler
export const FBZ_DATA = {
  global: {
    whatsapp: "556193291812", 
    whatsappDefaultMsg: "Olá! Vim pelo site da FBZ e gostaria de informações.",
  },
  empreendimentos: [
    {
      slug: "cidade-inteligente",
      nome: "Cidade Inteligente",
      status: "Lançamento",
      slogan: "Urbanismo moderno com tecnologia.",
      descCurta: "O futuro chegou a Caldas Novas. Infraestrutura tecnológica e monitoramento 24h.",
      heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80", 
      destaques: ["Iluminação LED", "Monitoramento Inteligente", "Wi-Fi nas praças", "Vias Planejadas"],
      whatsappMsg: "Olá! Gostaria de saber mais sobre a tecnologia e tabela do Cidade Inteligente.",
      faq: [
         { q: "O que torna o bairro inteligente?", a: "Infraestrutura para automação e segurança conectada." },
         { q: "Financiamento direto?", a: "Sim, direto com a construtora sem burocracia." }
      ],
      link: "/src/empreendimentos/cidade-inteligente.html"
    },
    {
      slug: "cidade-verde",
      nome: "Cidade Verde",
      status: "Disponível",
      slogan: "Vida ao ar livre com estrutura.",
      descCurta: "Um projeto com foco em áreas verdes e organização urbana.",
      heroImg: "https://images.unsplash.com/photo-1628744448839-4458d5789f2a?q=80",
      destaques: ["Áreas verdes", "Infraestrutura pronta", "Planejamento", "Valorização"],
      whatsappMsg: "Olá! Quero informações do Cidade Verde e etapas disponíveis.",
      link: "/src/empreendimentos/cidade-verde.html"
    },
    {
      slug: "reserva-da-mata",
      nome: "Reserva da Mata",
      status: "Lançamento",
      slogan: "A natureza no seu quintal.",
      descCurta: "O encontro perfeito entre urbanismo e preservação ambiental.",
      heroImg: "https://images.unsplash.com/photo-1596568205422-77884d8525b6?q=80",
      destaques: ["Mata preservada", "Pista de caminhada", "Exclusividade", "Pré-Lançamento"],
      whatsappMsg: "Estou interessado no lançamento Reserva da Mata.",
      link: "/src/empreendimentos/reserva-da-mata.html"
    },
    {
      slug: "cidade-universitaria",
      nome: "Cidade Universitária",
      status: "Em Obras",
      slogan: "Invista no polo de conhecimento.",
      descCurta: "Localização estratégica ao lado das principais faculdades.",
      heroImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80",
      destaques: ["Ao lado da faculdade", "Lotes comerciais", "Alta liquidez", "Transporte na porta"],
      whatsappMsg: "Olá! Quero investir no Cidade Universitária.",
      link: "/src/empreendimentos/cidade-universitaria.html"
    },
    {
      slug: "setor-lago-sul",
      nome: "Setor Lago Sul",
      status: "Lançamento",
      slogan: "Viva perto do lago.",
      descCurta: "Lotes residenciais com vista para o lago e infraestrutura completa.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      destaques: ["Vista para o lago", "Infraestrutura completa", "Segurança 24h", "Lazer"],
      whatsappMsg: "Olá! Quero saber mais sobre o Setor Lago Sul.",
      link: "/src/empreendimentos/setor-lago-sul.html"
    },
    {
      slug: "singapura-shopping",
      nome: "Singapura Shopping",
      status: "Em Obras",
      slogan: "O novo centro comercial.",
      descCurta: "Oportunidade única de investimento em um shopping moderno.",
      heroImg: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80",
      destaques: ["Lojas variadas", "Estacionamento amplo", "Localização estratégica", "Alto fluxo"],
      whatsappMsg: "Olá! Quero informações sobre o Singapura Shopping.",
      link: "/src/empreendimentos/singapura-shopping.html"
    },
    {
      slug: "cidade-das-flores",
      nome: "Cidade das Flores",
      status: "Disponível",
      slogan: "Beleza e tranquilidade.",
      descCurta: "Lotes residenciais em um ambiente florido e tranquilo.",
      heroImg: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
      destaques: ["Ambiente florido", "Tranquilidade", "Infraestrutura completa", "Segurança"],
      whatsappMsg: "Olá! Quero saber mais sobre a Cidade das Flores.",
      link: "/src/empreendimentos/cidade-das-flores.html"
    }
  ]
};

// Compatibilidade para páginas internas (que usam window)
window.FBZ_DATA = FBZ_DATA;