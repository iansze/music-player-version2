/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        sliderRight: "sliderRight 0.5s ease-in-out",
      },
      keyframes: {
        sliderRight: {
          "0%": { opacity: 0, transform: "translateX(-20%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
    plugins: [],
  },
};
