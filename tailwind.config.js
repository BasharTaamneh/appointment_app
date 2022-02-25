module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation:{
        blob:"blob 10s infinite"
      },
      keyframes:{
        blob:{
          "0%":{
            transform: "translate(0px, 0px) scale(1.1)"
          },
          "33%":{
            transform: "translate(50px, -50px) scale(1.4)"
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.6)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1.1)"
          },
        }
      }
    },
  },
  plugins: [],
}
