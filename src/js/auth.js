// src/js/auth.js

// CONFIGURAÇÃO DO SUPABASE (Quando você tiver as chaves)
/*
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'SUA_URL_SUPABASE';
const supabaseKey = 'SUA_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);
*/

export function initAuth() {
  const loginBtn = document.getElementById('btnLogin');
  const userArea = document.getElementById('userArea');

  if (!loginBtn || !userArea) return;

  // Verifica se já tem usuário (Simulado)
  const savedUser = localStorage.getItem('fbz_user');
  if (savedUser) {
    showUser(JSON.parse(savedUser));
  } else {
    showLoginBtn();
  }

  // Ação de Login
  loginBtn.addEventListener('click', async () => {
    // --- MODO REAL (Supabase) ---
    /*
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    */

    // --- MODO SIMULADO (Para você testar o design agora) ---
    console.log("Iniciando login Google...");
    
    // Simula delay de rede
    loginBtn.innerHTML = "Autenticando...";
    setTimeout(() => {
      const mockUser = {
        name: "Visitante FBZ",
        avatar: "https://i.pravatar.cc/150?img=3", // Avatar aleatório
        email: "visitante@gmail.com"
      };
      
      localStorage.setItem('fbz_user', JSON.stringify(mockUser));
      showUser(mockUser);
      alert("Login realizado com sucesso! (Modo Simulação)");
    }, 1500);
  });
}

function showUser(user) {
  const loginBtn = document.getElementById('btnLogin');
  const userArea = document.getElementById('userArea');
  
  // Esconde botão login
  if(loginBtn) loginBtn.style.display = 'none';

  // Mostra área do usuário
  userArea.innerHTML = `
    <div class="user-profile" title="Sair">
      <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
      <span class="user-name">${user.name.split(' ')[0]}</span>
    </div>
  `;

  // Logout ao clicar
  userArea.querySelector('.user-profile').addEventListener('click', () => {
    if(confirm("Deseja sair?")) {
      localStorage.removeItem('fbz_user');
      window.location.reload();
    }
  });
}

function showLoginBtn() {
  const loginBtn = document.getElementById('btnLogin');
  if(loginBtn) {
    loginBtn.style.display = 'flex';
    loginBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
      Entrar
    `;
  }
}