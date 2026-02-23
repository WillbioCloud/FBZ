import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Disclosure, Transition, Menu } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, MapPin, Menu as MenuIcon, X, ChevronDown, CheckCircle, 
  ArrowRight, Instagram, Facebook, Mail, Building, Leaf, ShieldCheck, 
  Zap, Lightbulb, GraduationCap, Home, HardHat, Briefcase, Calendar, User,
  Camera, Wifi, Lock, Map, Search, SlidersHorizontal
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA LAYER (The CMS)
// ==========================================

const PROJECTS = [
  {
    slug: 'cidade-inteligente',
    name: 'Cidade Inteligente',
    status: 'Lançamento',
    slogan: 'O futuro chegou a Caldas Novas.',
    theme: 'cyan', // Visual Identity: Tech/Modern
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    description: 'Um bairro planejado com tecnologia, urbanismo moderno e sustentabilidade.',
    fullDescription: 'A Cidade Inteligente FBZ redefine o conceito de morar bem. Com iluminação LED em todas as vias, monitoramento inteligente e planejamento urbano focado em mobilidade, este é o investimento para quem olha para frente. O bairro conta com infraestrutura preparada para automação e segurança.',
    price: 'Parcelas a partir de R$ 349,00',
    
    // Section: Why Invest? (Bullets)
    whyInvest: [
      { title: 'Tecnologia Embarcada', desc: 'Infraestrutura preparada para automação residencial e urbana.' },
      { title: 'Segurança Inteligente', desc: 'Monitoramento por câmeras nas vias principais e acessos.' },
      { title: 'Economia & Sustentabilidade', desc: 'Iluminação 100% LED e gestão eficiente de recursos.' },
      { title: 'Valorização Acelerada', desc: 'Conceito único na região, garantindo alto potencial de retorno.' }
    ],

    diferenciais: [
      'Iluminação 100% LED',
      'Monitoramento Inteligente',
      'Vias Planejadas',
      'Wi-Fi nas Praças'
    ],
    
    // Detailed Infrastructure Grid
    infraestrutura: [
      { name: 'Asfalto CBUQ', icon: HardHat },
      { name: 'Rede de Água', icon: Leaf },
      { name: 'Energia Elétrica', icon: Zap },
      { name: 'Drenagem Pluvial', icon: Home },
      { name: 'Iluminação LED', icon: Lightbulb },
      { name: 'Câmeras 24h', icon: Camera },
      { name: 'Wi-Fi Zone', icon: Wifi },
      { name: 'Ciclovias', icon: Map }
    ],

    // Location & Mobility
    locationHighlights: [
      '5 min do Centro da cidade',
      'Acesso rápido via Av. Principal',
      'Próximo a escolas e supermercados',
      'Região de expansão urbana'
    ],

    // Gallery Images
    gallery: [
      'https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=2070',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069',
      'https://images.unsplash.com/photo-1518005052357-e9847508d4e4?q=80&w=2162'
    ],

    // Status/Stages
    constructionStatus: {
      percentage: 35,
      stage: 'Terraplanagem e Drenagem',
      details: 'Obras aceleradas. Ruas abertas e demarcação de quadras concluída.'
    },

    // Social Proof
    testimonials: [
      { name: 'Carlos Mendes', role: 'Investidor', text: 'A proposta tecnológica me chamou atenção. É algo inédito em Caldas.' },
      { name: 'Ana Souza', role: 'Compradora', text: 'Comprei pensando no futuro dos meus filhos. A segurança foi decisiva.' }
    ],

    faq: [
      { q: 'O que torna o bairro "inteligente"?', a: 'Infraestrutura preparada para automação, câmeras de monitoramento nas entradas e iluminação pública eficiente em LED.' },
      { q: 'Qual a previsão de entrega?', a: 'Obras aceleradas. Liberação para construção prevista para 24 meses.' },
      { q: 'O financiamento é direto?', a: 'Sim, direto com a FBZ Construtora, sem burocracia bancária e com planos flexíveis.' },
      { q: 'Possui taxa de condomínio?', a: 'Não. É um loteamento aberto com padrão construtivo e tecnológico superior, mas sem taxa mensal.' }
    ],
    whatsappMessage: 'Olá! Gostaria de saber mais sobre a tecnologia e tabela do Cidade Inteligente.',
    seo: {
      title: 'Cidade Inteligente FBZ | Loteamento Tecnológico em Caldas Novas',
      desc: 'Lotes em bairro planejado com tecnologia e segurança. Conheça a Cidade Inteligente da FBZ Construtora. Financiamento próprio.'
    }
  },
  {
    slug: 'cidade-universitaria',
    name: 'Cidade Universitária',
    status: 'Em Obras',
    slogan: 'Invista no polo de conhecimento.',
    theme: 'indigo',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    description: 'Localização estratégica ao lado das principais faculdades.',
    fullDescription: 'O Cidade Universitária foi desenhado para atender a demanda crescente por moradia estudantil e famílias que buscam praticidade. Sua localização ao lado do polo universitário garante valorização constante e alta liquidez para investidores de kitnets e aluguéis.',
    price: 'Condições para Investidores',
    diferenciais: ['Ao lado da Faculdade Integra', 'Alto potencial de locação', 'Transporte na porta', 'Comércio integrado'],
    infraestrutura: [{ name: 'Rede de Esgoto', icon: Home }, { name: 'Asfalto', icon: HardHat }, { name: 'Energia', icon: Zap }],
    faq: [{ q: 'É bom para investir?', a: 'Excelente. A demanda por aluguel estudantil na região é maior que a oferta atual.' }],
    whatsappMessage: 'Olá! Quero investir no Cidade Universitária. Pode me mandar a tabela?',
    seo: { title: 'Cidade Universitária | Lotes perto de faculdade em Caldas Novas', desc: 'Invista em lotes próximos às faculdades.' }
  },
  {
    slug: 'singapura-shopping',
    name: 'Singapura Shopping',
    status: 'Entregue',
    slogan: 'O novo polo comercial de Caldas Novas.',
    theme: 'rose',
    heroImage: 'https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_473664765_17924665778995602_5744156763880720995_n_klwy8p.jpg',
    description: 'Mix estratégico de lojas, conveniência e fluxo diário de visitantes.',
    fullDescription: 'O Singapura Shopping marca a diversificação da FBZ para o segmento comercial. Um ativo consolidado, com arquitetura contemporânea, estacionamento amplo e operação preparada para marcas âncora, serviços e alimentação.',
    price: 'Operação Entregue / Oportunidades de Expansão Comercial',
    whyInvest: [
      { title: 'Fluxo Qualificado', desc: 'Localização com alta circulação de moradores e turistas.' },
      { title: 'Ticket Comercial Forte', desc: 'Ambiente ideal para varejo, serviços e gastronomia.' },
      { title: 'Marca Consolidada', desc: 'Empreendimento entregue com reputação e operação ativa.' },
      { title: 'Ativo Patrimonial', desc: 'Posicionamento premium com potencial de renda recorrente.' }
    ],
    diferenciais: ['Projeto Comercial Premium', 'Mix de Lojas', 'Praça de Alimentação', 'Estacionamento Amplo'],
    infraestrutura: [
      { name: 'Centro Comercial', icon: Building },
      { name: 'Energia Estável', icon: Zap },
      { name: 'Segurança Integrada', icon: ShieldCheck },
      { name: 'Conectividade Wi-Fi', icon: Wifi }
    ],
    locationHighlights: [
      'Região central de Caldas Novas',
      'Acesso facilitado por avenidas principais',
      'Entorno com hotéis e residencial consolidado',
      'Alta visibilidade para marcas'
    ],
    gallery: [
      'https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_473664765_17924665778995602_5744156763880720995_n_klwy8p.jpg',
      'https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_476741791_17928075518995602_5834963185887579820_n_nzxqqw.jpg',
      'https://res.cloudinary.com/dxplpg36m/image/upload/v1769899966/476389691_17927298083995602_4171301912659036465_n_mfogcx.jpg'
    ],
    constructionStatus: {
      percentage: 100,
      stage: 'Empreendimento entregue',
      details: 'Shopping em operação com estrutura concluída e pronta para expansão comercial.'
    },
    testimonials: [
      { name: 'Marina Prado', role: 'Lojista', text: 'O fluxo do Singapura superou nossa projeção inicial já no primeiro trimestre.' },
      { name: 'João Henrique', role: 'Empresário', text: 'A FBZ entregou padrão, localização e segurança operacional para crescer com consistência.' }
    ],
    faq: [
      { q: 'O shopping já está em funcionamento?', a: 'Sim. O Singapura Shopping está entregue e operando normalmente.' },
      { q: 'Existem oportunidades para novos lojistas?', a: 'Sim, há oportunidades comerciais e planos para novos operadores.' },
      { q: 'A FBZ segue responsável pelo ativo?', a: 'A FBZ mantém o compromisso com gestão estratégica e expansão do complexo comercial.' }
    ],
    whatsappMessage: 'Olá! Quero saber mais sobre oportunidades comerciais no Singapura Shopping.',
    seo: {
      title: 'Singapura Shopping | Empreendimento Comercial FBZ em Caldas Novas',
      desc: 'Conheça o Singapura Shopping: ativo comercial entregue, moderno e estratégico em Caldas Novas.'
    }
  },
  {
    slug: 'cidade-das-flores',
    name: 'Cidade das Flores',
    status: 'Últimas Unidades',
    slogan: 'Viver bem é estar cercado de natureza.',
    theme: 'rose',
    heroImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop',
    description: 'Um refúgio de tranquilidade e paisagismo exuberante.',
    fullDescription: 'Mais que um loteamento, um jardim urbano. O Cidade das Flores prioriza o bem-estar visual e mental.',
    price: 'Consulte revenda/remanescentes',
    diferenciais: ['Paisagismo Exclusivo', 'Praças de Convivência', 'Clima Ameno'],
    infraestrutura: [{ name: 'Paisagismo', icon: Leaf }, { name: 'Asfalto', icon: HardHat }],
    faq: [{ q: 'Ainda tem lotes?', a: 'Estamos nas últimas unidades direto da construtora.' }],
    whatsappMessage: 'Olá! Quero conhecer o paisagismo e lotes do Cidade das Flores.',
    seo: { title: 'Cidade das Flores | Loteamento Jardim em Caldas Novas', desc: 'Qualidade de vida e natureza.' }
  },
  {
    slug: 'cidade-verde',
    name: 'Cidade Verde',
    status: 'Pronto para Construir',
    slogan: 'O eixo do desenvolvimento.',
    theme: 'emerald',
    heroImage: 'https://images.unsplash.com/photo-1628744448839-4458d5789f2a?q=80&w=2070&auto=format&fit=crop',
    description: 'Bairro planejado consolidado. O elo de conexão da região sul.',
    fullDescription: 'O Cidade Verde não é apenas um bairro, é um complexo urbanístico. Sendo o elo de conexão entre o Cidade Universitária e o novo Reserva da Mata.',
    price: 'Entrada Facilitada',
    diferenciais: ['Infraestrutura Pronta', 'Comércio Local Ativo', 'Liberado para Construir'],
    infraestrutura: [{ name: 'Asfalto', icon: HardHat }, { name: 'Meio-fio', icon: Home }],
    relatedStages: [
       { name: 'Cidade Universitária', slug: 'cidade-universitaria', desc: 'Foco em educação.' },
       { name: 'Reserva da Mata', slug: 'reserva-da-mata', desc: 'A nova expansão (Lançamento).', isLaunch: true }
    ],
    faq: [{ q: 'Posso construir agora?', a: 'Sim! Comprou, pagou a entrada, construiu.' }],
    whatsappMessage: 'Olá! Quero informações do Cidade Verde e suas etapas.',
    seo: { title: 'Cidade Verde | Lotes Prontos em Caldas Novas', desc: 'Bairro pronto para construir.' }
  },
  {
    slug: 'setor-lago-sul',
    name: 'Setor Lago Sul',
    status: 'Pronto para Construir',
    slogan: 'Exclusividade e sofisticação.',
    theme: 'slate',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-27bfefd544c8?q=80&w=2075&auto=format&fit=crop',
    description: 'Localização nobre, vizinhança selecionada e alto potencial de valorização.',
    fullDescription: 'O Setor Lago Sul foi concebido para oferecer um padrão superior de urbanismo. Com lotes amplos e localização estratégica.',
    price: 'Alto Padrão / Consulte',
    diferenciais: ['Localização Nobre', 'Lotes Amplos', 'Vizinhança Seleta'],
    infraestrutura: [{ name: 'Asfalto Premium', icon: HardHat }, { name: 'Iluminação', icon: Lightbulb }],
    faq: [{ q: 'Qual o tamanho dos lotes?', a: 'A partir de 360m².' }],
    whatsappMessage: 'Olá! Tenho interesse em lotes de alto padrão no Lago Sul.',
    seo: { title: 'Setor Lago Sul | Lotes de Alto Padrão Caldas Novas', desc: 'Exclusividade e localização nobre.' }
  },
  {
    slug: 'reserva-da-mata',
    name: 'Reserva da Mata',
    status: 'LANÇAMENTO',
    isLaunch: true,
    slogan: 'A evolução natural do seu investimento.',
    theme: 'amber',
    heroImage: 'https://images.unsplash.com/photo-1596568205422-77884d8525b6?q=80&w=2070&auto=format&fit=crop',
    description: 'Pré-lançamento exclusivo. A etapa mais aguardada da região.',
    fullDescription: 'O Reserva da Mata une a solidez urbana do Cidade Verde com a exclusividade de viver ao lado da natureza.',
    price: 'Tabela de Pré-Lançamento',
    diferenciais: ['Condições de Lançamento', 'Pista de Caminhada', 'Áreas Verdes Preservadas'],
    infraestrutura: [{ name: 'Pista de Cooper', icon: Leaf }, { name: 'Asfalto', icon: HardHat }],
    faq: [{ q: 'Como garanto o preço de lançamento?', a: 'Faça o pré-cadastro nesta página agora.' }],
    whatsappMessage: 'Estou+no+Singapura+Shopping+e+gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+o+Reserva+da+Mata',
    seo: { title: 'Lançamento Reserva da Mata | Caldas Novas', desc: 'Pré-lançamento de lotes em Caldas Novas.' }
  }
];

const HISTORY_MILESTONES = [
  {
    year: 2007,
    title: 'Fundação da FBZ',
    badge: 'Origem',
    description: 'Em 7 de janeiro, Fabrizio Silva inicia a FBZ com foco em obras residenciais e um compromisso inegociável com qualidade técnica e confiança.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    highlight: 'Primeira casa entregue com assinatura de excelência.'
  },
  {
    year: 2012,
    title: 'Primeiro grande loteamento',
    badge: 'Expansão',
    description: 'Com o Setor Santa Clara, a FBZ dá o salto para o urbanismo em escala, estruturando processos, equipe e governança para crescer com consistência.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200',
    highlight: 'Transição da construção pontual para desenvolvimento urbano.'
  },
  {
    year: 2016,
    title: 'Lago Sul e consolidação de marca',
    badge: 'Autoridade',
    description: 'Empreendimentos com forte apelo de lazer e localização fortaleceram a reputação da FBZ no mercado de Caldas Novas.',
    image: 'https://images.unsplash.com/photo-1600596542815-27bfefd544c8?q=80&w=1200',
    highlight: 'Velocidade de vendas e credibilidade regional em alta.'
  },
  {
    year: 2021,
    title: 'Era dos bairros planejados',
    badge: 'Inovação',
    description: 'Cidade Verde e Cidade das Flores reforçam o compromisso com sustentabilidade, qualidade de vida e urbanismo inteligente.',
    image: 'https://res.cloudinary.com/dxplpg36m/image/upload/v1769993855/WhatsApp_Image_2026-02-01_at_19.24.12_svdhyy.jpg',
    highlight: 'Projetos com infraestrutura completa e visão de longo prazo.'
  },
  {
    year: 2023,
    title: 'Singapura Shopping',
    badge: 'Diversificação',
    description: 'A entrada no segmento comercial amplia o ecossistema da companhia, gerando novas oportunidades para a cidade e para investidores.',
    image: 'https://res.cloudinary.com/dxplpg36m/image/upload/v1769899043/SnapVideo.app_473664765_17924665778995602_5744156763880720995_n_klwy8p.jpg',
    highlight: 'Ativo entregue e operando como polo comercial.'
  },
  {
    year: 2026,
    title: 'Reserva da Mata',
    badge: 'Futuro',
    description: 'O capítulo mais recente une sofisticação, natureza e visão estratégica — símbolo da maturidade da FBZ no desenvolvimento urbano de alto padrão.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200',
    highlight: 'Luxo responsável com potencial de valorização expressivo.'
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Por que investir em lotes em 2024?',
    excerpt: 'Descubra porque terra continua sendo o ativo mais seguro e rentável do mercado.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000',
    date: '12 Maio 2024',
    author: 'Equipe FBZ'
  },
  {
    id: 2,
    title: 'O crescimento de Caldas Novas',
    excerpt: 'Turismo, indústria e educação: os pilares que estão transformando a região.',
    image: 'https://images.unsplash.com/photo-1596568205422-77884d8525b6?q=80&w=1000',
    date: '08 Abril 2024',
    author: 'Diretoria'
  },
  {
    id: 3,
    title: 'Dicas para aprovar seu financiamento',
    excerpt: 'O passo a passo para garantir seu crédito imobiliário sem dor de cabeça.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000',
    date: '25 Março 2024',
    author: 'Financeiro'
  }
];

// ==========================================
// 2. DESIGN SYSTEM & COMPONENTS
// ==========================================

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light focus:ring-primary",
    secondary: "bg-secondary-light text-primary-dark hover:bg-white focus:ring-secondary",
    accent: "bg-accent text-white hover:bg-accent-light focus:ring-accent",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    cyan: "bg-cyan-600 text-white hover:bg-cyan-500 focus:ring-cyan-600",
    indigo: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600",
    rose: "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-600",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-600",
    slate: "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-700",
    amber: "bg-amber-600 text-white hover:bg-amber-500 focus:ring-amber-600",
  };
  
  // Dynamic variant fallback
  const finalVariant = variants[variant as keyof typeof variants] ? variants[variant as keyof typeof variants] : variants['primary'];

  return (
    <button className={`${base} ${finalVariant} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'launch' | 'success' | 'default' }) => {
  const styles = {
    launch: 'bg-red-100 text-red-800 border-red-200 animate-pulse',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${styles[type]}`}>
      {children}
    </span>
  );
};

const Section = ({ children, className = '', dark = false }: any) => (
  <section className={`py-20 ${dark ? 'bg-primary-dark text-white' : 'bg-secondary-light text-gray-900'} ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: any) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// --- 3D & Animation Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 3D Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Parallax Image Component using GSAP
const ParallaxImage = ({ src, alt, className = "", speed = 0.5 }: { src: string, alt: string, className?: string, speed?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;
    
    gsap.fromTo(imgRef.current, 
      { y: 0 },
      {
        y: 100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.35
        }
      }
    );
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img ref={imgRef} src={src} alt={alt} className="w-full h-[120%] object-cover absolute top-[-10%]" />
    </div>
  );
};

// Reveal Text Animation
const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    gsap.fromTo(elRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 85%",
        }
      }
    );
  }, [delay]);

  return <div ref={elRef} className={className}>{children}</div>;
};

// ==========================================
// 3. UTILS & SEO
// ==========================================

const SeoManager = ({ title, description }: { title: string, description: string }) => {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [title, description]);
  return null;
};

// ==========================================
// 4. GLOBAL LAYOUT
// ==========================================

const Layout = ({ children }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollToTop />
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-premium py-3' : 'bg-transparent py-5'}`}>
        <Container>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:bg-primary-light transition-colors">F</div>
              <div className={`font-serif font-bold text-xl flex flex-col leading-none ${scrolled || !isHome ? 'text-gray-900' : 'text-white'}`}>
                <span>FBZ</span>
                <span className="text-xs font-sans font-normal opacity-80">CONSTRUTORA</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Empreendimentos', path: '/empreendimentos' },
                { name: 'Blog', path: '/blog' },
                { name: 'Nossa História', path: '/nossa-historia' },
                { name: 'Trabalhe Conosco', path: '/trabalhe-conosco' },
                { name: 'Contato', path: '/contato' },
              ].map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-sm font-medium hover:text-accent transition-colors ${scrolled || !isHome ? 'text-gray-700' : 'text-white/90'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/empreendimentos/reserva-da-mata">
                <Button variant="accent" className="py-2 px-4 text-sm shadow-none">
                  Lançamento
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Menu as="div" className="relative">
                <Menu.Button className={`p-2 rounded ${scrolled || !isHome ? 'text-gray-900' : 'text-white'}`}>
                  <MenuIcon size={28} />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <Menu.Item>{({ active }) => <Link to="/" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Home</Link>}</Menu.Item>
                      <Menu.Item>{({ active }) => <Link to="/empreendimentos" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Empreendimentos</Link>}</Menu.Item>
                      <Menu.Item>{({ active }) => <Link to="/blog" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Blog</Link>}</Menu.Item>
                      <Menu.Item>{({ active }) => <Link to="/nossa-historia" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Nossa História</Link>}</Menu.Item>
                      <Menu.Item>{({ active }) => <Link to="/trabalhe-conosco" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Trabalhe Conosco</Link>}</Menu.Item>
                      <Menu.Item>{({ active }) => <Link to="/contato" className={`${active ? 'bg-primary text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}>Contato</Link>}</Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Container>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white pt-16 pb-8 border-t border-white/10">
        <Container>
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-serif font-bold text-2xl mb-4">FBZ</div>
              <p className="text-gray-400 text-sm mb-4">
                Construindo sonhos em solo firme. Loteamentos de alto padrão em Caldas Novas, Goiás.
              </p>
              <div className="space-y-2 text-sm">
                <Link to="/nossa-historia" className="text-gray-300 hover:text-white transition-colors block">Nossa História</Link>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors block">Blog FBZ</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Empreendimentos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {PROJECTS.map(p => (
                  <li key={p.slug}>
                    <Link to={`/empreendimentos/${p.slug}`} className="hover:text-white transition-colors">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Phone size={16}/> (64) 3453-0000</li>
                <li className="flex items-center gap-2"><MapPin size={16}/> Caldas Novas - GO</li>
                <li className="flex items-center gap-2"><Mail size={16}/> contato@fbz.com.br</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Social</h4>
              <div className="flex gap-4">
                <Instagram className="cursor-pointer hover:text-accent transition-colors" />
                <Facebook className="cursor-pointer hover:text-accent transition-colors" />
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 pt-8 border-t border-white/5">
            © {new Date().getFullYear()} FBZ Construtora. Todos os direitos reservados.
          </div>
        </Container>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://api.whatsapp.com/send/?phone=556193291812"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-premium hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <Phone size={28} fill="white" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Fale Conosco
        </span>
      </a>
    </div>
  );
};

// ==========================================
// 5. COMPONENTS: FORMS & CARDS
// ==========================================

const LeadForm = ({ projectName, isLaunch, theme = 'primary' }: { projectName: string, isLaunch?: boolean, theme?: string }) => {
  const schema = z.object({
    name: z.string().min(3, "Nome obrigatório"),
    phone: z.string().min(10, "WhatsApp inválido"),
    email: z.string().email("E-mail inválido").optional().or(z.literal('')),
  });
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: any) => {
    // Simulate API submission
    await new Promise(r => setTimeout(r, 1000));
    console.log('Lead:', { ...data, project: projectName, type: isLaunch ? 'launch_list' : 'standard' });
    setSent(true);
    reset();
  };

  if (sent) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 p-6 rounded-lg text-center border border-emerald-200">
      <CheckCircle className="mx-auto text-emerald-600 mb-2" size={32} />
      <h3 className="font-bold text-emerald-800">Recebemos seu contato!</h3>
      <p className="text-emerald-700 text-sm">Em breve um consultor entrará em contato.</p>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Nome Completo</label>
        <input {...register('name')} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="Seu nome" />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">WhatsApp</label>
        <input {...register('phone')} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="(00) 00000-0000" />
        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message as string}</span>}
      </div>
      <Button type="submit" variant={theme} disabled={isSubmitting} className="w-full shadow-lg">
        {isSubmitting ? 'Enviando...' : (isLaunch ? 'Entrar na Lista VIP' : 'Receber Tabela')}
      </Button>
    </form>
  );
};

// ==========================================
// 6. PAGE: HOME
// ==========================================

const HomePage = () => {
  return (
    <div className="bg-stone-50">
      <SeoManager title="FBZ Construtora | Caldas Novas" description="Loteamentos de alto padrão em Caldas Novas." />
      
      {/* Hero with GSAP Parallax */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232" 
            alt="Hero Background" 
            className="w-full h-full"
            speed={0.4}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/50 to-primary-dark/30" />
        </div>
        <Container className="relative z-10 pt-20">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <Badge type="success">Excelência em Urbanismo</Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mt-6 mb-8 leading-tight drop-shadow-lg">
              Construa seu legado <br/> em <span className="text-accent">solo firme</span>.
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed font-light">
              Loteamentos regularizados com infraestrutura completa em Caldas Novas. 
              Segurança jurídica, valorização e qualidade de vida para sua família.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/empreendimentos">
                <Button variant="accent" className="w-full sm:w-auto text-lg px-8">Ver Empreendimentos</Button>
              </Link>
              <Link to="/contato">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 text-white border-white hover:bg-white hover:text-primary">Fale Conosco</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Projects Grid with 3D Tilt */}
      <Section>
        <Container>
          <RevealText className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-4">Nossos Empreendimentos</h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Explore opções que unem valorização financeira e qualidade de vida.</p>
          </RevealText>
          
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <TiltCard key={p.slug} className="h-full">
                <Link to={`/empreendimentos/${p.slug}`} className="block h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-stone-100 group">
                  <div className="h-64 overflow-hidden relative">
                    <img src={p.heroImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <Badge type={p.isLaunch ? 'launch' : 'success'}>{p.status}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{p.description}</p>
                    <span className="text-primary font-bold text-sm flex items-center group-hover:text-accent transition-colors">
                      Saiba mais <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/empreendimentos">
              <Button variant="secondary">Ver Todos os Projetos</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Differentials with Hover Effects */}
      <Section dark className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <Container>
          <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
            {[
              { icon: HardHat, title: 'Infraestrutura Completa', desc: 'Entregamos obras com padrão de qualidade superior e pavimentação CBUQ.' },
              { icon: ShieldCheck, title: '100% Legalizado', desc: 'Escritura garantida e segurança jurídica total em todos os contratos.' },
              { icon: Leaf, title: 'Sustentabilidade', desc: 'Respeito ao meio ambiente, preservação de nascentes e áreas verdes.' }
            ].map((item, i) => (
              <RevealText key={i} delay={i * 0.2} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 duration-300 backdrop-blur-sm">
                <item.icon size={56} className="mx-auto text-accent mb-6 animate-float" style={{ animationDelay: `${i}s` }} />
                <h3 className="text-2xl font-bold font-serif mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </RevealText>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Teaser */}
      <Section>
        <Container>
          <RevealText className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Últimas do Blog</h2>
          </RevealText>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <Link to="/blog" key={post.id} className="group cursor-pointer bg-white rounded-xl p-4 border border-stone-100 shadow-sm hover:shadow-lg transition-all block">
                <div className="rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-xs text-accent font-bold mb-2 uppercase tracking-wide">{post.date}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

// ==========================================
// 7. PAGE: PROJECT TEMPLATE (THE CORE)
// ==========================================

const ProjectTemplate = () => {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);
  const navigate = useNavigate();

  if (!project) return <div className="pt-32 text-center h-screen flex items-center justify-center">Projeto não encontrado</div>;

  const whatsappLink = `https://api.whatsapp.com/send/?phone=556193291812&text=${project.slug === 'reserva-da-mata' ? project.whatsappMessage : encodeURIComponent(project.whatsappMessage)}`;

  // Determine button variant based on project theme
  const themeVariant = project.theme || 'primary';

  return (
    <div className="bg-white">
      <SeoManager title={project.seo.title} description={project.seo.desc} />
      
      {/* Project Hero with Parallax */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        <ParallaxImage 
          src={project.heroImage} 
          alt={project.name} 
          className="absolute inset-0 w-full h-full"
        />
        <div className={`absolute inset-0 bg-gradient-to-t opacity-95 ${
          project.theme === 'cyan' ? 'from-cyan-900 via-cyan-900/60' : 
          project.theme === 'slate' ? 'from-slate-900 via-slate-900/60' :
          'from-gray-900 via-gray-900/60'
        } to-transparent`} />
        
        <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <Badge type={project.isLaunch ? 'launch' : 'success'}>{project.status}</Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mt-6 mb-6 leading-tight drop-shadow-md">
              {project.slogan}
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex gap-4">
              <a href={whatsappLink} target="_blank">
                <Button variant={themeVariant} className="font-bold shadow-xl">
                  <Phone size={18} className="mr-2" /> Falar no WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Floating Form with Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.45 }}
            className="hidden lg:block bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm ml-auto border border-white/20"
          >
            <div className="text-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">
                {project.isLaunch ? 'Faça seu Pré-Cadastro' : 'Receba a Tabela'}
              </h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">{project.price}</p>
            </div>
            <LeadForm projectName={project.name} isLaunch={project.isLaunch} theme={themeVariant} />
          </motion.div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Why Invest / Benefits (Rich Content) */}
            {project.whyInvest && (
              <RevealText>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Por que investir na {project.name}?</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.whyInvest.map((item, i) => (
                    <div key={i} className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white ${
                        project.theme === 'cyan' ? 'bg-cyan-600' : 'bg-primary'
                      }`}>
                        <CheckCircle size={20} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </RevealText>
            )}

            {/* About */}
            <RevealText>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Sobre o Empreendimento</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">{project.fullDescription}</p>
            </RevealText>

            {/* Infrastructure (Standard or Detailed Grid) */}
            <RevealText delay={0.2}>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Infraestrutura</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.infraestrutura.map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-xl hover:shadow-lg transition-all bg-white border border-stone-100 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white ${
                       project.theme === 'cyan' ? 'bg-cyan-100 text-cyan-700' : 
                       project.theme === 'slate' ? 'bg-slate-100 text-slate-700' :
                       'bg-primary/10 text-primary'
                    }`}>
                      {item.icon ? <item.icon size={24} /> : <HardHat size={24} />}
                    </div>
                    <span className="font-medium text-gray-700">{typeof item === 'string' ? item : item.name}</span>
                  </div>
                ))}
              </div>
            </RevealText>

            {/* Construction Status (Rich Content) */}
            {project.constructionStatus && (
               <RevealText>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Status da Obra</h3>
                  <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                       <span className="font-bold text-gray-900">{project.constructionStatus.stage}</span>
                       <span className={`font-bold text-xl ${project.theme === 'cyan' ? 'text-cyan-600' : 'text-primary'}`}>
                         {project.constructionStatus.percentage}%
                       </span>
                    </div>
                    <div className="h-3 bg-stone-100 rounded-full overflow-hidden mb-4">
                       <motion.div 
                          initial={{ width: 0 }} 
                          whileInView={{ width: `${project.constructionStatus.percentage}%` }}
                          transition={{ duration: 0.7, ease: "circOut" }}
                          className={`h-full rounded-full ${project.theme === 'cyan' ? 'bg-cyan-500' : 'bg-primary'}`} 
                       />
                    </div>
                    <p className="text-sm text-gray-500">{project.constructionStatus.details}</p>
                  </div>
               </RevealText>
            )}
            
            {/* Gallery (Rich Content) */}
            {project.gallery && (
              <RevealText>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Galeria</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className={`rounded-lg overflow-hidden ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Galeria" />
                    </div>
                  ))}
                </div>
              </RevealText>
            )}

            {/* Location Highlights (Rich Content) */}
            {project.locationHighlights && (
              <RevealText>
                 <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Localização Privilegiada</h3>
                 <div className="bg-stone-100 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                       <MapPin className={`mt-1 ${project.theme === 'cyan' ? 'text-cyan-600' : 'text-primary'}`} size={32} />
                       <div>
                          <p className="font-medium text-gray-900">Região de alto crescimento urbano</p>
                          <p className="text-sm text-gray-500">Próximo aos principais eixos de desenvolvimento.</p>
                       </div>
                    </div>
                    <ul className="space-y-3">
                       {project.locationHighlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                             <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                             {highlight}
                          </li>
                       ))}
                    </ul>
                 </div>
              </RevealText>
            )}

            {/* Testimonials (Rich Content) */}
            {project.testimonials && (
              <RevealText>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">O que dizem nossos clientes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                   {project.testimonials.map((t, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                         <div className="flex gap-1 mb-3 text-amber-400">
                            {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                         </div>
                         <p className="text-gray-600 mb-4 italic">"{t.text}"</p>
                         <div>
                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                            <p className="text-xs text-gray-400">{t.role}</p>
                         </div>
                      </div>
                   ))}
                </div>
              </RevealText>
            )}

            {/* Specific Logic for Cidade Verde (Related Stages) */}
            {project.relatedStages && (
              <div className="bg-stone-100 rounded-2xl p-8 border border-stone-200">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Etapas do Complexo</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.relatedStages.map((stage: any) => (
                    <Link to={`/empreendimentos/${stage.slug}`} key={stage.slug} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all block group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{stage.name}</h4>
                        {stage.isLaunch && <Badge type="launch">Lançamento</Badge>}
                      </div>
                      <p className="text-sm text-gray-500">{stage.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <RevealText delay={0.3}>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Perguntas Frequentes</h3>
              <div className="space-y-4">
                {project.faq.map((item, i) => (
                  <Disclosure key={i}>
                    {({ open }) => (
                      <div className="border border-stone-200 rounded-lg overflow-hidden transition-all duration-300">
                        <Disclosure.Button className={`flex w-full justify-between px-6 py-4 text-left font-medium text-gray-900 hover:bg-stone-100 transition-colors ${open ? 'bg-stone-50' : 'bg-white'}`}>
                          <span>{item.q}</span>
                          <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-6 py-4 text-gray-600 bg-white border-t border-stone-100">
                            {item.a}
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
              {/* Schema JSON-LD */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "RealEstateListing",
                  "name": project.name,
                  "description": project.description,
                  "url": window.location.href
                })}
              </script>
            </RevealText>
          </div>

          {/* Sidebar Sticky */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-premium border border-stone-100 lg:hidden">
                 {/* Mobile Form Duplicate */}
                 <h3 className="font-bold text-xl mb-4 text-center">Tenho Interesse</h3>
                 <LeadForm projectName={project.name} isLaunch={project.isLaunch} theme={themeVariant} />
              </div>
              
              <div className={`text-white p-8 rounded-2xl text-center shadow-lg relative overflow-hidden ${
                 project.theme === 'cyan' ? 'bg-cyan-900' : 
                 project.theme === 'slate' ? 'bg-slate-800' :
                 'bg-primary'
              }`}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Phone size={100} />
                </div>
                <h4 className="font-bold text-xl mb-2 relative z-10">Plantão de Vendas</h4>
                <p className="opacity-90 mb-6 relative z-10">Fale agora com um especialista.</p>
                <a href={whatsappLink} target="_blank" className="relative z-10 block">
                  <Button variant={themeVariant === 'primary' ? 'accent' : 'primary'} className="w-full font-bold">
                    Chamar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

// ==========================================
// 8. OTHER PAGES (List, Contact, Blog, Careers)
// ==========================================

const ProjectsList = () => (
  <div className="bg-stone-50 min-h-screen pt-20">
    <SeoManager title="Empreendimentos | FBZ" description="Lista completa de loteamentos." />
    <Container className="py-20">
      <RevealText className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-primary-dark mb-4">Nossos Empreendimentos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Portfólio completo de oportunidades em Caldas Novas. Do econômico ao alto padrão.</p>
      </RevealText>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.slug}>
            <Link to={`/empreendimentos/${p.slug}`} className="block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-stone-100 group h-full">
              <div className="h-64 overflow-hidden relative">
                <img src={p.heroImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge type={p.isLaunch ? 'launch' : 'success'}>{p.status}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                <Button variant="outline" className="w-full text-sm">Ver Detalhes</Button>
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>
    </Container>
  </div>
);

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Investimento', 'Mercado', 'Financiamento'];

  const categorizedPosts = BLOG_POSTS.map((post, index) => ({
    ...post,
    category: index === 0 ? 'Investimento' : index === 1 ? 'Mercado' : 'Financiamento',
    readTime: `${4 + index} min de leitura`
  }));

  const featuredPost = categorizedPosts[0];
  const filteredPosts = categorizedPosts.filter((post) => {
    const byCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const bySearch = `${post.title} ${post.excerpt}`.toLowerCase().includes(searchTerm.toLowerCase());
    return byCategory && bySearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen pt-20">
      <SeoManager title="Blog FBZ | Notícias e Dicas" description="Fique por dentro do mercado imobiliário." />

      <section className="bg-primary-dark text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#d4a017,_transparent_40%)]" />
        <Container className="relative z-10">
          <RevealText>
            <p className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4">Editorial FBZ</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Insights para investir com segurança</h1>
            <p className="text-gray-300 max-w-3xl">Conteúdos curados sobre valorização imobiliária, tendências urbanas e decisões inteligentes para proteger e multiplicar patrimônio.</p>
          </RevealText>
        </Container>
      </section>

      <Container className="py-14">
        <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-stone-100 shadow-premium overflow-hidden mb-12">
          <div className="h-72 lg:h-full overflow-hidden">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 lg:p-10 flex flex-col">
            <Badge type="success">Hero Post</Badge>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-4 mb-3">{featuredPost.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-gray-500 font-semibold mb-8">
              <span>{featuredPost.date}</span><span>•</span><span>{featuredPost.author}</span><span>•</span><span>{featuredPost.readTime}</span>
            </div>
            <Button variant="primary" className="w-fit">Ler matéria em destaque</Button>
          </div>
        </motion.article>

        <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por título ou assunto" className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/30 outline-none" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal size={18} className="text-gray-500 mr-1" />
              {categories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-primary text-white' : 'bg-stone-100 text-gray-700 hover:bg-stone-200'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.article key={`${post.id}-${post.category}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full border border-stone-100">
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.16em] text-accent font-bold mb-3">{post.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
};

const HistoryPage = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-20">
      <SeoManager title="Nossa História | FBZ Construtora" description="Conheça os marcos da trajetória da FBZ, da fundação ao Reserva da Mata." />

      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,160,23,0.18),_transparent_55%)]" />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Badge type="success">Nossa História</Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mt-6 mb-5">Uma trajetória construída com visão, entrega e confiança</h1>
            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">Da primeira casa construída em 2007 à sofisticação do Reserva da Mata, cada etapa da FBZ reforça nossa autoridade em urbanismo, segurança jurídica e valorização imobiliária sustentável.</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-2 md:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-primary to-transparent" />
          <div className="space-y-10">
            {HISTORY_MILESTONES.map((milestone, index) => (
              <motion.article
                key={milestone.year + milestone.title}
                ref={(el) => {
                  if (!el) return;
                  gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 28, scale: 0.98 },
                    {
                      autoAlpha: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.45,
                      ease: 'power2.out',
                      scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                      },
                    }
                  );
                }}
                className="relative grid lg:grid-cols-[180px_1fr] gap-6 bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="absolute -left-[2px] top-10 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                <div className="p-6 lg:p-8 bg-stone-100/70">
                  <p className="text-4xl font-serif font-bold text-primary-dark">{milestone.year}</p>
                  <span className="inline-flex mt-2 text-xs uppercase tracking-wider font-bold text-accent">{milestone.badge}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-56 md:h-full overflow-hidden">
                    <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                    <p className="text-sm font-semibold text-primary">{milestone.highlight}</p>
                    {index === HISTORY_MILESTONES.length - 1 && (
                      <div className="mt-6">
                        <Link to="/empreendimentos/reserva-da-mata">
                          <Button variant="accent">Conhecer o Reserva da Mata</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

const CareersPage = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-20">
      <SeoManager title="Trabalhe Conosco | FBZ" description="Faça parte da nossa equipe." />
      
      <div className="bg-primary-dark text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Construa sua carreira conosco</h1>
            <p className="text-xl text-gray-300 mb-8">
              Buscamos talentos que compartilhem nossa paixão por transformar paisagens e realizar sonhos.
            </p>
            <Button variant="accent">Ver Vagas Abertas</Button>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">Por que trabalhar na FBZ?</h2>
            <div className="space-y-6">
              {[
                { title: "Cultura de Crescimento", desc: "Investimos no desenvolvimento contínuo dos nossos colaboradores." },
                { title: "Ambiente Inovador", desc: "Utilizamos as melhores tecnologias e práticas do mercado." },
                { title: "Impacto Real", desc: "Participe de projetos que transformam a vida de milhares de pessoas." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold font-serif text-gray-900 mt-12 mb-6">Vagas Disponíveis</h2>
            <div className="space-y-4">
              {[
                { role: "Corretor de Imóveis", type: "Autônomo", loc: "Caldas Novas" },
                { role: "Analista de Marketing", type: "Presencial", loc: "Caldas Novas" },
                { role: "Engenheiro Civil", type: "Presencial", loc: "Caldas Novas" },
              ].map((vaga, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex justify-between items-center group hover:border-primary transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{vaga.role}</h4>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Briefcase size={12}/> {vaga.type}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {vaga.loc}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="text-xs py-2 px-4 h-auto">Aplicar</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 h-fit sticky top-28">
            <h3 className="text-2xl font-bold font-serif mb-2">Envie seu Currículo</h3>
            <p className="text-gray-500 text-sm mb-6">Faça parte do nosso banco de talentos.</p>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                <input className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">E-mail</label>
                <input type="email" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">LinkedIn (Opcional)</label>
                <input className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Área de Interesse</label>
                <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                  <option>Vendas / Comercial</option>
                  <option>Engenharia / Obras</option>
                  <option>Administrativo</option>
                  <option>Marketing</option>
                </select>
              </div>
              <Button className="w-full">Enviar Candidatura</Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

const ContactPage = () => (
  <div className="bg-stone-50 min-h-screen pt-20">
    <SeoManager title="Contato | FBZ" description="Fale conosco." />
    <Container className="py-20">
      <RevealText>
        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-premium overflow-hidden">
          <div className="p-10 bg-primary-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Fale Conosco</h2>
            <p className="text-gray-300 mb-10 relative z-10">Estamos prontos para atender você e realizar seu sonho. Visite nosso escritório ou envie uma mensagem.</p>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold">Endereço</h4>
                  <p className="text-gray-400 text-sm">Av. Central, 1200 - Centro<br/>Caldas Novas - GO</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold">Telefone</h4>
                  <p className="text-gray-400 text-sm">(64) 3453-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold">E-mail</h4>
                  <p className="text-gray-400 text-sm">contato@fbz.com.br</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h5 className="font-bold text-sm mb-4">Horário de Atendimento</h5>
              <div className="text-xs text-gray-400 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-white">Segunda a Sexta</span>
                  08:00 - 18:00
                </div>
                <div>
                  <span className="block text-white">Sábado</span>
                  08:00 - 12:00
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-10">
            <h3 className="text-2xl font-bold font-serif mb-6 text-gray-900">Envie uma mensagem</h3>
            <LeadForm projectName="Página de Contato" />
          </div>
        </div>
      </RevealText>
    </Container>
  </div>
);

// ==========================================
// 9. APP ENTRY POINT
// ==========================================

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/empreendimentos" element={<ProjectsList />} />
          <Route path="/empreendimentos/:slug" element={<ProjectTemplate />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/nossa-historia" element={<HistoryPage />} />
          <Route path="/trabalhe-conosco" element={<CareersPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="*" element={<div className="pt-32 text-center h-screen flex items-center justify-center text-xl font-serif text-gray-500">Página não encontrada</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
