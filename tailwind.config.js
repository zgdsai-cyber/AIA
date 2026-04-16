/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#d4af37',
        accent: '#f5f5f5',
        danger: '#e74c3c',
      },
      fontFamily: {
        'arabic': ['Poppins', 'Arial', 'sans-serif'],
      },
      direction: ['rtl', 'ltr'],
    },
  },
  plugins: [],
};
