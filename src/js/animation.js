(function () {
  // Verifica se GSAP está carregado
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP não carregado. Animações desativadas.");
    document.querySelectorAll(".reveal").forEach(el => el.style.opacity = 1);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Reveal (Fade Up)
  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });

  // Parallax Hero
  document.querySelectorAll("[data-parallax-hero] .hero__bg").forEach((bg) => {
    gsap.to(bg, {
      yPercent: 20, // Move o fundo mais devagar que o scroll
      ease: "none",
      scrollTrigger: {
        trigger: bg.closest("[data-parallax-hero]"),
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });
  
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();