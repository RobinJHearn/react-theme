/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--main-background))",
        text: "rgba(var(--main-text))",
        button: "rgba(var(--main-button))",
        buttonhover: "rgba(var(--button-hover))",
      },
    },
  },
  plugins: [],
};
