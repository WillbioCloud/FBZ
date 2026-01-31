// src/js/blog-post.js
import { FBZ_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Identifica o Post pelo SLUG na URL
  const params = new URLSearchParams(window.location.search);
  const currentSlug = params.get('slug');

  if (!currentSlug || !FBZ_DATA.blog) {
    window.location.href = '/src/blog.html'; // Redireciona se inválido
    return;
  }

  const post = FBZ_DATA.blog.find(p => p.slug === currentSlug);
  if (!post) {
    document.querySelector('main').innerHTML = "<div class='container' style='padding:100px; text-align:center;'><h1>Post não encontrado</h1><a href='/src/blog.html' class='btn btn--primary'>Voltar</a></div>";
    return;
  }

  // 2. Renderiza Conteúdo Estático
  document.title = `${post.titulo} | FBZ Blog`;
  document.getElementById('postCategory').textContent = post.categoria;
  document.getElementById('postTitle').textContent = post.titulo;
  document.getElementById('postDate').textContent = post.data;
  document.getElementById('postAuthor').textContent = post.autor;
  document.getElementById('postImage').src = post.thumb;
  document.getElementById('postContent').innerHTML = post.conteudo;

  // 3. Sistema de Visualizações (Persistência Local)
  const viewKey = `fbz_views_${currentSlug}`;
  let views = parseInt(localStorage.getItem(viewKey) || post.views);
  // Incrementa visualização na sessão (simulação)
  if(!sessionStorage.getItem(`viewed_${currentSlug}`)) {
    views++;
    localStorage.setItem(viewKey, views);
    sessionStorage.setItem(`viewed_${currentSlug}`, 'true');
  }
  document.getElementById('postViews').textContent = views;

  // 4. Sistema de Likes
  const likeBtn = document.getElementById('btnLike');
  const likeCountEl = document.getElementById('likeCount');
  const likeKey = `fbz_liked_${currentSlug}`;
  let likes = parseInt(localStorage.getItem(`fbz_likes_count_${currentSlug}`) || post.likes);
  
  // Estado inicial
  likeCountEl.textContent = likes;
  if(localStorage.getItem(likeKey)) {
    likeBtn.classList.add('active');
  }

  likeBtn.addEventListener('click', () => {
    const isLiked = likeBtn.classList.contains('active');
    if (isLiked) {
      likes--;
      likeBtn.classList.remove('active');
      localStorage.removeItem(likeKey);
    } else {
      likes++;
      likeBtn.classList.add('active');
      localStorage.setItem(likeKey, 'true');
    }
    likeCountEl.textContent = likes;
    localStorage.setItem(`fbz_likes_count_${currentSlug}`, likes);
    
    // Animaçãozinha
    const icon = likeBtn.querySelector('svg');
    icon.style.transform = "scale(1.4)";
    setTimeout(() => icon.style.transform = "scale(1)", 200);
  });

  // 5. Compartilhamento Social
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.titulo);

  document.getElementById('shareWhatsapp').href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
  document.getElementById('shareLinkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
  
  document.getElementById('shareCopy').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('shareCopy');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span style="font-size:0.8rem">Copiado!</span>`;
    setTimeout(() => btn.innerHTML = originalHTML, 2000);
  });

  // 6. Sistema de Comentários (Local)
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  const commentCountEl = document.getElementById('commentCount');
  const commentsKey = `fbz_comments_${currentSlug}`;
  
  // Carregar comentários salvos
  const savedComments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
  
  function renderComments() {
    commentCountEl.textContent = savedComments.length;
    if (savedComments.length === 0) {
      commentsList.innerHTML = `<p style="color:rgba(255,255,255,0.4); font-style:italic;">Seja o primeiro a comentar!</p>`;
      return;
    }
    commentsList.innerHTML = savedComments.map(c => `
      <div class="comment-item">
        <div class="comment-header">
          <span class="comment-author">${c.author}</span>
          <span>${c.date}</span>
        </div>
        <p>${c.text}</p>
      </div>
    `).join('');
  }
  
  renderComments();

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('commentInput').value;
    if(!text) return;

    // Simula usuário logado ou "Visitante"
    const user = JSON.parse(localStorage.getItem('fbz_user')) || { name: 'Visitante' };
    
    const newComment = {
      author: user.name,
      text: text,
      date: new Date().toLocaleDateString()
    };

    savedComments.unshift(newComment); // Adiciona no topo
    localStorage.setItem(commentsKey, JSON.stringify(savedComments));
    
    document.getElementById('commentInput').value = '';
    renderComments();
  });

  // 7. Posts Relacionados
  const relatedGrid = document.getElementById('relatedGrid');
  const related = FBZ_DATA.blog.filter(p => p.slug !== currentSlug).slice(0, 3);
  
  relatedGrid.innerHTML = related.map(p => `
    <article class="blog-card">
      <img src="${p.thumb}" class="blog-thumb">
      <div class="blog-body">
        <div class="blog-meta"><span>${p.categoria}</span></div>
        <h3 class="blog-title" style="font-size:1.1rem">${p.titulo}</h3>
        <div class="blog-footer">
          <a href="/src/blog-post.html?slug=${p.slug}" class="read-more">Ler artigo →</a>
        </div>
      </div>
    </article>
  `).join('');

  // Animações de Entrada
  if(window.gsap && window.SplitType) {
    const splitTitle = new SplitType('.split-animate', { types: 'chars, words' });
    window.gsap.from('.split-animate .char', {
      opacity: 100, x: -20, rotateX: -90, stagger: 0.02, duration: 1, ease: 'power3.out'
    });
    
    window.gsap.from('.reveal-card', {
      x: 30, opacity: 100, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2
    });
  }
});