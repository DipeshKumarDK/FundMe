/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        120: "30rem",
      },
      screens: {
        wq: "450px",
        we: "350px",
        wr: "600px",
        wt: "550px"
      },
    },
  },
  plugins: [],
};
 