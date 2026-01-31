import { FBZ_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa GSAP se disponível
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const vitrineContainer = document.getElementById('vitrine');
  
  // Cria container para o Background Fixo
  let bgContainer = document.getElementById('bg-container');
  if (!bgContainer) {
    bgContainer = document.createElement('div');
    bgContainer.id = 'bg-container';
    document.body.prepend(bgContainer);
  }

  // --- HOME (Vitrine) ---
  if (vitrineContainer) {
    vitrineContainer.innerHTML = '';
    bgContainer.innerHTML = '';

    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      // 1. BACKGROUND SYSTEM (Imagem + Overlay)
      const bgDiv = document.createElement('div');
      bgDiv.className = `bg-item bg-item-${index}`;
      
      // Camada Imagem
      const imgLayer = document.createElement('div');
      imgLayer.className = 'bg-img-layer';
      imgLayer.style.backgroundImage = `url('${emp.heroImg}')`;
      bgDiv.appendChild(imgLayer);
      
      // Camada Overlay
      const overlay = document.createElement('div');
      overlay.className = 'bg-overlay';
      bgDiv.appendChild(overlay);
      
      bgContainer.appendChild(bgDiv);

      // 2. CONTEÚDO (HTML com Classes CSS Explícitas)
      const reverseClass = index % 2 !== 0 ? 'reverse' : '';
      
      // Note o uso das classes: project-section, project-content, perspective-container
      const sectionHTML = `
        <section class="project-section" data-index="${index}">
          <div class="container project-container">
            <div class="project-content ${reverseClass}">
              
              <div class="perspective-container group">
                 <a href="${emp.link}" class="project-card-link">
                    <div class="project-card-bg" style="background-image: url('${emp.heroImg}');"></div>
                    <div class="card-badge">
                      ${emp.status}
                    </div>
                 </a>
              </div>

              <div class="text-content">
                <h2 class="project-title split-animate">
                  ${emp.nome}
                </h2>
                <span class="project-slogan" style="color: ${emp.corHex}">
                  ${emp.slogan}
                </span>
                <p class="project-desc">
                  ${emp.descCurta}
                </p>
                
                <div class="project-actions">
                  <a href="${emp.link}" class="btn btn--primary" style="background-color: ${emp.corHex}; border-color: ${emp.corHex}; color: #fff;">
                    Explorar Detalhes
                  </a>
                  <a href="https://wa.me/${FBZ_DATA.global.whatsapp}" target="_blank" class="btn btn--ghost">
                    Falar no WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      `;
      vitrineContainer.insertAdjacentHTML('beforeend', sectionHTML);
    });

    // Inicia animações
    import('./animation.js').then(module => {
      if(module.initHomeAnimations) module.initHomeAnimations();
    });
  }

  // Lógica para páginas internas
  const pageSlug = document.body.getAttribute('data-empreendimento');
  if (pageSlug) {
    import('./render-empreendimento.js');
  }
});