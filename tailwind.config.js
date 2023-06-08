/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        pizzas: "url('./src/assets/banner_pizza.jpg')",
      },
    },
  },
  plugins: [],
};
