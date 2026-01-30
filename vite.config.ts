// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Liste aqui todas as páginas internas
        cidadeInteligente: resolve(__dirname, 'src/empreendimentos/cidade-inteligente.html'),
        cidadeUniversitaria: resolve(__dirname, 'src/empreendimentos/cidade-universitaria.html'),
        reservaDaMata: resolve(__dirname, 'src/empreendimentos/reserva-da-mata.html'),
        setorLagoSul: resolve(__dirname, 'src/empreendimentos/setor-lago-sul.html'),
        singapuraShopping: resolve(__dirname, 'src/empreendimentos/singapura-shopping.html'),
        cidadeVerde: resolve(__dirname, 'src/empreendimentos/cidade-verde.html'),
        cidadeDasFlores: resolve(__dirname, 'src/empreendimentos/cidade-das-flores.html'),
        template: resolve(__dirname, 'src/empreendimentos/template.html'),
        // adicione as outras conforme criar...
      }
    }
  }
})