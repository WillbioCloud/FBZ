// src/js/animation.js

export function initHomeAnimations() {
  // Verifica dependências
  if (!window.gsap || !window.ScrollTrigger || !window.SplitType) {
    console.warn("GSAP, ScrollTrigger ou SplitType não encontrados.");
    return;
  }

  const { gsap, ScrollTrigger, SplitType } = window;
  gsap.registerPlugin(ScrollTrigger);

  // ====================================================
  // 0. LIMPEZA (segura)
  // ====================================================
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Evita matar tweens do site inteiro (killTweensOf("*") é agressivo)
  gsap.killTweensOf(".split-animate .char");
  gsap.killTweensOf(
    ".project-section, .bg-item, .project-content, .mini-nav, .project-card-media--logo"
  );

  // ====================================================
  // 1. SETUP DE TEXTO (SplitType)
  // ====================================================
  // Reverte splits anteriores (evita duplicação de spans .char)
  if (SplitType?.revert) {
    SplitType.revert(".split-animate");
  }

  // Cria as letras para TODOS os elementos
  new SplitType(".split-animate", { types: "chars, words" });

  // ====================================================
  // 2. HERO: ANIMAÇÃO IMEDIATA (Sem ScrollTrigger)
  // ====================================================
  const heroTitle = document.querySelector(".hero-title.split-animate");

  if (heroTitle) {
    const heroChars = heroTitle.querySelectorAll(".char");

    gsap.from(heroChars, {
      opacity: 0,
      x: -20,
      filter: "blur(20px)",
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
      immediateRender: false
    });
  }

  // ====================================================
  // 3. TÍTULOS FORA DO PIN: from(chars) + ScrollTrigger
  //    (ex.: "Últimas novidades")
  // ====================================================
  // Seleciona todos, exceto hero
  const allOtherTitles = gsap.utils.toArray(".split-animate:not(.hero-title)");

  // Filtra: só os que NÃO estão dentro de uma .project-section (pin)
  const nonPinnedTitles = allOtherTitles.filter((el) => !el.closest(".project-section"));

  nonPinnedTitles.forEach((title) => {
    const chars = title.querySelectorAll(".char");
    if (!chars.length) return;

    gsap.from(chars, {
      opacity: 0,
      x: -20,
      filter: "blur(10px)",
      stagger: 0.08,
      duration: 0.9,
      delay: 0.1,
      ease: "power3.out",
      immediateRender: false,
      overwrite: "auto",

      scrollTrigger: {
        trigger: title,
        // Ajuste aqui pra “abaixar” o start: 70–90% costuma ficar ótimo
        start: "top 85%",
        end: "bottom 55%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true
        // markers: true
      }
    });
  });

  // ====================================================
  // 4. EMPREENDIMENTOS (Pin + Gap + Título dentro da TL)
  // ====================================================
  const sections = document.querySelectorAll(".project-section");
  const bgs = document.querySelectorAll(".bg-item");

  // Scroll “útil” da seção + respiro ENTRE seções
  const PIN_DISTANCE = 4500;
  const GAP_BETWEEN_SECTIONS = 1500; // <<< aumenta/diminui pra separar o fim/início

  // Controle fino do “timing” dentro do pin (se quiser)
  const PRE_CONTENT_SCROLL = 0.5; // tempo antes do conteúdo entrar (dentro do pin)
  const READ_SCROLL = 1.0;        // tempo de leitura
  const EXIT_SCROLL = 0.3;        // tempo de saída

  sections.forEach((section, index) => {
    const bg = bgs[index];
    const content = section.querySelector(".project-content");
    const miniNav = section.querySelector(".mini-nav");
    const logoLayer = section.querySelector(".project-card-media--logo");

    // Título dentro do card/seção (ajuste o seletor se seu HTML usar outro)
    const sectionTitle = section.querySelector(".split-animate"); // pega o primeiro título da seção
    const titleChars = sectionTitle ? sectionTitle.querySelectorAll(".char") : null;

    if (!bg || !content) return;

    const contentGroup = [content, miniNav].filter(Boolean);

    // ESTADO INICIAL
    gsap.set(bg, { opacity: 0 });
    gsap.set(contentGroup, { autoAlpha: 0, y: 100 });

    // Se o título está dentro da seção pinada, já deixa invisível aqui
    if (titleChars && titleChars.length) {
      gsap.set(titleChars, { opacity: 0, x: -20, filter: "blur(10px)" });
    }

    if (logoLayer) gsap.set(logoLayer, { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",

        // GAP real entre o fim de uma seção e o começo da próxima
        end: `+=${PIN_DISTANCE + GAP_BETWEEN_SECTIONS}`,

        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        markers: true,

        onEnter: () => {
          if (logoLayer) {
            gsap.to(logoLayer, {
              autoAlpha: 0,
              duration: 1,
              delay: 1.5,
              ease: "power2.inOut",
              overwrite: true,
              immediateRender: false
            });
          }
        },

        onLeaveBack: () => {
          if (logoLayer) {
            gsap.to(logoLayer, {
              autoAlpha: 1,
              duration: 0.5,
              overwrite: true,
              immediateRender: false
            });
          }
        }
      }
    });

    // 1) FUNDO ENTRA
    tl.to(bg, { opacity: 1, duration: 0.7, ease: "none" });

    // 2) “Scroll vazio” antes do conteúdo aparecer (pra você não chegar “atrasado”)
    tl.to({}, { duration: PRE_CONTENT_SCROLL });

    // 3) CONTEÚDO ENTRA
    tl.to(contentGroup, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // 4) TÍTULO ENTRA (dentro da mesma TL do pin, então nunca “passa do ponto”)
    if (titleChars && titleChars.length) {
      tl.to(
        titleChars,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06
        },
        "<0.05" // quase junto do content entrar
      );
    }

    // 5) HOLD / LEITURA
    tl.to({}, { duration: READ_SCROLL });

    // 6) CONTEÚDO SAI
    tl.to(contentGroup, {
      autoAlpha: 0,
      y: -100,
      duration: EXIT_SCROLL,
      ease: "power2.in"
    });

    // (Opcional) título some junto
    if (titleChars && titleChars.length) {
      tl.to(
        titleChars,
        {
          opacity: 0,
          x: -10,
          filter: "blur(8px)",
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.02
        },
        "<"
      );
    }

    // 7) FUNDO SAI
    tl.to(bg, { opacity: 0, duration: 0.5, ease: "none" });

    // 8) GAP entre seções (respiro visual real)
    // Isso garante que o “gap” exista no scroll e não “estique” os pontos anteriores
    tl.to({}, { duration: GAP_BETWEEN_SECTIONS / 1000 });
  });

  // ====================================================
  // 5. REFRESH FINAL
  // ====================================================
  requestAnimationFrame(() => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 150);
}
