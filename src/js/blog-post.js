// src/js/blog-post.js

// MUDANÇA: Importa do novo arquivo de blog
import { BLOG_DATA } from "./data-blog.js"; 

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId || !BLOG_DATA) return;

  const post = BLOG_DATA.find((p) => p.id == postId);

  if (post) {
    // Preenche os campos da página de post (assumindo que o HTML tem esses IDs)
    const titleEl = document.getElementById("postTitle");
    const contentEl = document.getElementById("postContent");
    const heroEl = document.getElementById("postHero");
    const dateEl = document.getElementById("postDate");

    if(titleEl) {
        document.title = `${post.titulo} | Blog FBZ`;
        titleEl.textContent = post.titulo;
    }
    if(contentEl) contentEl.innerHTML = post.conteudo;
    if(heroEl) heroEl.src = post.thumb;
    if(dateEl) dateEl.textContent = `${post.data} • ${post.readTime} de leitura`;
  }
});