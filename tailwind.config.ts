import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: '#030712',
        cyber: '#00f5ff',
        magenta: '#ff1f8f',
        violet: '#7f5af0'
      },
      boxShadow: {
        glow: '0 0 20px rgba(127, 90, 240, 0.45)'
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at top, rgba(127,90,240,0.18), transparent 55%), radial-gradient(circle at bottom, rgba(0,245,255,0.12), transparent 60%)'
      }
    }
  },
  plugins: []
} satisfies Config;
