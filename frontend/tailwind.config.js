// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your setup
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0c0c1e",
          card: "#161629",
        },
        text: {
          light: "#ffffff",
          muted: "#a1a1aa",
        },
        accent: "#ec4899", // pink
      },
    },
  },
  plugins: [],
};
