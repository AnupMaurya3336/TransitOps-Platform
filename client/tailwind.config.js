/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#EC4899",
        accent: "#F59E0B",
        success: "#10B981",
        background: "#F8F7F4",
        surface: "#FFFDF8",
        dark: "#2D3748",
        muted: "#6B7280",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      borderRadius: {
        xl2: "20px",
      },

      boxShadow: {
        card: "0 15px 40px rgba(124,58,237,.12)",
      },
    },
  },
  plugins: [],
};