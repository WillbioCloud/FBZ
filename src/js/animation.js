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

  // 1. Títulos (Split Text)
  splitTextToSpans('.split-animate');
  
  document.querySelectorAll('.split-animate').forEach(title => {
    const chars = title.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        y: 80, 
        rotateX: -90 
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03, // Stagger mais rápido para responder melhor ao scroll rápido
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "top 40%",
          scrub: 0.5, // Menor valor = mais responsivo ao scroll automático
        }
      }
    );
  });

  // 2. Backgrounds e Cor Sólida
  const sections = document.querySelectorAll('.project-section');
  const bgs = document.querySelectorAll('.bg-item');

  sections.forEach((section, index) => {
    const bg = bgs[index];
    if (!bg) return;
    
    const solidLayer = bg.querySelector('.solid-overlay');

    // Timeline Mestra da Seção
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // Começa antes de entrar
        end: "bottom top",   // Termina quando sair totalmente
        scrub: true,
      }
    });

    // Passo 1: Fade In do container (fundo preto ou imagem anterior)
    tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "none" });

    // Passo 2: Animação da Cor Sólida (Expandir e Revelar Imagem)
    // A cor sólida começa visível (cobrindo a imagem). 
    // No meio do scroll, ela cresce (scale) e some (opacity), revelando a foto.
    if (solidLayer) {
      tl.fromTo(solidLayer, 
        { opacity: 1, scale: 1 }, 
        { 
          opacity: 0, 
          scale: 1.5, // Efeito de "explosão" suave
          duration: 0.4, 
          ease: "power1.inOut" 
        }, 
        "<" // Começa junto com o fade in anterior ou logo após
      );
    }

    // Passo 3: Hold (Mantém a imagem visível enquanto lê o texto)
    tl.to(bg, { opacity: 1, duration: 0.3 }); // Espaço "vazio" na timeline para segurar

    // Passo 4: Fade Out na saída
    tl.to(bg, { opacity: 0, duration: 0.15, ease: "none" });
  });

  // 3. Parallax Texto/Elementos
  sections.forEach(section => {
    const text = section.querySelector('.text-content');
    const img = section.querySelector('.perspective-container');

    // Texto sobe suavemente
    gsap.fromTo(text,
      { y: 100 },
      {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
    
    // Imagem decorativa com parallax reverso
    if (img) {
      gsap.fromTo(img,
        { y: 150 },
        {
          y: -150,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );
    }
  });

  // Animação Hero (Texto Principal da Home)
  gsap.from(".reveal-text", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out"
  });
}