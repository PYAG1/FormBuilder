/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#3bd85e",
        text:"#14324f",
        tet:"#065f89",
        tet2:"#0890b1",
        ashbg:"#eeeff0"
      }
    },
  },
  plugins: [],
}