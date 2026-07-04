import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070A12",
          900: "#0B1020",
          850: "#101629",
          800: "#151D33",
          700: "#202A45"
        },
        accent: {
          400: "#28E0B9",
          500: "#16C9A8",
          600: "#0FA78D"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(40, 224, 185, 0.14), 0 24px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
