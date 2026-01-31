// src/js/render-empreendimento.js
(function () {
  const slug = document.body.getAttribute("data-empreendimento");
  if (!slug) return;

  const data = window.FBZ_DATA;
  if (!data) {
    console.error("FBZ_DATA não encontrado. Verifique se data.js foi carregado antes.");
    return;
  }

  const empreendimentos = data.empreendimentos || [];
  const global = data.global || {};

  const emp = empreendimentos.find((e) => e.slug === slug);

  if (!emp) {
    console.warn("Empreendimento não encontrado no JSON:", slug);
    return;
  }

  // WhatsApp
  const phone = (global.whatsapp || "").replace(/\D/g, ""); // somente dígitos
  const defaultMsg = global.whatsappDefaultMsg || "Olá! Vim pelo site da FBZ e gostaria de informações.";

  const waLink = (message) => {
    const text = encodeURIComponent(message || defaultMsg);
    // wa.me exige phone no formato internacional sem +
    return `https://wa.me/${phone}?text=${text}`;
  };

  // SEO
  document.title = `${emp.nome} | FBZ Construtora`;

  // HERO BG
  const heroBg = document.querySelector(".hero__bg");
  if (heroBg && emp.heroImg) {
    heroBg.style.backgroundImage = `url('${emp.heroImg}')`;
  }

  // HERO TEXTOS
  const h1 = document.getElementById("empTitle");
  const sub = document.getElementById("empSlogan");
  if (h1) h1.textContent = emp.nome || "";
  if (sub) sub.textContent = emp.slogan || "";

  // BADGE
  const badge = document.getElementById("empStatus");
  if (badge) {
    const statusText = emp.status || "Disponível";
    badge.textContent = statusText;
    badge.className = `badge badge--${String(statusText).replace(/\s+/g, "-").toLowerCase()}`;
  }

  // (OPCIONAL) LOGO no HERO (se existir no seu HTML)
  // Ex.: <img id="empLogo" />
  const empLogo = document.getElementById("empLogo");
  if (empLogo && emp.logo) {
    empLogo.src = emp.logo;
    empLogo.alt = `Logo ${emp.nome}`;
    empLogo.loading = "lazy";
  }

  // CTAs WhatsApp
  const linkEmp = waLink(emp.whatsappMsg || defaultMsg);

  const btnWhats = document.getElementById("empWhats");
  const btnWhats2 = document.getElementById("empWhats2");
  const floatWhats = document.getElementById("floatWhats");
  const navWhats = document.getElementById("navWhats");

  if (btnWhats) btnWhats.href = linkEmp;
  if (btnWhats2) btnWhats2.href = linkEmp;
  if (floatWhats) floatWhats.href = linkEmp;

  // CTA genérico no nav
  if (navWhats) navWhats.href = waLink("Olá! Quero informações sobre os empreendimentos da FBZ.");

  // DESTAQUES
  const ul = document.getElementById("empDestaques");
  if (ul) {
    const itens = Array.isArray(emp.destaques) ? emp.destaques : [];
    ul.innerHTML = itens.length
      ? itens.map((d) => `<li>${d}</li>`).join("")
      : `<li>Consulte nossos especialistas para detalhes técnicos.</li>`;
  }

  // FAQ
  const faqWrap = document.getElementById("empFAQ");
  if (faqWrap) {
    const faqList = Array.isArray(emp.faq) ? emp.faq : [];

    faqWrap.innerHTML = faqList.length
      ? faqList
          .map(
            (item) => `
        <details class="card" style="padding:14px 16px; margin-bottom: 8px;">
          <summary style="cursor:pointer; list-style:none; font-weight:650; outline:none;">
            <span style="display:inline-block; width:100%;">${item.q || ""}</span>
          </summary>
          <p style="margin-top:10px; font-size: 0.95rem; opacity: 0.8;">${item.a || ""}</p>
        </details>
      `
          )
          .join("")
      : `<p style="opacity:0.6">Consulte nossos especialistas para detalhes técnicos.</p>`;
  }

  // ETAPAS RELACIONADAS
  const etapas = document.getElementById("empEtapas");
  if (etapas) {
    const list = Array.isArray(emp.etapasRelacionadas) ? emp.etapasRelacionadas : [];

    if (list.length) {
      etapas.innerHTML = list
        .map(
          (x) => `
        <a class="card" style="padding:14px 16px; min-height:100px; justify-content:center;"
           href="/src/empreendimentos/${x.slug}.html">
          <strong style="color:var(--accent);">${x.nome || "Ver empreendimento"}</strong>
          <div style="color:var(--muted); font-size:0.85rem; margin-top:4px;">Ver detalhes →</div>
        </a>
      `
        )
        .join("");
    } else {
      // se não tiver etapas, oculta a seção inteira
      const section = etapas.closest(".section");
      if (section) section.style.display = "none";
    }
  }
})();
