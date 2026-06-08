/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petlife: {
          primary: '#21878F',
          'primary-dark': '#1A6E75',
          'primary-light': '#E8F4F5',
          coral: '#F3705C',
          'coral-dark': '#D95A47',
          ochre: '#D4A757',
          'ochre-dark': '#B8903E',
          dark: '#1A2A3A',
          mid: '#4A5568',
          light: '#F7F9FA',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(33, 135, 143, 0.12)',
        'card-hover': '0 4px 20px rgba(33, 135, 143, 0.2)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
}
