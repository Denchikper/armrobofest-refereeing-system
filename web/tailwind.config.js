/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          FuturaPT_Heavy: ['FuturaPT_Heavy'],
          FuturaPT_Book: ['FuturaPT_Book'],
          FuturaPT_Light: ['FuturaPT_Light'],
          FuturaPT_Medium: ['FuturaPT_Medium'],
          FuturaPT_ExtraBold: ['FuturaPT_ExtraBold'],
          FuturaPT_Bold: ['FuturaPT_Bold'],
          FuturaPT_Demi: ['FuturaPT_Demi'],
      },  
    },
  },
  plugins: [],
}