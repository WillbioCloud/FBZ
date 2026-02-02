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
  // 0. LIMPEZA (Agressiva mas necessária para SPA)
  // ====================================================
  // Isso matava a animação do blog antes. Agora vamos recriá-la abaixo.
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");

  // ====================================================
  // 1. SETUP DE TEXTO (SplitType)
  // ====================================================
  if (SplitType?.revert) {
    SplitType.revert(".split-animate");
  }
  new SplitType(".split-animate", { types: "chars, words" });

  // ====================================================
  // 2. HERO: ANIMAÇÃO IMEDIATA
  // ====================================================
  const heroTitle = document.querySelector(".hero-title.split-animate");
  if (heroTitle) {
    const heroChars = heroTitle.querySelectorAll(".char");
    gsap.fromTo(heroChars, 
      { opacity: 0, x: -20, filter: "blur(10px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.08, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }

  // ====================================================
  // 3. OUTROS TÍTULOS (Scroll)
  // ====================================================
  const allOtherTitles = gsap.utils.toArray(".split-animate:not(.hero-title)");
  const nonPinnedTitles = allOtherTitles.filter((el) => !el.closest(".project-section"));

  nonPinnedTitles.forEach((title) => {
    const chars = title.querySelectorAll(".char");
    if (!chars.length) return;

    gsap.fromTo(chars, 
      { opacity: 0, x: -20, filter: "blur(10px)" },
      {
        opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // ====================================================
  // 4. EMPREENDIMENTOS (Pin + Scroll)
  // ====================================================
  const sections = document.querySelectorAll(".project-section");
  
  const bgs = document.querySelectorAll(".bg-item");
  const PIN_DISTANCE = 4500;
  const GAP_BETWEEN_SECTIONS = 1500;

  sections.forEach((section, index) => {
    const bg = bgs[index];
    const content = section.querySelector(".project-content");
    const miniNav = section.querySelector(".mini-nav");
    const logoLayer = section.querySelector(".project-card-media--logo");
    
    // Título dentro da seção (se houver)
    const sectionTitle = section.querySelector(".split-animate"); 
    const titleChars = sectionTitle ? sectionTitle.querySelectorAll(".char") : null;

    if (!bg || !content) return;

    const contentGroup = [content, miniNav].filter(Boolean);

    // Estado Inicial
    gsap.set(bg, { opacity: 0 });
    gsap.set(contentGroup, { autoAlpha: 0, y: 100 });
    if (titleChars && titleChars.length) {
      gsap.set(titleChars, { opacity: 0, x: -20, filter: "blur(10px)" });
    }
    if (logoLayer) gsap.set(logoLayer, { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${PIN_DISTANCE + GAP_BETWEEN_SECTIONS}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        // Lógica da Logo
        onEnter: () => logoLayer && gsap.to(logoLayer, { autoAlpha: 0, duration: 1, delay: 1.5, overwrite: true }),
        onLeaveBack: () => logoLayer && gsap.to(logoLayer, { autoAlpha: 1, duration: 0.5, overwrite: true })
      }
    });

    // Timeline steps
    tl.to(bg, { opacity: 1, duration: 0.7, ease: "none" })
      .to({}, { duration: 0.5 }) // Wait
      .to(contentGroup, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });

    // Se tiver título dentro da seção, anima ele na timeline
    if (titleChars && titleChars.length) {
      tl.to(titleChars, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.06 }, "<0.1");
    }

    tl.to({}, { duration: 1.5 }) // Hold de leitura
      .to(contentGroup, { autoAlpha: 0, y: -100, duration: 0.3, ease: "power2.in" });
      
    if (titleChars && titleChars.length) {
      tl.to(titleChars, { opacity: 0, x: -10, duration: 0.3 }, "<");
    }

    tl.to(bg, { opacity: 0, duration: 0.5, ease: "none" })
      .to({}, { duration: GAP_BETWEEN_SECTIONS / 1000 }); // Gap final
  });

  // ====================================================
  // 5. BLOG CARDS (A CORREÇÃO!)
  // ====================================================
  // Movemos a animação para cá para que ela não seja "morta" pela limpeza do início
  const blogCards = document.querySelectorAll(".reveal-card");
  const blogGrid = document.querySelector("#homeBlogGrid");

  if (blogCards.length > 0 && blogGrid) {
    // 1. Define estado inicial invisível (garante que não pisque)
    gsap.set(blogCards, { y: 60, opacity: 0, filter: "blur(5px)" });

    // 2. Anima a entrada (Batch ou Stagger simples)
    ScrollTrigger.batch(blogCards, {
      start: "top 85%", // Começa quando o topo do card chega em 85% da tela
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true
      }),
      // Opcional: Se quiser que eles sumam ao subir a tela, descomente abaixo:
      onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 60, overwrite: true }) 
    });
  }

  // Refresh final para garantir que o ScrollTrigger recalculou as posições
  ScrollTrigger.refresh();
}