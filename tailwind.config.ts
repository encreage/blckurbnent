import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        gold: {
          DEFAULT: "#D4A017",      // your ember-gold – main accent
          dark: "#B8860B",         // deeper for hovers/shadows
          light: "#E8D5A3",        // subtle highlights / tooltips
          metallic: "#FFD700",     // brighter for strong pops (logo shine)
        },
        "off-white": "#F5F5F5",
      },
      borderWidth: {
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
      },
      boxShadow: {
        "gold-glow": "0 0 35px rgba(212, 160, 23, 0.5)",         // soft logo shine
        "gold-glow-strong": "0 0 50px rgba(212, 160, 23, 0.7)",  // intense hover
      },
      dropShadow: {
        "gold-text": "0 4px 20px rgba(212, 160, 23, 0.4)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      keyframes: {
          shimmer: {
            "100%": { transform: "translateX(100%)" },
          },
        },
        animation: {
          shimmer: "shimmer 2.5s infinite",
        },
    },
  },
  plugins: [animate],
};

export default config;