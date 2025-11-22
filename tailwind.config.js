/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        // Energetic Obsidian Design System
        obsidian: {
          base: "#050505", // Near Black, warmer than pure black
          surface: "#111111", // Cards with 2% white overlay
          elevated: "#1a1a1a", // Elevated surfaces
        },
        azure: {
          DEFAULT: "#2563EB", // Electric Azure - Primary Accent
          glow: "rgba(37, 99, 235, 0.5)",
          light: "rgba(37, 99, 235, 0.1)",
        },
        text: {
          heading: "#EDEDED", // Never pure white for headings
          body: "#A1A1AA", // Zinc-400 for body text
          muted: "#71717A", // Zinc-500 for muted text
        },
      },
      fontFamily: {
        sans: [
          "Geist Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Georgia", "serif"],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.03em",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "aurora": "aurora 20s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.95)" },
        },
        "aurora": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            opacity: "0.2",
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            opacity: "0.25",
          },
        },
      },
      boxShadow: {
        "spotlight": "0 0 20px -5px rgba(37, 99, 235, 0.5)",
        "spotlight-strong": "0 0 30px -5px rgba(37, 99, 235, 0.7)",
      },
    },
  },
  plugins: [],
};

