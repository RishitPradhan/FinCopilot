/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'neon-green': '#00ff88',
        'purple-accent': '#7c3aed',
        'dark-gray': '#1a1a1a',
        'light-gray': '#f5f5f5'
      },
      fontFamily: {
        'sharp': ['Poppins', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-out'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideInRight': {
          '0%': { transform: 'translateX(500px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slideOutRight': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(500px)', opacity: '0' }
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 136, 0.5)'
      }
    }
  },
  plugins: []
}
