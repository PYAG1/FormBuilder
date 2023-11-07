/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1c1d1e",
        secondary:"#2dcda1",
        tetiary:"#e8ebf0",
        ash:"#767777",
        paleyellow:"#faedcd",
        background:"#f8f8f9",
        paleBlue:"#d4edf9",
        palePink:"#fee0f1",
        paleGreen:"#c1f1e2",

    
        card:"#f1f0f0"
      }
    },
  },
  plugins: [],
}