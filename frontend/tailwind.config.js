 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    boxShadow: {
        '3xl': '0 4px 8px 0 rgba(0, 0, 0, 0.3)',
      }
  },
 },
 plugins: [
  // require('@tailwindcss/line-clamp')
  ],
  }
