// src/js/animation.js

export function initHomeAnimations() {
  // Verifica dependências
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP não encontrado");
    return;
  }
  // Verifica SplitType (novo)
  if (!window.SplitType) {
    console.warn("SplitType não encontrado. Adicione o CDN no HTML.");
    return;
  }

  const { gsap, ScrollTrigger, SplitType } = window;
  gsap.registerPlugin(ScrollTrigger);

  // LIMPEZA
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");

  // ====================================================
  // 1. ANIMAÇÃO DE TÍTULOS (Com SplitType)
  // ====================================================
  
  // 1. Reverter splits anteriores se houver (útil no resize)
  // Como estamos recriando, vamos garantir que limpamos as classes antigas se necessário
  document.querySelectorAll('.split-animate .char').forEach(char => {
      // O SplitType geralmente tem um método .revert(), mas em SPAs simples
      // as vezes recriar resolve. Vamos instanciar direto.
  });

  // 2. Criar nova instância do SplitType
  // 'types: "chars"' quebra em caracteres. 
  // 'tagName: "span"' é o padrão.
  // Ele preserva a estrutura HTML, então a cor (span.text-serif) continua funcionando!
  const splitTitle = new SplitType('.split-animate', { types: 'chars, words' });

  // 3. Animar os caracteres gerados (.char)
  const chars = document.querySelectorAll('.split-animate .char');
  if (chars.length) {
    gsap.fromTo(chars, 
      { opacity: 0, x: -20, stagger: .1, filter: "blur(20px)" },
        { opacity: 1, x: 0, stagger: .05, duration: 0.6, ease: "power2.out", filter: "blur(0px)", delay: 0.3 }
    );
  }

  // ====================================================
  // 2. LÓGICA UNIFICADA (FUNDO + SEÇÃO + LOGO AUTO)
  // ====================================================
  const sections = document.querySelectorAll(".project-section");
  const bgs = document.querySelectorAll(".bg-item");
  const PIN_DISTANCE = 4500; 

  sections.forEach((section, index) => {
    const bg = bgs[index]; 
    const content = section.querySelector(".project-content");
    const miniNav = section.querySelector(".mini-nav"); // Mini Navbar resgatada
    const logoLayer = section.querySelector(".project-card-media--logo");
    
    if (!bg || !content) return;

    // Grupo de conteúdo (Texto + Nav)
    const contentGroup = [content, miniNav].filter(el => el);

    // ESTADO INICIAL
    gsap.set(bg, { opacity: 0 });
    gsap.set(contentGroup, { autoAlpha: 0, y: 100 });
    if(logoLayer) gsap.set(logoLayer, { autoAlpha: 1 });

    // --- TIMELINE MESTRA ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${PIN_DISTANCE}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        
        // Logo Automática (Tempo Real)
        onEnter: () => {
           if(logoLayer) {
             gsap.to(logoLayer, { 
               autoAlpha: 0, 
               duration: 1, 
               delay: 1.5, 
               ease: "power2.inOut", 
               overwrite: true 
             });
           }
        },
        onLeaveBack: () => {
           if(logoLayer) {
             gsap.to(logoLayer, { autoAlpha: 1, duration: 0.3, overwrite: true });
           }
        }
      }
    });

    // --- SEQUÊNCIA DO SCROLL ---

    // 1. FUNDO ENTRA
    tl.to(bg, { opacity: 1, duration: 1, ease: "none" });

    // 2. SCROLL VAZIO (Apreciação)
    tl.to({}, { duration: 1 });

    // 3. CONTEÚDO ENTRA
    tl.to(contentGroup, { 
      autoAlpha: 1, 
      y: 0, 
      duration: 0.35, 
      ease: "power2.out" 
    });

    // 4. HOLD / LEITURA (Tempo longo)
    tl.to({}, { duration: 4.5 });

    // 5. CONTEÚDO SAI
    tl.to(contentGroup, { 
      autoAlpha: 0, 
      y: -100, 
      duration: 1, 
      ease: "power2.in" 
    });

    // 6. FUNDO SAI
    tl.to(bg, { opacity: 0, duration: 0.5, ease: "none" });

  });

  ScrollTrigger.refresh();
}