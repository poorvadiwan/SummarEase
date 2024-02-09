/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
