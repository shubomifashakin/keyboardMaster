/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['"Teachers", sans-serif'] },
      animation: {
        flash: "flash .5s ease-in-out",
        flasInfinite: "flash2 .75s ease-in-out infinite",
      },

      keyframes: {
        flash2: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.4 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
