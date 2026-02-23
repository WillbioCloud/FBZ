/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}", // <--- Garante que ele lê o index.tsx na raiz
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f2b46', // Azul marinho (tom de confiança/construtora)
          light: '#1a4168',
          dark: '#081726',
        },
        secondary: {
          DEFAULT: '#f5f5f4',
          light: '#ffffff',
          dark: '#e7e5e4',
        },
        accent: {
          DEFAULT: '#d4a017', // Dourado luxo
          light: '#e5b83b',
          dark: '#b3860f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}