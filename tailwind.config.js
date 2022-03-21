module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Amiri", "serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        white: "var(--color-white)",
        grey: "var(--color-grey)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
