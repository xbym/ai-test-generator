/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // 黑色
        secondary: '#E5E7EB', // 浅灰色,用于进度条背景
      },
    },
  },
  plugins: [],
}