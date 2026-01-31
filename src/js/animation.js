// src/js/animation.js

function splitTextToSpans(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (el.dataset.split === "true") return;
    const text = (el.textContent || "").trim();
    if (!text) return;
    el.innerHTML = text.split("").map(char => char === " " ? `<span class="char" style="display:inline-block; width:0.3em;">&nbsp;</span>` : `<span class="char" style="display:inline-block;">${char}</span>`).join("");
    el.dataset.split = "true";
  });
}

export function initHomeAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Limpeza para evitar bugs em reloads
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");

  // 1. Títulos do Hero
  splitTextToSpans(".split-animate");
  document.querySelectorAll(".split-animate").forEach((title) => {
    const chars = title.querySelectorAll(".char");
    if (!chars.length) return;
    gsap.fromTo(chars, { opacity: 0, y: 50, rotateX: -90 }, {
      opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: title, start: "top 85%" }
    });
  });

  // ====================================================
  // 2. LÓGICA UNIFICADA (FUNDO + SEÇÃO + LOGO AUTO)
  // ====================================================
  const sections = document.querySelectorAll(".project-section");
  const bgs = document.querySelectorAll(".bg-item");
  
  // Aumentei para dar bastante tempo de leitura e apreciação
  const PIN_DISTANCE = 4500; 

  sections.forEach((section, index) => {
    const bg = bgs[index]; // O fundo correspondente a esta seção
    const content = section.querySelector(".project-content");
    const logoLayer = section.querySelector(".project-card-media--logo");
    
    // Se faltar algo, pula
    if (!bg || !content) return;

    // ESTADO INICIAL
    // Fundo invisível
    gsap.set(bg, { opacity: 0 });
    // Conteúdo invisível e para baixo
    gsap.set(content, { autoAlpha: 0, y: 100 });
    // Logo visível (cobre a galeria inicialmente)
    if(logoLayer) gsap.set(logoLayer, { autoAlpha: 1 });

    // --- TIMELINE MESTRA (Controlada pelo Scroll) ---
    // Essa timeline cuida do PIN, do FUNDO e da entrada/saída do CONTEÚDO
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",   // Trava no topo
        end: `+=${PIN_DISTANCE}`,
        pin: true,          // Trava a tela
        scrub: 0.5,         // Suaviza o scroll
        invalidateOnRefresh: true,
        
        // --- AQUI ESTÁ A MÁGICA "AUTOMÁTICA" DA LOGO ---
        // Dispara quando a seção entra e trava (Enter)
        onEnter: () => {
           if(logoLayer) {
             // Animação independente do scroll (Tempo Real)
             // Espera 0.5s, fica 3s, e desaparece em 1s
             gsap.to(logoLayer, { 
               autoAlpha: 0, 
               duration: 1, 
               delay: 1.5, 
               ease: "power2.inOut", 
               overwrite: true 
             });
           }
        },
        // Reseta se o usuário voltar para cima (LeaveBack)
        onLeaveBack: () => {
           if(logoLayer) {
             gsap.to(logoLayer, { autoAlpha: 1, duration: 0.3, overwrite: true });
           }
        },
        // Opcional: Resetar se rolar para baixo e voltar (EnterBack)
        onEnterBack: () => {
           // Se quiser que a logo apareça de novo ao voltar, descomente:
           // gsap.to(logoLayer, { autoAlpha: 1, duration: 0.3, overwrite: true });
           // gsap.to(logoLayer, { autoAlpha: 0, duration: 1, delay: 2, overwrite: true });
        }
      }
    });

    // --- SEQUÊNCIA DO SCROLL (0% a 100%) ---

    // 1. FUNDO ENTRA (0% -> 10%)
    // Começa a aparecer assim que trava
    tl.to(bg, { opacity: 1, duration: 1, ease: "none" });

    // 2. SCROLL VAZIO INICIAL (10% -> 30%)
    // Espaço para ver só a imagem de fundo
    tl.to({}, { duration: 1.5 });

    // 3. CONTEÚDO ENTRA (30% -> 40%)
    tl.to(content, { 
      autoAlpha: 1, 
      y: 0, 
      duration:0.35, 
      ease: "power2.out" 
    });

    // 4. HOLD / LEITURA (40% -> 85%)
    // Tempo longo onde o scroll move a barra, mas o conteúdo fica parado.
    // É AQUI que a animação automática da Logo vai acontecer em paralelo!
    tl.to({}, { duration: 4.5 });

    // 5. CONTEÚDO SAI (85% -> 95%)
    // Sai antes do fundo terminar
    tl.to(content, { 
      autoAlpha: 0, 
      y: -100, 
      duration: 1, 
      ease: "power2.in" 
    });

    // 6. FUNDO SAI (95% -> 100%)
    tl.to(bg, { opacity: 0, duration: 0.5, ease: "none" });

  });

  ScrollTrigger.refresh();
}