import { FBZ_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const vitrineContainer = document.getElementById('vitrine');
  
  let bgContainer = document.getElementById('bg-container');
  if (!bgContainer) {
    bgContainer = document.createElement('div');
    bgContainer.id = 'bg-container';
    document.body.prepend(bgContainer);
  }

  // --- Lógica Home ---
  if (vitrineContainer) {
    vitrineContainer.innerHTML = '';
    bgContainer.innerHTML = '';

    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      // 1. Background Fixo (Camadas: Imagem < Cor Sólida < Overlay Escuro)
      const bgDiv = document.createElement('div');
      bgDiv.className = `bg-item bg-item-${index}`;
      
      // Camada A: Imagem
      const imgLayer = document.createElement('div');
      imgLayer.className = 'bg-img-layer';
      imgLayer.style.backgroundImage = `url('${emp.heroImg}')`;
      bgDiv.appendChild(imgLayer);

      // Camada B: Cor Sólida (Nova Animação)
      const solidLayer = document.createElement('div');
      solidLayer.className = 'solid-overlay';
      solidLayer.style.backgroundColor = emp.corHex || '#111';
      bgDiv.appendChild(solidLayer);
      
      // Camada C: Overlay Escuro (Leitura)
      const overlay = document.createElement('div');
      overlay.className = 'bg-overlay';
      bgDiv.appendChild(overlay);
      
      bgContainer.appendChild(bgDiv);

      // 2. Seção de Conteúdo (Mais alta para mais tempo de scroll)
      const reverse = index % 2 !== 0 ? 'lg:flex-row-reverse' : '';
      
      // ATENÇÃO: min-h-[160vh] aumenta o tempo da rolagem
      const sectionHTML = `
        <section class="project-section min-h-[160vh] flex items-center justify-center relative py-20" data-index="${index}">
          <div class="container mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-16 ${reverse}">
              
              <div class="w-full lg:w-5/12 aspect-[4/5] relative group cursor-pointer perspective-container">
                 <a href="${emp.link}" class="block h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative transform transition-transform duration-700 hover:scale-[1.02]">
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110" style="background-image: url('${emp.heroImg}');"></div>
                    <div class="absolute top-6 left-6 z-20">
                      <span class="bg-white/90 backdrop-blur text-stone-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        ${emp.status}
                      </span>
                    </div>
                 </a>
              </div>

              <div class="w-full lg:w-6/12 text-content">
                <h2 class="split-animate text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                  ${emp.nome}
                </h2>
                <p class="text-2xl font-light mb-8 opacity-90" style="color: ${emp.corHex}">${emp.slogan}</p>
                <p class="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">${emp.descCurta}</p>
                
                <div class="flex flex-wrap gap-4">
                  <a href="${emp.link}" class="btn-explore px-10 py-4 text-white rounded-full font-bold transition shadow-lg" style="background-color: ${emp.corHex}">
                    Explorar
                  </a>
                  <a href="https://wa.me/${FBZ_DATA.global.whatsapp}" target="_blank" class="px-10 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm">
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      `;
      vitrineContainer.insertAdjacentHTML('beforeend', sectionHTML);
    });

    import('./animation.js').then(module => {
      if(module.initHomeAnimations) module.initHomeAnimations();
    });
  }

  // --- Lógica Páginas Internas ---
  const pageSlug = document.body.getAttribute('data-empreendimento');
  if (pageSlug) {
    import('./render-empreendimento.js');
  }
});