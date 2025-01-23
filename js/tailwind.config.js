// Configuration de TailwindCSS

module.exports = {
  content: [
    "./*.html",
    "./js/*.js",
    "./css/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6a5acd", // Couleur violette principale
        secondary: "#48d1cc", // Couleur turquoise secondaire
        progressGreen: "#32cd32", // Vert pour les barres de progression
      },
      fontFamily: {
        baamix: ["Comic Sans MS", "cursive", "sans-serif"],
      },
      borderRadius: {
        custom: "1rem",
      },
      boxShadow: {
        focus: "0 4px 6px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};