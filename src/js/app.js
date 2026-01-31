import { FBZ_DATA } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa GSAP se disponível
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const vitrineContainer = document.getElementById("vitrine");

  // Cria container para o Background Fixo
  let bgContainer = document.getElementById("bg-container");
  if (!bgContainer) {
    bgContainer = document.createElement("div");
    bgContainer.id = "bg-container";
    document.body.prepend(bgContainer);
  }

  // Helpers -------------------------------------------------

  // Se você não tiver logo no data.js ainda, ele tenta um padrão (opcional)
  function guessLogoPath(emp) {
    // Você pode trocar esse padrão se quiser
    // Ex.: "/assets/img/logo/LOGO-CIDADE-INTELIGENTE.webp"
    // Aqui ele tenta slug em minúsculo (se existir arquivo, ok; se não, só falha silencioso)
    const base = `/assets/img/logo/${(emp.slug || "").toUpperCase()}`;
    return [
      emp.logo, // se existir, prioridade total
      `/assets/img/logo/LOGO-${(emp.nome || "").toUpperCase().replace(/\s+/g, "-")}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.png`,
    ].filter(Boolean);
  }

  // Galeria: aceita emp.gallery ou emp.imagens; se não tiver, cria fallback sem quebrar layout
  function getGallery(emp) {
    const arr =
      emp.gallery ||
      emp.imagens ||
      emp.images ||
      emp.galeria ||
      null;

    if (Array.isArray(arr) && arr.length) return arr;

    // Fallback mínimo (não quebra)
    // Ideal: depois você preenche emp.gallery com 3-6 imagens reais
    return [emp.heroImg, emp.heroImg, emp.heroImg].filter(Boolean);
  }

  // Troca de imagem da galeria (fade)
  function switchGalleryImage(sectionEl, index) {
    const imgs = Array.from(sectionEl.querySelectorAll(".project-gallery-img"));
    if (!imgs.length) return;

    const safeIndex = Math.max(0, Math.min(index, imgs.length - 1));

    // Atualiza estado ativo no nav
    const btns = Array.from(sectionEl.querySelectorAll(".mini-nav button[data-img-index]"));
    btns.forEach((b) => b.classList.remove("is-active"));
    const activeBtn = btns.find((b) => Number(b.dataset.imgIndex) === safeIndex);
    if (activeBtn) activeBtn.classList.add("is-active");

    // Se GSAP existir, faz fade suave; se não, troca seco
    const hasGsap = !!window.gsap;
    imgs.forEach((img, i) => {
      const show = i === safeIndex;

      if (hasGsap) {
        window.gsap.to(img, {
          autoAlpha: show ? 1 : 0,
          duration: show ? 0.35 : 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        img.style.opacity = show ? "1" : "0";
        img.style.visibility = show ? "visible" : "hidden";
      }
    });
  }

  // HOME (Vitrine) ------------------------------------------
  if (vitrineContainer) {
    vitrineContainer.innerHTML = "";
    bgContainer.innerHTML = "";

    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      // 1) BACKGROUND SYSTEM (Imagem + Overlay)
      const bgDiv = document.createElement("div");
      bgDiv.className = `bg-item bg-item-${index}`;

      const imgLayer = document.createElement("div");
      imgLayer.className = "bg-img-layer";
      imgLayer.style.backgroundImage = `url('${emp.heroImg}')`;
      bgDiv.appendChild(imgLayer);

      const overlay = document.createElement("div");
      overlay.className = "bg-overlay";
      bgDiv.appendChild(overlay);

      bgContainer.appendChild(bgDiv);

      // 2) CONTEÚDO
      const reverseClass = index % 2 !== 0 ? "reverse" : "";

      const gallery = getGallery(emp);
      const logoCandidates = guessLogoPath(emp);

      // Mini navbar (dots)
      const navItemsHTML = gallery
        .map((_, i) => {
          return `
            <button type="button" class="mini-nav__btn ${i === 0 ? "is-active" : ""}" data-img-index="${i}" aria-label="Imagem ${i + 1}">
              <span class="mini-nav__dot"></span>
            </button>
          `;
        })
        .join("");

      // Galeria de imagens empilhadas
      const galleryImgsHTML = gallery
        .map((src, i) => {
          return `
            <img
              class="project-gallery-img"
              src="${src}"
              alt="${emp.nome} - imagem ${i + 1}"
              loading="lazy"
              style="opacity:${i === 0 ? 1 : 0}; visibility:${i === 0 ? "visible" : "hidden"};"
            />
          `;
        })
        .join("");

      // Seção completa
      const sectionHTML = `
        <section class="project-section" data-index="${index}">
          <div class="container project-container">

            <!-- Mini navbar (controla imagens do card) -->
            <div class="mini-nav" aria-label="Controle de imagens do empreendimento">
              <div class="mini-nav__inner">
                <span class="mini-nav__label">${emp.nome}</span>
                <div class="mini-nav__controls">
                  ${navItemsHTML}
                </div>
              </div>
            </div>

            <div class="project-content ${reverseClass}">
              <div class="perspective-container group">
                <a href="${emp.link}" class="project-card-link" aria-label="Abrir ${emp.nome}">
                  
                  <!-- Camada LOGO (aparece primeiro) -->
                  <div class="project-card-media project-card-media--logo">
                    <img
                      class="project-logo"
                      alt="Logo ${emp.nome}"
                      data-logo-candidates='${JSON.stringify(logoCandidates)}'
                    />
                  </div>

                  <!-- Camada GALERIA (entra depois da logo) -->
                  <div class="project-card-media project-card-media--gallery">
                    <div class="project-gallery-stack">
                      ${galleryImgsHTML}
                    </div>
                  </div>

                  <div class="card-badge">${emp.status}</div>
                </a>
              </div>

              <div class="text-content">
                <h2 class="project-title split-animate">${emp.nome}</h2>

                <span class="project-slogan" style="color: ${emp.corHex}">
                  ${emp.slogan}
                </span>

                <p class="project-desc">${emp.descCurta}</p>

                <div class="project-actions">
                  <a
                    href="${emp.link}"
                    class="btn btn--primary"
                    style="background-color:${emp.corHex}; border-color:${emp.corHex}; color:#fff;"
                  >
                    Explorar Detalhes
                  </a>

                  <a
                    href="https://wa.me/${FBZ_DATA.global.whatsapp}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn--ghost"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;

      vitrineContainer.insertAdjacentHTML("beforeend", sectionHTML);
    });

    // 3) Inicializa LOGO fallback (tenta múltiplos caminhos)
    const logoImgs = document.querySelectorAll("img.project-logo[data-logo-candidates]");
    logoImgs.forEach((img) => {
      let candidates = [];
      try {
        candidates = JSON.parse(img.getAttribute("data-logo-candidates") || "[]");
      } catch {
        candidates = [];
      }

      if (!Array.isArray(candidates) || candidates.length === 0) {
        // Sem candidates -> some com a imagem (não quebra)
        img.style.display = "none";
        return;
      }

      let i = 0;
      const tryNext = () => {
        if (i >= candidates.length) {
          img.style.display = "none";
          return;
        }
        img.src = candidates[i];
        i += 1;
      };

      img.addEventListener("error", () => tryNext());
      tryNext();
    });

    // 4) Liga controles da mini navbar (troca imagens)
    const sections = Array.from(document.querySelectorAll(".project-section"));
    sections.forEach((sectionEl) => {
      const btns = Array.from(sectionEl.querySelectorAll(".mini-nav button[data-img-index]"));
      if (!btns.length) return;

      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idx = Number(btn.dataset.imgIndex || 0);
          switchGalleryImage(sectionEl, idx);
        });
      });
    });

    // 5) Inicia animações (GSAP)
    import("./animation.js").then((module) => {
      if (module.initHomeAnimations) module.initHomeAnimations();
    });
  }

  // Lógica para páginas internas
  const pageSlug = document.body.getAttribute("data-empreendimento");
  if (pageSlug) {
    import("./render-empreendimento.js");
  }
});
