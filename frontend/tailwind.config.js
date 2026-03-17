/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b', // 琥珀色，新中式暖色调
        secondary: '#d97706', // 深琥珀色
        accent: '#ec4899', // 玫瑰色，温柔感
        dark: '#1f2937',
      },
    },
  },
  plugins: [],
}