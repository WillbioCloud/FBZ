// src/js/animation-timeline.js

export function initTimelineAnimations() {
  const { gsap, ScrollTrigger, MotionPathPlugin, CustomEase, DrawSVGPlugin } = window;

  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  try {
    if (MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
    if (CustomEase) gsap.registerPlugin(CustomEase);
    if (DrawSVGPlugin) gsap.registerPlugin(DrawSVGPlugin);
  } catch(e){}

  ScrollTrigger.getAll().forEach(t => t.kill());

  // 1. HERO TITLE (Atualizado com SplitType)
  const heroTitle = document.querySelector(".hero-title-big");
  
  if (heroTitle && window.SplitType) {
    // A. Quebra o texto em caracteres
    const split = new window.SplitType(heroTitle, { types: 'chars' });

    // B. Animação de Entrada (Loading)
    // As letras vêm de baixo, girando levemente
    gsap.from(split.chars, {
      x: -20,          // Vêm de baixo
      opacity: 0,      // Invisíveis
      filter: "blur(20px)", // Borradas
      stagger: .1,   // Efeito cascata entre letras
    });

    // C. Animação de Saída (Scroll - O efeito de encolher)
    // Continua sendo aplicado ao container do título
    gsap.to(heroTitle, {
      scale: 0.5,      // Encolhe
      opacity: 0,      // Desaparece
      y: 100,          // Desce um pouco acompanhando o scroll
      ease: "power2.inOut",
      scrollTrigger: { 
        trigger: ".page-hero", 
        start: "top top", 
        end: "bottom 50%", 
        scrub: 1 
      }
    });
  }

  // ============================================================
  // LÓGICA DA TIMELINE
  // ============================================================
  const section = document.querySelector(".horizontal-section");
  const wrapper = document.querySelector(".horizontal-wrapper");
  const svgLayer = document.querySelector(".svg-layer");
  const dotsLayer = document.querySelector(".dots-layer");
  const pathGray = document.querySelector("#zigzag-path");
  const pathGreen = document.querySelector("#zigzag-tracer");
  const headDot = document.querySelector(".head-dot");
  const cards = document.querySelectorAll(".h-card");
  const nav = document.querySelector(".nav"); 
  
  // Marcadores
  const futureMarker = document.querySelector(".future-marker");
  const startMarker = document.querySelector(".start-marker"); 

  // Variável de controle da Nav
  let isTimelineActive = false;

  if (section && wrapper && pathGreen && cards.length > 0) {
    
    // --- 1. GEOMETRIA & ESPAÇAMENTO ---
    const cardWidth = 450;
    const gap = 1200; // AUMENTADO: Mais espaço entre tudo
    const segment = cardWidth + gap;
    
    // START PADDING GIGANTE: Garante que o inicio (2007) fique isolado
    const startPadding = window.innerWidth; 
    const endPadding = window.innerWidth / 1.5; 
    
    const contentWidth = (cards.length * segment);
    const totalWidth = startPadding + contentWidth + endPadding; 
    
    const amplitude = 280; 
    const centerY = window.innerHeight / 2;

    wrapper.style.width = `${totalWidth}px`;
    svgLayer.style.width = `${totalWidth}px`;
    svgLayer.setAttribute("viewBox", `0 0 ${totalWidth} ${window.innerHeight}`);
    if(dotsLayer) dotsLayer.style.width = `${totalWidth}px`;
    if(dotsLayer) dotsLayer.innerHTML = '';

    // --- 2. DESENHO DA CURVA ---
    // StartX recuado: O ponto 2007 fica UM SEGMENTO antes do primeiro card
    const startX = startPadding - gap; 
    
    // Começa a linha lá no startX
    let d = `M ${startX},${centerY} `; 

    // Posiciona Marcador 2007 (Agora bem longe do card 1)
    if(startMarker) {
      gsap.set(startMarker, {
        left: startX, top: centerY, xPercent: -50, yPercent: -50, scale: 0, opacity: 0
      });
      if(dotsLayer) {
        const dot = document.createElement("div");
        dot.className = "track-dot start-ref";
        dot.style.left = `${startX}px`; dot.style.top = `${centerY}px`;
        dotsLayer.appendChild(dot);
      }
    }

    const stops = []; 
    let lastX = startX;
    let lastY = centerY;

    cards.forEach((card, i) => {
      const cx = startPadding + (i * segment);
      const isUp = i % 2 === 0;
      const cy = isUp ? centerY - amplitude : centerY + amplitude;

      gsap.set(card, { 
        left: cx - (cardWidth / 2), top: cy - (280 / 2),
        scale: 0.05, opacity: 0, borderRadius: "50%", transformOrigin: "center center"
      });

      if(dotsLayer) {
        const dot = document.createElement("div");
        dot.className = "track-dot";
        dot.style.left = `${cx}px`; dot.style.top = `${cy}px`;
        dotsLayer.appendChild(dot);
      }

      // Curva Suave (S-Curve)
      const prevX = lastX;
      const prevY = lastY;
      const cp1x = prevX + (gap * 0.4); const cp1y = prevY;
      const cp2x = cx - (gap * 0.4); const cp2y = cy;

      d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${cx},${cy} `;
      stops.push(cx / totalWidth);
      
      lastX = cx; lastY = cy;
    });

    // Retorno ao centro + Reta final
    const returnX = lastX + (gap * 0.6);
    const cp3x = lastX + (gap * 0.3); const cp3y = lastY;
    const cp4x = returnX - (gap * 0.3); const cp4y = centerY;

    d += `C ${cp3x},${cp3y} ${cp4x},${cp4y} ${returnX},${centerY} `;
    d += `L ${totalWidth},${centerY}`;
    
    pathGray.setAttribute("d", d);
    pathGreen.setAttribute("d", d);
    
    // Marcador HOJE
    if(futureMarker) {
      gsap.set(futureMarker, { 
        left: totalWidth, top: centerY, xPercent: -50, yPercent: -50, scale: 0, opacity: 0 
      });
    }

    // --- 3. TIMELINE MESTRA ---
    const length = pathGreen.getTotalLength();
    pathGreen.style.strokeDasharray = length;
    pathGreen.style.strokeDashoffset = length; 
    gsap.set(headDot, { x: startX, y: centerY });

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".horizontal-section",
        start: "top top",
        end: () => `+=${totalWidth * 2.2}`, 
        pin: true,
        scrub: 1.5, 
        invalidateOnRefresh: true,
        
        // Callbacks da Nav
        onEnter: () => {
          isTimelineActive = true; 
          if(nav) gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "power2.inOut", overwrite: true });
        },
        onLeave: () => {
          isTimelineActive = false;
          if(nav) gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", overwrite: true });
        },
        onEnterBack: () => {
          isTimelineActive = true;
          if(nav) gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "power2.inOut", overwrite: true });
        },
        onLeaveBack: () => {
          isTimelineActive = false;
          if(nav) gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", overwrite: true });
        }
      }
    });

    const snakeDuration = 20; 
    const zoomDuration = 5;

    // A. Cobra
    masterTl.to(pathGreen, { strokeDashoffset: 0, ease: "none", duration: snakeDuration }, 0);
    if (MotionPathPlugin) {
      masterTl.to(headDot, {
        motionPath: { path: "#zigzag-path", align: "#zigzag-path", alignOrigin: [0.5, 0.5] },
        ease: "none", duration: snakeDuration
      }, 0);
    }

    // B. Mundo (Camera Move)
    masterTl.to([wrapper, svgLayer, dotsLayer], {
      x: -(totalWidth - window.innerWidth), 
      ease: "none",
      duration: snakeDuration
    }, 0);

    // C. Cards
    cards.forEach((card, i) => {
      const hitTime = stops[i] * snakeDuration;
      masterTl.to(card, {
        scale: 1, borderRadius: "24px", opacity: 1, duration: 0.8, ease: "back.out(1.2)" 
      }, Math.max(0, hitTime - 0.5));

      masterTl.to(card, {
        scale: 0.7, opacity: 0.3, filter: "grayscale(100%)", duration: 3
      }, hitTime + 8); 
    });
    
    // D. Ponto Inicial (2007) - Aparece e some
    if(startMarker) {
      masterTl.fromTo(startMarker,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }, 
        0.5
      );
      // Some quando a cobra avança
      masterTl.to(startMarker, { scale: 0.5, opacity: 0, duration: 0.2 }, 4);
    }

    // --- 4. ZOOM OUT ---
    const zoomStart = snakeDuration + 1.2; 
    const finalScale = Math.min(0.2, (window.innerWidth / totalWidth) * 0.9);
    
    // Centralização do Mapa
    masterTl.to([wrapper, svgLayer, dotsLayer], {
      scale: finalScale,
      x: (window.innerWidth / 2) - (totalWidth / 2),
      transformOrigin: "center center",
      ease: "power2.inOut",
      duration: zoomDuration
    }, zoomStart);

    // Revelações
    const years = document.querySelectorAll(".h-year");
    masterTl.to(years, { opacity: 1, y: -40, scale: 4, duration: 1.5 }, zoomStart + 1);

    if(futureMarker) {
      const inverseScale = 1 / finalScale;
      masterTl.to(futureMarker, {
        opacity: 1, scale: inverseScale * 0.2, duration: 1, ease: "elastic.out(1, 0.3)"
      }, zoomStart + 0.5);
    }
    
    // REVELA O START MARKER NOVAMENTE NO MAPA FINAL
    if(startMarker) {
      const inverseScale = 1 / finalScale;
      masterTl.to(startMarker, {
        opacity: 1, 
        scale: inverseScale * 0.45, // Tamanho legível
        duration: 1.5
      }, zoomStart + 1.5);
    }
    
    masterTl.to({}, { duration: 2 }); 

    initModalLogic();
    initFutureClick();
  }

  // --- MOUSE NAV INTERACTION ---
  document.addEventListener("mousemove", (e) => {
    if(!nav) return;
    const threshold = 100; // Zona do topo
    
    if (e.clientY < threshold) {
      // Mouse no topo: MOSTRA NAV
      gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: true });
    } else {
      // Mouse saiu do topo
      if (isTimelineActive) {
        // Se na timeline, ESCONDE
        gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "power2.inOut", overwrite: true });
      } else {
        // Fora da timeline, MOSTRA
        gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", overwrite: true });
      }
    }
  });
}

function initFutureClick() {
  const marker = document.getElementById("todayMarker");
  if (!marker) return;
  const msg = marker.querySelector(".future-hidden-msg");
  const icon = marker.querySelector(".future-icon");
  const text = marker.querySelector(".future-text");
  
  // Criamos a timeline pausada para controlar o estado
  const tl = window.gsap.timeline({ paused: true, reversed: true });

  tl.to(text, { opacity: 0, y: -20, duration: 0.3 })
    .to(icon, { rotation: 90, scale: 1.5, borderColor: "var(--accent)", backgroundColor:"var(--accent)", color:"#000", duration: 0.5 }, 0)
    .to(msg, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.2);

  marker.addEventListener("click", () => {
    // Se estiver no início ou revertendo, dá play. Se não, reverte.
    tl.reversed() ? tl.play() : tl.reverse();
  });
}

function initModalLogic() {
  const modal = document.getElementById("projectModal");
  const els = {
    img: document.getElementById("modalImg"),
    title: document.getElementById("modalTitle"),
    desc: document.getElementById("modalDesc"),
    year: document.getElementById("modalYear"),
    link: document.getElementById("modalLink"),
    close: document.getElementById("modalClose"),
    bg: document.getElementById("modalBackdrop")
  };
  
  if(!modal) return;
  document.querySelectorAll(".h-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if(getComputedStyle(card).opacity < 0.5) return; 
      e.preventDefault();
      const d = card.dataset;
      els.img.src = d.img;
      els.title.textContent = d.nome;
      els.desc.textContent = d.desc;
      els.year.textContent = d.ano;
      els.link.href = d.link;
      modal.classList.add("is-open");
    });
  });
  const close = () => modal.classList.remove("is-open");
  els.close.addEventListener("click", close);
  els.bg.addEventListener("click", close);
}