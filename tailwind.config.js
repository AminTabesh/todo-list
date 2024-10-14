/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "logo-primary": "#BE0182",
        "logo-primary-light": "#eb00a0",
        "logo-primary-dark": "#a60071",
        "bg-color": "#faf5f8",
      },
      keyframes: {
        enter: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        exit: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.8)" },
        },
      },
      animation: {
        enter: "enter 0.1s ease-out forwards",
        exit: "exit 0.1s ease-in forwards",
      },
    },
  },
  plugins: [],
};
