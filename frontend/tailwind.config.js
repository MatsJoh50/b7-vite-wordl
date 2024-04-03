/** @type {import('tailwindcss').Config} */
module.exports = {
  // "./src/**/*.{html,js}", "./public/**/*.{html,js}",
  content: ["./src/**/*.{html,jsx}", "./src/*.{html,jsx}", "./public/*.{html,jsx}", "./*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        bars: '#34495e', //dark blue
        bg: "f5f5f5", //off-white
        menubg: '#475a70',
        incorrect: '#ef4444',
        correct: '#22c55e',
        misplaced: '#eab308',
      },
      'backgroundColor': "f5f5f5",
    },
  },
  plugins: [],
  // safelist: [{
  //     // pattern: /(bg|text|border)-(incorrect|correct|misplaced)/
  //   }
  // ],
};
