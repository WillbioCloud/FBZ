// src/js/app.js
import { FBZ_DATA } from "./data.js";
import { BLOG_DATA } from "./data-blog.js"; // Importa Blog separado
import { initHomeAnimations } from "./animation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa Plugin GSAP se disponível
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const vitrineContainer = document.getElementById("vitrine");
  const homeBlogContainer = document.getElementById("homeBlogGrid");
  let bgContainer = document.getElementById("bg-container");

  const renderHomeBlogCards = () => {
    if (!homeBlogContainer || !Array.isArray(BLOG_DATA) || !BLOG_DATA.length) return;

    const recentPosts = [...BLOG_DATA].slice(0, 3);
    const iconEye = `<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconMsg = `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
    const iconClock = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;

    homeBlogContainer.innerHTML = recentPosts.map(post => `
      <a href="/src/blog-post.html?slug=${post.slug}" class="blog-card reveal-card" style="text-decoration:none; color:inherit;">
        <img src="${post.thumb}" alt="${post.titulo}" class="blog-thumb" loading="lazy">
        <div class="blog-body">
          <div class="blog-meta">
            <span>${post.categoria}</span>
            <span>${post.data}</span>
          </div>
          <h3 class="blog-title">${post.titulo}</h3>
          <p class="blog-excerpt">${post.resumo.substring(0, 100)}...</p>
          <div class="blog-stats">
            <span title="Visualizações">${iconEye} ${post.views || 0}</span>
            <span title="Comentários">${iconMsg} ${post.comments || 0}</span>
            <span title="Tempo">${iconClock} ${post.readTime || "3 min"}</span>
          </div>
          <div class="blog-footer">
            <span style="font-size:0.8rem">Por ${post.autor}</span>
            <span class="read-more">Ler mais <span>→</span></span>
          </div>
        </div>
      </a>
    `).join("");
  };

  // --- FUNÇÃO DE SCROLL INTELIGENTE (A Mágica) ---
  // Rola para a seção e adiciona o offset para pular a animação de entrada
  const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    // O PULO DO GATO:
    // Pega a posição da seção e soma ~2000px.
    // Isso faz o scroll "avançar" a timeline da animação até o ponto onde o conteúdo está visível.
    const startY = window.scrollY + target.getBoundingClientRect().top;
    const offset = 2500; // Avança 2000px dentro do "pin" para pular a entrada do fundo
    
    window.scrollTo({
      top: startY + offset,
      behavior: "smooth"
    });
  };

  // --- 1. POPULAR DROPDOWN ---
  const navProjectsList = document.getElementById("navProjectsList");
  if (navProjectsList && FBZ_DATA.empreendimentos) {
    navProjectsList.innerHTML = FBZ_DATA.empreendimentos.map(emp => `
      <a href="/index.html#${emp.slug}" class="dropdown-item" data-target="#${emp.slug}">${emp.nome}</a>
    `).join('');

    // Adiciona evento de clique para navegação suave na mesma página
    navProjectsList.querySelectorAll('.dropdown-item').forEach(link => {
      link.addEventListener('click', (e) => {
        // Se estivermos na Home, interceptamos o clique
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
          e.preventDefault();
          const targetId = link.getAttribute('data-target');
          smoothScrollTo(targetId);
          // Atualiza URL sem recarregar
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Cria container de Background se não existir
  if (!bgContainer) {
    bgContainer = document.createElement("div");
    bgContainer.id = "bg-container";
    document.body.prepend(bgContainer);
  }

  // --- HELPERS ---
  function getGallery(emp) {
    const arr = emp.gallery || emp.imagens || emp.images || emp.galeria || null;
    if (Array.isArray(arr) && arr.length) return arr;
    return [emp.heroImg, emp.heroImg, emp.heroImg];
  }

  function guessLogoPath(emp) {
    return [
      emp.logo,
      `/assets/img/logo/LOGO-${(emp.nome || "").toUpperCase().replace(/\s+/g, "-")}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.webp`,
      `/assets/img/logo/${(emp.slug || "").toLowerCase()}.png`
    ].filter(Boolean);
  }

  function switchGalleryImage(sectionEl, index) {
    const imgs = Array.from(sectionEl.querySelectorAll(".project-gallery-img"));
    if (!imgs.length) return;

    let safeIndex = index;
    if (index < 0) safeIndex = imgs.length - 1;
    if (index >= imgs.length) safeIndex = 0;

    const btns = Array.from(sectionEl.querySelectorAll(".mini-nav__btn"));
    btns.forEach(b => b.classList.remove("is-active"));
    if (btns[safeIndex]) btns[safeIndex].classList.add("is-active");

    imgs.forEach((img, i) => {
      const show = i === safeIndex;
      if (window.gsap) {
        window.gsap.to(img, { autoAlpha: show ? 1 : 0, duration: 0.4 });
      } else {
        img.style.opacity = show ? 1 : 0;
      }
    });
    sectionEl.dataset.currentIndex = safeIndex;
  }

  // --- RENDERIZAR VITRINE ---
  if (vitrineContainer) {
    vitrineContainer.innerHTML = "";
    bgContainer.innerHTML = "";

    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      const bgDiv = document.createElement("div");
      bgDiv.className = `bg-item bg-item-${index}`;
      
      // --- LÓGICA VÍDEO VS IMAGEM (NOVO) ---
      let mediaHTML;
      
      if (emp.heroVideo) {
        // Se tiver vídeo, cria tag <video>
        mediaHTML = `
          <video 
            class="bg-img-layer" 
            autoplay loop muted playsinline 
            style="object-fit: cover; width: 100%; height: 100%;"
          >
            <source src="${emp.heroVideo}" type="video/mp4">
          </video>
        `;
      } else {
        // Se não, usa a imagem padrão
        mediaHTML = `
          <div class="bg-img-layer" style="background-image: url('${emp.heroImg}')"></div>
        `;
      }

      // Injeta o HTML escolhido + Overlay escuro
      bgDiv.innerHTML = `${mediaHTML}<div class="bg-overlay"></div>`;
      bgContainer.appendChild(bgDiv);

      const gallery = getGallery(emp);
      const logoCandidates = guessLogoPath(emp);
      const reverseClass = index % 2 !== 0 ? "reverse" : "";

      const dotsHTML = gallery.map((_, i) => `
        <button type="button" class="mini-nav__btn ${i === 0 ? "is-active" : ""}" data-img-index="${i}"><span class="mini-nav__dot"></span></button>
      `).join("");

      const galleryHTML = gallery.map((src, i) => `
        <img class="project-gallery-img" src="${src}" style="opacity:${i === 0 ? 1 : 0}" loading="lazy">
      `).join("");

      const chevronLeft = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
      const chevronRight = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

      // ID Adicionado na Section
      const sectionHTML = `
        <section id="${emp.slug}" class="project-section" data-index="${index}" data-current-index="0">
          <div class="container project-container" style="position: relative;">
            <div class="project-content ${reverseClass}">
              <div class="perspective-container group">
                <a href="${emp.link}" class="project-card-link">
                  <div class="project-card-media project-card-media--logo">
                    <img class="project-logo" data-logo-candidates='${JSON.stringify(logoCandidates)}' />
                  </div>
                  <div class="project-card-media project-card-media--gallery">${galleryHTML}</div>
                  <div class="card-badge">${emp.status}</div>
                </a>
              </div>
              <div class="text-content">
                <h2 class="project-title split-animate">${emp.nome}</h2>
                <span class="project-slogan" style="color:${emp.corHex}">${emp.slogan}</span>
                <p class="project-desc">${emp.descCurta}</p>
                <div class="project-actions">
                  <a href="${emp.link}" class="btn btn--ghost btn--lg" style="background:${emp.corHex}; border-color:${emp.corHex}; color:#fff;">Explorar</a>
                  <a href="https://wa.me/${FBZ_DATA.global.whatsapp}" class="btn btn--ghost">WhatsApp</a>
                </div>
              </div>
            </div>
            <div class="mini-nav">
              <div class="mini-nav__inner">
                <button class="nav-arrow prev">${chevronLeft}</button>
                <div class="mini-nav__dots">${dotsHTML}</div>
                <button class="nav-arrow next">${chevronRight}</button>
              </div>
            </div>
          </div>
        </section>
      `;
      vitrineContainer.insertAdjacentHTML("beforeend", sectionHTML);
    });

    // Inits de Logo e Galeria
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

    document.querySelectorAll(".project-section").forEach(section => {
      section.querySelectorAll(".mini-nav__btn").forEach(btn => {
        btn.addEventListener("click", () => switchGalleryImage(section, Number(btn.dataset.imgIndex)));
      });
      section.querySelector(".prev").addEventListener("click", () => {
        const curr = Number(section.dataset.currentIndex || 0);
        switchGalleryImage(section, curr - 1);
      });
      section.querySelector(".next").addEventListener("click", () => {
        const curr = Number(section.dataset.currentIndex || 0);
        switchGalleryImage(section, curr + 1);
      });
    });

    // Inicia animações e verifica Hash na URL (Deep Linking)
    import("./animation.js").then(m => {
      if(m.initHomeAnimations) m.initHomeAnimations();
      
      // Se veio de outra página, usa a mesma lógica de scroll compensado
      if (window.location.hash) {
        setTimeout(() => {
          smoothScrollTo(window.location.hash);
        }, 800); // Delay um pouco maior para garantir que o ScrollTrigger calculou o layout
      }
    });
  }

  // --- BLOG HOME (Mantido) ---
  renderHomeBlogCards();

  const pageSlug = document.body.getAttribute("data-empreendimento");
  if (pageSlug) {
    import("./render-empreendimento.js");
  }
});
