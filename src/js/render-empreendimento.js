(function () {
  const slug = document.body.getAttribute("data-empreendimento");
  if (!slug) return;

  // Aguarda o carregamento do window.FBZ_DATA se necessário, ou executa direto
  const data = window.FBZ_DATA;
  if (!data) {
    console.error("FBZ_DATA não encontrado. Verifique se data.js foi carregado.");
    return;
  }

  const { empreendimentos, whatsappPhone } = data;
  const emp = empreendimentos.find(e => e.slug === slug);
  
  if (!emp) {
    console.warn("Empreendimento não encontrado no JSON:", slug);
    return;
  }

  const waLink = (message) => {
    const text = encodeURIComponent(message || "");
    return `https://api.whatsapp.com/send/?phone=${whatsappPhone}&text=${text}&type=phone_number&app_absent=0`;
  };

  // SEO
  document.title = `${emp.nome} | FBZ Construtora`;
  
  // Hero
  const heroBg = document.querySelector(".hero__bg");
  if (heroBg && emp.heroImg) heroBg.style.backgroundImage = `url('${emp.heroImg}')`;

  const h1 = document.getElementById("empTitle");
  const sub = document.getElementById("empSlogan");
  if (h1) h1.textContent = emp.nome;
  if (sub) sub.textContent = emp.slogan;

  const badge = document.getElementById("empStatus");
  if (badge) {
    badge.textContent = emp.status;
    badge.className = `badge badge--${emp.status.replace(/\s+/g, '-').toLowerCase()}`; 
  }

  // CTAs
  const btnWhats = document.getElementById("empWhats");
  const btnWhats2 = document.getElementById("empWhats2");
  const floatWhats = document.getElementById("floatWhats");
  const navWhats = document.getElementById("navWhats");
  
  const link = waLink(emp.whatsappMsg);
  
  if(btnWhats) btnWhats.href = link;
  if(btnWhats2) btnWhats2.href = link;
  if(floatWhats) floatWhats.href = link;
  if(navWhats) navWhats.href = waLink("Olá! Quero informações sobre os empreendimentos da FBZ.");

  // Destaques
  const ul = document.getElementById("empDestaques");
  if (ul) {
    ul.innerHTML = (emp.destaques || []).map(d => `<li>${d}</li>`).join("");
  }

  // FAQ
  const faqWrap = document.getElementById("empFAQ");
  if (faqWrap) {
    const faqList = emp.faq || [];
    faqWrap.innerHTML = faqList.length ? faqList.map((item) => `
      <details class="card" style="padding:14px 16px; margin-bottom: 8px;">
        <summary style="cursor:pointer; list-style:none; font-weight:650; outline:none;">
          <span style="display:inline-block; width:100%;">${item.q}</span>
        </summary>
        <p style="margin-top:10px; font-size: 0.95rem; opacity: 0.8;">${item.a}</p>
      </details>
    `).join("") : `<p style="opacity:0.6">Consulte nossos especialistas para detalhes técnicos.</p>`;
  }

  // Etapas relacionadas
  const etapas = document.getElementById("empEtapas");
  if (etapas) {
    if (emp.etapasRelacionadas?.length) {
      etapas.innerHTML = emp.etapasRelacionadas.map(x => `
        <a class="card" style="padding:14px 16px; min-height:100px; justify-content:center;" href="/src/empreendimentos/${x.slug}.html">
          <strong style="color:var(--accent);">${x.nome}</strong>
          <div style="color:var(--muted); font-size:0.85rem; margin-top:4px;">Ver detalhes →</div>
        </a>
      `).join("");
    } else {
        // Se não tiver etapas, esconde a seção
        const section = etapas.closest('.section');
        if(section) section.style.display = 'none';
    }
  }
})();