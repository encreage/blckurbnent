/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
      },
      borderWidth: {
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};