// src/js/animation.js

function splitTextToSpans(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = text.split('').map(char => {
      if (char === ' ') return `<span class="char" style="display:inline-block; width:0.3em;">&nbsp;</span>`;
      return `<span class="char" style="display:inline-block;">${char}</span>`;
    }).join('');
  });
}

export function initHomeAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Títulos (Entrada Rápida e Suave)
  splitTextToSpans('.split-animate');
  
  document.querySelectorAll('.split-animate').forEach(title => {
    const chars = title.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        y: 100, 
        rotateX: -90 
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.04,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 95%", // Começa assim que entra na tela
          end: "center center", 
          scrub: 1, // Scrub 1 é o equilíbrio perfeito para rolagem automática
        }
      }
    );
  });

  // 2. Backgrounds (Fade Simples e Elegante)
  const sections = document.querySelectorAll('.project-section');
  const bgs = document.querySelectorAll('.bg-item');

  sections.forEach((section, index) => {
    const bg = bgs[index];
    if (!bg) return;
    
    const imgLayer = bg.querySelector('.bg-img-layer');

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // Início da seção
        end: "bottom top",   // Fim da seção
        scrub: true,
      }
    });

    // FASE 1: Fade In Suave
    tl.fromTo(bg, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.15, ease: "power1.inOut" }
    );

    // FASE 2: Zoom lento na imagem (Cinematográfico)
    if (imgLayer) {
      tl.fromTo(imgLayer, 
        { scale: 1.15 }, 
        { scale: 1.0, duration: 0.7, ease: "none" }, 
        "<" 
      );
    }

    // FASE 3: Mantém (Hold)
    // Ocupa espaço na timeline para a imagem ficar parada enquanto rola o texto
    tl.to({}, { duration: 0.2 }); 

    // FASE 4: Fade Out
    tl.to(bg, { opacity: 0, duration: 0.15, ease: "power1.inOut" });
  });

  // 3. Parallax dos Elementos (Texto vs Imagem Pequena)
  sections.forEach(section => {
    const text = section.querySelector('.text-content');
    const img = section.querySelector('.perspective-container');

    // Texto sobe
    gsap.fromTo(text,
      { y: 150 },
      {
        y: -150,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
    
    // Imagem decorativa sobe em outra velocidade (profundidade)
    if (img) {
      gsap.fromTo(img,
        { y: 250 },
        {
          y: -250,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        }
      );
    }
  });

  // Hero Texto Inicial
  gsap.from(".reveal-text", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out"
  });
}