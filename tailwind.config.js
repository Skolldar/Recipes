/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "header" : "url('/bg.webp')"
      } 
    },
  },
  plugins: [],
}

