import { FBZ_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const vitrineContainer = document.getElementById('vitrine');
  const pageSlug = document.body.getAttribute('data-slug');

  // ==========================================
  // CENÁRIO 1: ESTAMOS NA HOME (Vitrine)
  // ==========================================
  if (vitrineContainer) {
    FBZ_DATA.empreendimentos.forEach((emp, index) => {
      // Alternar lado da imagem (esquerda/direita)
      const reverse = index % 2 !== 0 ? 'lg:flex-row-reverse' : '';
      
      const sectionHTML = `
        <section class="container mx-auto px-6 project-section">
          <div class="flex flex-col lg:flex-row items-center gap-12 ${reverse}">
            
            <div class="w-full lg:w-1/2 h-[500px] overflow-hidden rounded-2xl relative group cursor-pointer reveal-img">
              <a href="${emp.link}">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all z-10"></div>
                <img src="${emp.heroImg}" alt="${emp.nome}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-6 left-6 z-20">
                  <span class="bg-white/90 backdrop-blur text-stone-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    ${emp.status}
                  </span>
                </div>
              </a>
            </div>

            <div class="w-full lg:w-1/2 reveal-text">
              <h2 class="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">${emp.nome}</h2>
              <p class="text-xl text-stone-500 font-light mb-6">${emp.slogan}</p>
              <p class="text-stone-600 mb-8 leading-relaxed">${emp.descCurta}</p>
              
              <ul class="space-y-2 mb-8">
                ${emp.destaques.slice(0, 3).map(d => `
                  <li class="flex items-center gap-3 text-stone-700">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> ${d}
                  </li>
                `).join('')}
              </ul>

              <div class="flex gap-4">
                <a href="${emp.link}" class="px-8 py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition">Ver Detalhes</a>
                <a href="https://wa.me/${FBZ_DATA.global.whatsapp}" target="_blank" class="px-8 py-3 border border-stone-300 text-stone-700 rounded-lg font-bold hover:bg-stone-50 transition">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      `;
      vitrineContainer.insertAdjacentHTML('beforeend', sectionHTML);
    });

    initAnimations();
  }

  // ==========================================
  // CENÁRIO 2: ESTAMOS EM UMA PÁGINA DE PROJETO
  // ==========================================
  if (pageSlug) {
    const project = FBZ_DATA.empreendimentos.find(p => p.slug === pageSlug);
    
    if (project) {
      // Preencher dados dinamicamente
      document.getElementById('p-title').innerText = project.nome;
      document.getElementById('p-slogan').innerText = project.slogan;
      document.getElementById('p-status').innerText = project.status;
      document.getElementById('p-desc').innerText = project.descCurta + " " + project.slogan; // Aqui você pode ter um campo 'fullDesc' no JSON
      document.getElementById('p-hero-img').src = project.heroImg;
      
      const featuresContainer = document.getElementById('p-features');
      project.destaques.forEach(feat => {
        featuresContainer.innerHTML += `<li class="flex items-center gap-2 p-4 bg-gray-50 rounded-lg"><span class="text-green-600">✓</span> ${feat}</li>`;
      });

      // Link do WhatsApp específico
      const msg = encodeURIComponent(`Olá, vi o ${project.nome} no site e quero a tabela.`);
      document.getElementById('p-whatsapp').href = `https://wa.me/${FBZ_DATA.global.whatsapp}?text=${msg}`;
    }
  }
});

function initAnimations() {
  // Animação de entrada dos textos
  gsap.utils.toArray('.reveal-text').forEach(elem => {
    gsap.from(elem, {
      scrollTrigger: { trigger: elem, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  // Animação das imagens
  gsap.utils.toArray('.reveal-img').forEach(elem => {
    gsap.from(elem, {
      scrollTrigger: { trigger: elem, start: "top 80%" },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  });
}