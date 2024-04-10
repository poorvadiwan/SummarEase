import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--primary-font)"],
        secondary: ["var(--secondary-font)"],
      },
      colors: {
        primary: "var(--primary-color)",
        dark: "var(--dark-color)",
        light: "var(--light-color)",
      },
    },
  },
  plugins: [],
};
export default config;
