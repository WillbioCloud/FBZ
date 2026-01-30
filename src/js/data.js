export const FBZ_DATA = {
  global: {
    whatsapp: "5564999999999", // Seu número real
    whatsappDefaultMsg: "Olá! Vim pelo site da FBZ e gostaria de informações.",
  },
  empreendimentos: [
    {
      slug: "reserva-da-mata",
      nome: "Reserva da Mata",
      status: "Pré-Lançamento",
      tipo: "Ecológico",
      slogan: "A natureza no seu quintal.",
      descCurta: "O encontro perfeito entre urbanismo e preservação.",
      heroImg: "/assets/img/reserva-hero.jpg",
      cor: "amber",
      destaques: ["Mata preservada", "Pista de caminhada", "Exclusividade"],
      link: "/src/empreendimentos/reserva-da-mata.html"
    },
    {
      slug: "cidade-inteligente",
      nome: "Cidade Inteligente",
      status: "Lançamento",
      tipo: "Bairro Planejado",
      slogan: "O futuro chegou a Caldas Novas.",
      descCurta: "Infraestrutura tecnológica e monitoramento 24h.",
      heroImg: "/assets/img/cidade-inteligente-hero.jpg", 
      cor: "emerald", // para classes CSS dinâmicas
      destaques: ["Iluminação LED", "Monitoramento", "Wi-Fi nas praças"],
      link: "/src/empreendimentos/cidade-inteligente.html"
    },
    {
      slug: "singapura-shopping",
        nome: "Singapura Shopping",
        status: "Em Obras",
        tipo: "Comercial",
        slogan: "O novo centro comercial de Caldas Novas.",
        descCurta: "Lojas e salas comerciais em localização estratégica.",
        heroImg: "/assets/img/singapura-shopping-hero.jpg",
        cor: "purple",
        destaques: ["Localização estratégica", "Estacionamento amplo", "Alta visibilidade"],
        link: "/src/empreendimentos/singapura-shopping.html"
    },
    {
      slug: "cidade-universitaria",
      nome: "Cidade Universitária",
      status: "Em Obras",
      tipo: "Investimento",
      slogan: "Ao lado do polo universitário.",
      descCurta: "Alta demanda de aluguel e valorização garantida.",
      heroImg: "/assets/img/cidade-universitaria-hero.jpg",
      cor: "indigo",
      destaques: ["Ao lado da faculdade", "Lotes comerciais", "Alta liquidez"],
      link: "/src/empreendimentos/cidade-universitaria.html"
    },
    // Adicione os outros aqui (Cidade Verde, Flores, Lago Sul)...
    {
      slug: "setor-lago-sul",
      nome: "Setor Lago Sul",
        status: "Lançamento",
        tipo: "Residencial",
        slogan: "Viva perto da natureza.",
        descCurta: "Lotes amplos com vista para o lago.",
        heroImg: "/assets/img/setor-lago-sul-hero.jpg",
        cor: "blue",
        destaques: ["Vista para o lago", "Lotes amplos", "Segurança 24h"],
        link: "/src/empreendimentos/setor-lago-sul.html"
    },
    {
      slug: "cidade-verde",
        nome: "Cidade Verde",
        status: "Lançamento",
        tipo: "Sustentável",
        slogan: "Viva em harmonia com a natureza.",
        descCurta: "Lotes ecológicos com infraestrutura verde.",
        heroImg: "/assets/img/cidade-verde-hero.jpg",
        cor: "green",
        destaques: ["Energia solar", "Áreas verdes", "Gestão de resíduos"],
        link: "/src/empreendimentos/cidade-verde.html"
    },
  ]
};