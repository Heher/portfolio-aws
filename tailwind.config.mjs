/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sofia Sans Semi Condensed"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
