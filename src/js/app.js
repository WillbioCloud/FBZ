import { FBZ_DATA } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const vitrineContainer = document.getElementById("vitrine");
  let bgContainer = document.getElementById("bg-container");
  if (!bgContainer) {
    bgContainer = document.createElement("div");
    bgContainer.id = "bg-container";
    document.body.prepend(bgContainer);
  }

  // Helpers
  function getGallery(emp) {
    const arr = emp.gallery || emp.imagens || emp.images || emp.galeria || null;
    if (Array.isArray(arr) && arr.length) return arr;
    // Fallback: repete a heroImg para ter o que mostrar
    return [emp.heroImg, emp.heroImg, emp.heroImg];
  }

  // Tenta achar a logo (você pode ajustar os caminhos conforme sua pasta)
  function guessLogoPath(emp) {
    return [
      emp.logo,
      `/assets/img/logo/LOGO-${(emp.nome || "").toUpperCase().replace(/\s+/g, "-")}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.png`
    ].filter(Boolean);
  }

  // Função de troca de imagem
  function switchGalleryImage(sectionEl, index) {
    const imgs = Array.from(sectionEl.querySelectorAll(".project-gallery-img"));
    if (!imgs.length) return;

    // Lógica Circular (se passar do fim, volta pro começo)
    let safeIndex = index;
    if (index < 0) safeIndex = imgs.length - 1;
    if (index >= imgs.length) safeIndex = 0;

    // Atualiza Dots
    const btns = Array.from(sectionEl.querySelectorAll(".mini-nav__btn"));
    btns.forEach(b => b.classList.remove("is-active"));
    if (btns[safeIndex]) btns[safeIndex].classList.add("is-active");

    // Troca Imagem (Crossfade)
    imgs.forEach((img, i) => {
      const show = i === safeIndex;
      if (window.gsap) {
        window.gsap.to(img, { autoAlpha: show ? 1 : 0, duration: 0.4 });
      } else {
        img.style.opacity = show ? 1 : 0;
      }
    });

    // Salva o índice atual no elemento pai para referência das setas
    sectionEl.dataset.currentIndex = safeIndex;
  }

  // --- RENDERIZAR VITRINE ---
  if (vitrineContainer) {
    vitrineContainer.innerHTML = "";
    bgContainer.innerHTML = "";

    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      // 1. Background
      const bgDiv = document.createElement("div");
      bgDiv.className = `bg-item bg-item-${index}`;
      bgDiv.innerHTML = `<div class="bg-img-layer" style="background-image: url('${emp.heroImg}')"></div><div class="bg-overlay"></div>`;
      bgContainer.appendChild(bgDiv);

      // 2. Conteúdo
      const gallery = getGallery(emp);
      const logoCandidates = guessLogoPath(emp);
      const reverseClass = index % 2 !== 0 ? "reverse" : "";

      // Gera os Dots
      const dotsHTML = gallery.map((_, i) => `
        <button type="button" class="mini-nav__btn ${i === 0 ? "is-active" : ""}" data-img-index="${i}">
          <span class="mini-nav__dot"></span>
        </button>
      `).join("");

      // Gera as Imagens
      const galleryHTML = gallery.map((src, i) => `
        <img class="project-gallery-img" src="${src}" style="opacity:${i === 0 ? 1 : 0}" loading="lazy">
      `).join("");

      // SVG Icons para as setas
      const chevronLeft = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
      const chevronRight = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

      const sectionHTML = `
        <section class="project-section" data-index="${index}" data-current-index="0">
          <div class="container project-container" style="position: relative;"> <div class="project-content ${reverseClass}">
              
              <div class="perspective-container group">
                <a href="${emp.link}" class="project-card-link">
                  <div class="project-card-media project-card-media--logo">
                    <img class="project-logo" data-logo-candidates='${JSON.stringify(logoCandidates)}' />
                  </div>
                  <div class="project-card-media project-card-media--gallery">
                     ${galleryHTML}
                  </div>
                  <div class="card-badge">${emp.status}</div>
                </a>
              </div>

              <div class="text-content">
                <h2 class="project-title split-animate">${emp.nome}</h2>
                <span class="project-slogan" style="color:${emp.corHex}">${emp.slogan}</span>
                <p class="project-desc">${emp.descCurta}</p>
                <div class="project-actions">
                  <a href="${emp.link}" class="btn btn--primary" style="background:${emp.corHex}; border-color:${emp.corHex}; color:#fff;">Explorar</a>
                  <a href="https://wa.me/${FBZ_DATA.global.whatsapp}" class="btn btn--ghost">WhatsApp</a>
                </div>
              </div>

            </div>

            <div class="mini-nav">
              <div class="mini-nav__inner">
                <button class="nav-arrow prev">${chevronLeft}</button>
                <div class="mini-nav__dots">
                  ${dotsHTML}
                </div>
                <button class="nav-arrow next">${chevronRight}</button>
              </div>
            </div>

          </div>
        </section>
      `;
      vitrineContainer.insertAdjacentHTML("beforeend", sectionHTML);
    });

    // 3. Inicializa Logos (Fallback)
    document.querySelectorAll("img.project-logo").forEach(img => {
      const candidates = JSON.parse(img.dataset.logoCandidates || "[]");
      let i = 0;
      const tryNext = () => {
        if(i >= candidates.length) { img.style.display="none"; return; }
        img.src = candidates[i++];
      };
      img.onerror = tryNext;
      tryNext();
    });

    // 4. Lógica de Clique (Setas e Dots)
    document.querySelectorAll(".project-section").forEach(section => {
      // Dots
      section.querySelectorAll(".mini-nav__btn").forEach(btn => {
        btn.addEventListener("click", () => switchGalleryImage(section, Number(btn.dataset.imgIndex)));
      });
      // Setas
      section.querySelector(".prev").addEventListener("click", () => {
        const curr = Number(section.dataset.currentIndex || 0);
        switchGalleryImage(section, curr - 1);
      });
      section.querySelector(".next").addEventListener("click", () => {
        const curr = Number(section.dataset.currentIndex || 0);
        switchGalleryImage(section, curr + 1);
      });
    });

    // 5. Inicia Animações
    import("./animation.js").then(m => m.initHomeAnimations && m.initHomeAnimations());
  }
});