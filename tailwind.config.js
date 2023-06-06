/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist:[
    {
      pattern:/grid-cols-([1-9](|[0-2]))/
    }
  ]
}

