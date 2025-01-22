/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#333738",
        light: "#B4B5BE",
        medium: "#635B6C",
        primary: "#2e537f",
        secondary: "#c52c1f",
        accent: "#febf00",
        bg_secondary: "#fbf7f2",
      },
    },
  },
  plugins: [],
};
