// src/js/animation.js

function splitTextToSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    if (el.dataset.split === "true") return;

    const text = (el.textContent || "").trim();
    if (!text) return;

    el.innerHTML = text
      .split("")
      .map((char) => {
        if (char === " ")
          return `<span class="char" style="display:inline-block; width:0.3em;">&nbsp;</span>`;
        return `<span class="char" style="display:inline-block;">${char}</span>`;
      })
      .join("");

    el.dataset.split = "true";
  });
}

export function initHomeAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Mata tudo que já existia (evita duplicar animação e “pisca”)
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");

  // =========================
  // Títulos (ok)
  // =========================
  splitTextToSpans(".split-animate");
  document.querySelectorAll(".split-animate").forEach((title) => {
    const chars = title.querySelectorAll(".char");
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      { opacity: 0, y: 55, rotateX: -65, transformPerspective: 600 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "top 55%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  // =========================
  // Backgrounds (ok)
  // =========================
  const sections = Array.from(document.querySelectorAll(".project-section"));
  const bgs = Array.from(document.querySelectorAll(".bg-item"));

  sections.forEach((section, index) => {
    const bg = bgs[index];
    if (!bg) return;

    const imgLayer = bg.querySelector(".bg-img-layer");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "none" });

    if (imgLayer) {
      tl.fromTo(imgLayer, { scale: 1.15 }, { scale: 1.0, duration: 0.7, ease: "none" }, "<");
    }

    tl.to({}, { duration: 0.2 });
    tl.to(bg, { opacity: 0, duration: 0.15, ease: "none" });
  });

  // =========================
  // Seções: escondida -> aparece no meio -> some subindo
  // com travadinha (pin)
  // =========================
  const PIN_DISTANCE = 800; // ajuste: 700-900 bom

  sections.forEach((section) => {
    const pinEl = section.querySelector(".project-container") || section;
    const content = section.querySelector(".project-content");
    const miniNav = section.querySelector(".mini-nav");

    const logoLayer = section.querySelector(".project-card-media--logo");
    const galleryLayer = section.querySelector(".project-card-media--gallery");

    if (!content) return;

    // garante estado inicial “certo”
    gsap.set(content, { autoAlpha: 0, y: 90 });
    if (miniNav) gsap.set(miniNav, { autoAlpha: 0 });
    if (logoLayer) gsap.set(logoLayer, { autoAlpha: 1, scale: 0.95 });
    if (galleryLayer) gsap.set(galleryLayer, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: `+=${PIN_DISTANCE}`,
        pin: pinEl,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 0-0.20: ainda escondido (chegando no meio)
    tl.to(content, { autoAlpha: 0, y: 90, duration: 0.20, ease: "none" }, 0);

    // 0.20-0.35: aparece (AGORA sim)
    tl.to(content, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.20);

    // mini nav aparece junto e fica embaixo (você controla posição no CSS)
    if (miniNav) {
      tl.to(miniNav, { autoAlpha: 1, duration: 0.12, ease: "power2.out" }, 0.24);
    }

    // logo só anima depois que conteúdo já tá 100%
    if (logoLayer && galleryLayer) {
      tl.to(logoLayer, { scale: 1, duration: 0.16, ease: "power2.out" }, 0.40);
      tl.to({}, { duration: 0.10 }, 0.56);
      tl.to(logoLayer, { autoAlpha: 0, duration: 0.12, ease: "power2.out" }, 0.66);
      tl.to(galleryLayer, { autoAlpha: 1, duration: 0.12, ease: "power2.out" }, 0.68);
    }

    // mini nav é a primeira a sumir quando começa a “subir”
    if (miniNav) {
      tl.to(miniNav, { autoAlpha: 0, duration: 0.12, ease: "power2.out" }, 0.78);
    }

    // saída: some subindo
    tl.to(content, { autoAlpha: 0, y: -90, duration: 0.18, ease: "power2.in" }, 0.84);
  });

  // refresh final
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
