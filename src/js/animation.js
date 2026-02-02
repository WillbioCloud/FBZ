// src/js/animation.js

export function initHomeAnimations() {
  // 1. Verificações de segurança e Dependências
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP ou ScrollTrigger não encontrados no window.");
    return;
  }

  const { gsap, ScrollTrigger, SplitType } = window;
  gsap.registerPlugin(ScrollTrigger);

  // 2. Limpeza (Crucial para quando o Swup troca de página)
  // Mata triggers antigos para não duplicar animações
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");

  // 3. Configuração de Texto (SplitType)
  if (window.SplitType) {
    // Reverte splits anteriores se existirem para evitar quebra de layout
    document.querySelectorAll(".split-animate").forEach(el => {
      if(el.isSplit) el.revert();
    });
    // Cria novos splits
    new SplitType(".split-animate", { types: "lines, words, chars" });
  }

  // ============================================================
  // 4. ANIMAÇÃO DA VITRINE (A CORREÇÃO DO BLUR)
  // ============================================================
  const sections = document.querySelectorAll(".project-section");

  sections.forEach((section, index) => {
    // Seletores dos elementos dentro da seção
    const bgMedia = section.querySelector(".project-bg-media"); // A tag <img> ou <video>
    const logoContainer = section.querySelector(".project-card-media--logo");
    const textContent = section.querySelectorAll(".eyebrow, .split-animate, .lead, .project-actions");
    
    // --- A. ESTADO INICIAL (RESET / SETUP) ---
    // Define como tudo deve estar ANTES de começar a rolar.
    
    // 1. Fundo (Imagem/Video): 
    // CORREÇÃO: Começa VISÍVEL (autoAlpha: 1), mas com BLUR e ZOOM.
    // Assim não fica um fundo preto esperando carregar.
    if (bgMedia) {
      gsap.set(bgMedia, { 
        filter: "blur(15px)", // Começa bem borrado (foco na logo)
        scale: 1.1,           // Leve zoom in
        autoAlpha: 1,         // GARANTE VISIBILIDADE
        transformOrigin: "center center"
      });
    }

    // 2. Logo: Começa visível no centro
    if (logoContainer) {
      gsap.set(logoContainer, { 
        autoAlpha: 1, 
        scale: 1,
        y: 0 
      });
    }

    // 3. Textos: Começam invisíveis e deslocados para baixo
    if (textContent.length > 0) {
      gsap.set(textContent, { 
        autoAlpha: 0, 
        y: 30 
      });
    }


    // --- B. A TIMELINE (A Mágica do Scroll) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Começa quando o topo da seção bate no topo da tela
        end: "+=150%",    // Duração da animação (1.5x a altura da tela)
        pin: true,        // Fixa a seção enquanto anima
        scrub: 1,         // Animação atrelada ao scroll (suave)
        id: `vitrine-section-${index}`
      }
    });

    // PASSO 1: Transição Logo -> Fundo
    if (logoContainer && bgMedia) {
      tl
        // 1a. Logo desaparece (sobe e encolhe)
        .to(logoContainer, { 
          autoAlpha: 0, 
          scale: 0.8, 
          y: -50,
          duration: 2, 
          ease: "power2.inOut" 
        })
        // 1b. SIMULTANEAMENTE ("<"), o fundo perde o blur e foca
        // O "<" garante que não haja buraco preto entre um e outro
        .to(bgMedia, { 
          filter: "blur(0px)", 
          scale: 1, 
          duration: 2, 
          ease: "power2.out" 
        }, "<"); 
    }

    // PASSO 2: O Texto Entra
    // Começa um pouco antes do passo 1 terminar (-=0.5) para ficar fluido
    if (textContent.length > 0) {
      tl.to(textContent, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1, // Um elemento após o outro
        duration: 1.5,
        ease: "back.out(1.2)"
      }, "-=0.5");
    }

    // PASSO 3: Pausa final
    // Mantém a tela estática um pouco para o usuário ler antes de soltar o pin
    tl.to({}, { duration: 1 }); 
  });

  // ============================================================
  // 5. ANIMAÇÃO DO BLOG (Fade Up)
  // ============================================================
  const blogCards = document.querySelectorAll(".reveal-card");
  
  if (blogCards.length > 0) {
    // Estado inicial: invisível e descido
    gsap.set(blogCards, { y: 50, opacity: 0 });

    ScrollTrigger.batch(blogCards, {
      start: "top 85%", // Começa quando o topo do card entra na parte inferior da tela
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power2.out",
        overwrite: true
      })
    });
  }
}