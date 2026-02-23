// src/js/animation-timeline.js

export function initTimelineAnimations() {
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.getAll().forEach((t) => t.kill());

  const heroTitle = document.querySelector(".hero-title-big");
  if (heroTitle && window.SplitType) {
    const split = new window.SplitType(heroTitle, { types: "chars" });

    gsap.from(split.chars, {
      x: -16,
      y: 20,
      opacity: 0,
      filter: "blur(12px)",
      stagger: 0.045,
      duration: 0.55,
      ease: "power3.out"
    });

    gsap.to(heroTitle, {
      scale: 0.65,
      opacity: 0,
      y: 70,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".page-hero",
        start: "top top",
        end: "bottom 45%",
        scrub: 0.4
      }
    });
  }

  const section = document.querySelector(".horizontal-section");
  const wrapper = document.querySelector(".horizontal-wrapper");
  const svgLayer = document.querySelector(".svg-layer");
  const dotsLayer = document.querySelector(".dots-layer");
  const pathGray = document.querySelector("#zigzag-path");
  const pathGreen = document.querySelector("#zigzag-tracer");
  const headDot = document.querySelector(".head-dot");
  const cards = Array.from(document.querySelectorAll(".h-card"));
  const nav = document.querySelector(".nav");
  const futureMarker = document.querySelector(".future-marker");
  const startMarker = document.querySelector(".start-marker");

  let isTimelineActive = false;

  if (section && wrapper && svgLayer && pathGray && pathGreen && cards.length > 0) {
    const centerX = Math.max(280, Math.round(window.innerWidth / 2));
    const startY = 180;
    const stepY = 360;
    const sideOffset = Math.min(300, Math.round(window.innerWidth * 0.24));
    const endY = startY + stepY * (cards.length - 1);
    const totalHeight = endY + 340;

    wrapper.style.width = "100%";
    wrapper.style.height = `${totalHeight}px`;
    svgLayer.style.width = "100%";
    svgLayer.style.height = `${totalHeight}px`;
    if (dotsLayer) {
      dotsLayer.style.width = "100%";
      dotsLayer.style.height = `${totalHeight}px`;
      dotsLayer.innerHTML = "";
    }

    const d = `M ${centerX},${startY} L ${centerX},${endY}`;
    pathGray.setAttribute("d", d);
    pathGreen.setAttribute("d", d);

    const lineLength = pathGreen.getTotalLength();
    pathGreen.style.strokeDasharray = lineLength;
    pathGreen.style.strokeDashoffset = lineLength;

    gsap.set(headDot, { x: centerX, y: startY, opacity: 1 });

    cards.forEach((card, index) => {
      const y = startY + index * stepY;
      const isLeft = index % 2 === 0;
      const cardWidth = Math.min(500, Math.round(window.innerWidth * 0.42));

      card.style.width = `${cardWidth}px`;
      gsap.set(card, {
        left: centerX + (isLeft ? -sideOffset - cardWidth : sideOffset),
        top: y - 140,
        opacity: 0,
        y: 70,
        scale: 0.92
      });

      if (dotsLayer) {
        const dot = document.createElement("div");
        dot.className = "track-dot";
        dot.style.left = `${centerX}px`;
        dot.style.top = `${y}px`;
        dotsLayer.appendChild(dot);
      }

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          end: "top 42%",
          scrub: 0.3
        }
      });
    });

    if (startMarker) {
      gsap.set(startMarker, {
        left: centerX,
        top: startY - 70,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        scale: 1
      });
    }

    if (futureMarker) {
      gsap.set(futureMarker, {
        left: centerX,
        top: endY + 140,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        scale: 1
      });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalHeight}`,
      scrub: 0.35,
      onUpdate: (self) => {
        pathGreen.style.strokeDashoffset = lineLength * (1 - self.progress);
        gsap.set(headDot, { y: startY + (endY - startY) * self.progress });
      },
      onEnter: () => {
        isTimelineActive = true;
        if (nav) gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.4, ease: "power2.out", overwrite: true });
      },
      onLeave: () => {
        isTimelineActive = false;
        if (nav) gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", overwrite: true });
      },
      onEnterBack: () => {
        isTimelineActive = true;
        if (nav) gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.35, ease: "power2.out", overwrite: true });
      },
      onLeaveBack: () => {
        isTimelineActive = false;
        if (nav) gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", overwrite: true });
      }
    });

    initModalLogic();
    initFutureClick();
  }

  document.addEventListener("mousemove", (e) => {
    if (!nav) return;

    if (e.clientY < 100) {
      gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out", overwrite: true });
      return;
    }

    if (isTimelineActive) {
      gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.35, ease: "power2.out", overwrite: true });
    } else {
      gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", overwrite: true });
    }
  });

  ScrollTrigger.refresh();
}

function initFutureClick() {
  const marker = document.getElementById("todayMarker");
  if (!marker) return;
  const msg = marker.querySelector(".future-hidden-msg");
  const icon = marker.querySelector(".future-icon");
  const text = marker.querySelector(".future-text");

  const tl = window.gsap.timeline({ paused: true, reversed: true });

  tl.to(text, { opacity: 0, y: -20, duration: 0.25, ease: "power2.out" })
    .to(icon, { rotation: 90, scale: 1.25, borderColor: "var(--accent)", backgroundColor: "var(--accent)", color: "#000", duration: 0.35, ease: "power3.out" }, 0)
    .to(msg, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, 0.15);

  marker.addEventListener("click", () => {
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

  if (!modal) return;
  document.querySelectorAll(".h-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (getComputedStyle(card).opacity < 0.5) return;
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
