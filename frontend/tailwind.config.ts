import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        line: "var(--line)",
        muted: "var(--muted)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "8px",
        sm: "6px",
      },

      boxShadow: {
        soft: "0 1px 2px rgba(0, 0, 0, 0.04)",
        elevated:
          "0 8px 30px rgba(0, 0, 0, 0.06)",
      },
    },
  },

  plugins: [],
};

export default config;