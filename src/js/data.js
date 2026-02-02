// src/js/data.js

export const FBZ_DATA = {
  global: {
    whatsapp: "556193291812",
    whatsappDefaultMsg: "Olá! Vim pelo site da FBZ e gostaria de informações.",
  },

  // ========================================================================
  // DADOS DA HOME (VITRINE)
  // Apenas um card por Empreendimento (O mais atual/principal)
  // ========================================================================
  empreendimentos: [
    {
      slug: "reserva-da-mata",
      ano: 2026,
      nome: "Reserva da Mata",
      status: "Lançamento",
      slogan: "Viva em harmonia com a natureza.",
      descCurta: "Loteamento ecológico com áreas preservadas.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      logo: "/assets/img/logo/LOGO-RESERVA-DA-MATA.webp",
      corHex: "#16a34a",
      link: "/src/empreendimentos/reserva-da-mata.html",
    },

    {
        slug: "singapura-shopping",
        ano: 2025,
        nome: "Singapura Shopping",
        status: "Entregue",
        slogan: "Compre e viva com estilo.",
        descCurta: "Shopping com infraestrutura moderna e variedade de lojas.",
        heroVideo: "https://framerusercontent.com/assets/pJpyEcSW9GgjF0Y1pCgugDlNBW4.mp4",
        heroImg: "https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_473664765_17924665778995602_5744156763880720995_n_klwy8p.jpg",
        logo: "/assets/img/logo/LOGO-SINGAPURA-SHOPPING.webp",
        corHex: "#ca2f24",
        link: "/src/empreendimentos/singapura-shopping.html",
        gallery: [
          "https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_473664765_17924665778995602_5744156763880720995_n_klwy8p.jpg",
          "https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_476741791_17928075518995602_5834963185887579820_n_nzxqqw.jpg",
          "https://res.cloudinary.com/dxplpg36m/image/upload/v1769899966/476389691_17927298083995602_4171301912659036465_n_mfogcx.jpg"
        ]
    },

    {
      slug: "cidade-inteligente",
      ano: 2024,
      nome: "Cidade Inteligente",
      status: "Em Obras",
      slogan: "Urbanismo moderno com tecnologia.",
      descCurta: "Infraestrutura tecnológica e monitoramento 24h.",
      heroVideo: "https://video.wixstatic.com/video/0ac917_b30be7cef5af44ff8c65434c03e7cf57/1080p/mp4/file.mp4",
      heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80",
      logo: "/assets/img/logo/LOGO-CIDADE-INTELIGENTE.webp",
      corHex: "#0284c7",
      link: "/src/empreendimentos/cidade-inteligente.html",
      entregaPrevistaAno: 2028,
      observacao: "Lotes vendidos antes da conclusão da infraestrutura.",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-46273834b3fb?q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      ]
    },

    {
      slug: "cidade-universitaria",
      ano: 2023,
      nome: "Cidade Universitária",
      status: "Entregue",
      slogan: "Invista no polo de conhecimento.",
      descCurta: "Localização estratégica ao lado das faculdades.",
      heroImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80",
      logo: "/assets/img/logo/LOGO-CIDADE-UNIVERSITARIA.webp",
      corHex: "#4338ca",
      link: "/src/empreendimentos/cidade-universitaria.html",
    },

    {
      slug: "cidade-verde",
      ano: 2022,
      nome: "Cidade Verde",
      status: "Disponível",
      slogan: "Vida ao ar livre com estrutura.",
      descCurta: "Projeto com foco em áreas verdes e organização urbana.",
      heroImg: "https://images.unsplash.com/photo-1628744448839-4458d5789f2a?q=80",
      logo: "/assets/img/logo/LOGO-CIDADE-VERDE.webp",
      corHex: "#15803d",
      link: "/src/empreendimentos/cidade-verde.html",
    },

    {
      slug: "cidade-das-flores",
      ano: 2021,
      nome: "Cidade das Flores",
      status: "Disponível",
      slogan: "Beleza e tranquilidade.",
      descCurta: "Ambiente florido e tranquilo.",
      heroImg: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
      logo: "/assets/img/logo/LOGO-CIDADE-DAS-FLORES.webp",
      corHex: "#b90000",
      link: "/src/empreendimentos/cidade-das-flores.html",
    },

    {
        slug: "residencial-primaver-2",
        ano: 2020,
        nome: "Residencial Primavera 2",
        status: "Entregue",
        slogan: "Vida em harmonia com a natureza.",
        descCurta: "Loteamento com áreas verdes e infraestrutura moderna.",
        heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
        logo: "/assets/img/logo/LOGO-RESIDENCIAL-PRIMAVER-2.webp",
        corHex: "#16a34a",
        link: "/src/empreendimentos/residencial-primaver-2.html",
    },

    {
      slug: "setor-lago-sul",
      ano: 2016,
      nome: "Setor Lago Sul",
      status: "Entregue",
      slogan: "Viva perto do lago.",
      descCurta: "Vista para o lago e infraestrutura completa.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      logo: "/assets/img/logo/LOGO-LAGO-SUL.webp",
      corHex: "#0369a1",
      link: "/src/empreendimentos/setor-lago-sul.html",
    },

    {
      slug: "flamboyant",
      ano: 2016,
      nome: "Flamboyant",
      status: "Entregue",
      slogan: "Exclusividade e conforto.",
      descCurta: "Projeto premium em localização estratégica.",
      heroImg: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80",
      logo: "/assets/img/logo/LOGO-FLAMBOYANT.webp",
      corHex: "#ce6722",
      link: "#",
    },

    {
      slug: "caminho-do-lago",
      ano: 2015,
      nome: "Caminho do Lago",
      status: "Entregue",
      slogan: "Seu novo horizonte.",
      descCurta: "Novo loteamento com conceito moderno.",
      heroImg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      logo: "/assets/img/logo/LOGO-CAMINHO-DO-LAGO.webp",
      corHex: "#1583b6",
      link: "#",
    },

    {
      slug: "morada-nobre",
      ano: 2014,
      nome: "Morada Nobre",
      status: "Entregue",
      slogan: "Viva com nobreza.",
      descCurta: "Residencial planejado com alto padrão.",
      heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
      logo: "/assets/img/logo/LOGO-MORADA-NOBRE.webp",
      corHex: "#18a1b9",
      link: "#",
    },
    {
      slug: "Santa-Clara",
      ano: 2012,
      nome: "Santa Clara",
      status: "Entregue",
      slogan: "Vida em harmonia.",
      descCurta: "Loteamento com infraestrutura completa e localização privilegiada.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      logo: "/assets/img/logo/LOGO-SANTA-CLARA.webp",
      corHex: "#c2410c",
      link: "/src/empreendimentos/santa-clara.html",
    }
  ],

  // ========================================================================
  // TIMELINE: A HISTÓRIA DA FBZ (ENREDO)
  // ========================================================================
  timeline: [
    {
      ano: 2007,
      nome: "A Fundação",
      descCurta: "Em 7 de janeiro, Fabrizio Silva funda a empresa. Nascia ali o compromisso de transformar a construção civil em Caldas Novas, com foco inicial em obras residenciais.",
      heroImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80",
      status: "O Início",
      link: "#"
    },
    {
      ano: 2011,
      nome: "Consolidação Técnica",
      descCurta: "Após anos construindo casas isoladas e ganhando experiência, a equipe técnica se consolida, preparando o terreno para voos mais altos no urbanismo.",
      heroImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80",
      status: "Experiência",
      link: "#"
    },
    {
      ano: 2012,
      nome: "Setor Santa Clara",
      descCurta: "O grande salto. Lançamos nosso primeiro loteamento, marcando a transição definitiva da construção de casas para o desenvolvimento urbano em larga escala.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Expansão",
      link: "/src/empreendimentos/santa-clara.html"
    },
    {
      ano: 2014,
      nome: "Morada Nobre",
      descCurta: "Elevando o padrão. Introduzimos infraestrutura diferenciada em loteamentos abertos, provando que é possível unir acessibilidade e qualidade.",
      heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
      status: "Qualidade",
      link: "#"
    },
    {
      ano: 2015,
      nome: "Caminho do Lago",
      descCurta: "Novos horizontes. Um projeto estratégico focado na valorização de áreas próximas aos pontos turísticos, conectando a cidade às suas águas.",
      heroImg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      status: "Turismo",
      link: "#"
    },
    {
      ano: 2016,
      nome: "Parque Flamboyant",
      descCurta: "Recorde histórico: 100% vendido em menos de 3 horas. A cidade de Caldas Novas abraçou a FBZ, consolidando nossa credibilidade no mercado.",
      heroImg: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80",
      status: "Fenômeno",
      link: "#"
    },
    {
      ano: 2016,
      nome: "Setor Lago Sul",
      descCurta: "A revolução do lazer. Com praia artificial e píer, transformamos a região em uma referência turística. Mais que lotes, entregamos um ponto turístico.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Transformação",
      link: "/src/empreendimentos/setor-lago-sul.html"
    },
    {
      ano: 2017,
      nome: "Setor Lago Sul 2ª Etapa",
      descCurta: "Sucesso absoluto. A segunda etapa do Lago Sul esgotou rapidamente, impulsionada pela demanda crescente por imóveis com vista para o lago e infraestrutura de lazer.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Sucesso",
      link: "/src/empreendimentos/cidade-das-arvores.html"
    },
    {
      ano: 2019,
      nome: "Lago Sul Premium",
      descCurta: "Refinamento e exclusividade. O conceito evoluiu com o Premium e o Residencial Primavera 2, focados em vistas privilegiadas e áreas de convivência.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Premium",
      link: "/src/empreendimentos/setor-lago-sul.html"
    },
    {
      ano: 2020,
      nome: "Marca 'Cidades'",
      descCurta: "Uma nova era. Criação da marca 'Cidades', elevando o padrão para bairros inteligentes com monitoramento e lazer completo. Nasce o Cidade Verde.",
      heroImg: "https://images.unsplash.com/photo-1628744448839-4458d5789f2a?q=80",
      status: "Inovação",
      link: "/src/empreendimentos/cidade-verde.html"
    },
    {
      ano: 2020,
      nome: "Primavera 2",
      descCurta: "A continuidade do sucesso. A segunda etapa do projeto Primavera traz um novo conceito de urbanização, com infraestrutura completa e áreas de lazer exclusivas.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Continuidade",
      link: "/src/empreendimentos/primavera-2.html"
    },
    {
      ano: 2021,
      nome: "Cidade Verde",
      descCurta: "O verde que transforma. Lançamento do Cidade Verde, um projeto que prioriza áreas verdes, sustentabilidade e segurança, em parceria com o estado de Goiás decidimos doar o 26º Batalhão da Polícia Militar.",
      heroImg: "https://res.cloudinary.com/dxplpg36m/image/upload/v1769993855/WhatsApp_Image_2026-02-01_at_19.24.12_svdhyy.jpg",
      status: "Alto Padrão",
      link: "/src/empreendimentos/cidade-verde.html"
    },
    {
      ano: 2021,
      nome: "Cidade Verde 2ª Etapa",
      descCurta: "Expansão do verde. Devido ao sucesso estrondoso da primeira fase, lançamos a segunda etapa do Cidade Verde, mantendo o compromisso com sustentabilidade e qualidade de vida.",
      heroImg: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
      status: "Alto Padrão",
      link: "/src/empreendimentos/cidade-verde.html"
    },
    {
      ano: 2021,
      nome: "Cidade das Flores",
      descCurta: "O jardim urbano. Lançamento do nosso primeiro condomínio fechado de alto padrão. Segurança, paisagismo e sofisticação em harmonia.",
      heroImg: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80",
      status: "Alto Padrão",
      link: "/src/empreendimentos/cidade-das-flores.html"
    },
    {
      ano: 2023,
      nome: "Singapura Shopping",
      descCurta: "Diversificação estratégica. Lançamos o primeiro shopping center da cidade, expandindo nossa atuação para o setor comercial e de varejo.",
      heroImg: "https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?q=80",
      status: "Comercial",
      link: "/src/empreendimentos/singapura-shopping.html"
    },
    {
      ano: 2024,
      nome: "Cidade Universitária",
      descCurta: "O polo do saber. Um projeto visionário integrando habitação e educação, preparando o terreno para o futuro acadêmico da região.",
      heroImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80",
      status: "Educação",
      link: "/src/empreendimentos/cidade-universitaria.html"
    },
    {
      ano: 2025,
      nome: "Cidade Inteligente",
      descCurta: "Expansão regional. Em Santo Antônio do Descoberto, a Etapa do Lago foi um sucesso absoluto, levando nosso DNA de inovação para novas fronteiras.",
      heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80",
      status: "Expansão",
      link: "/src/empreendimentos/cidade-inteligente.html"
    },
    {
      ano: 2026,
      nome: "Reserva da Mata",
      descCurta: "O ápice da exclusividade. No coração de Caldas Novas, um projeto que une luxo e preservação ambiental. O futuro começa aqui.",
      heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80",
      status: "Futuro",
      link: "/src/empreendimentos/reserva-da-mata.html"
    }
  ]
};