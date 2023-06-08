/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      // pattern: /grid-cols-\[repeat\(([1-9]|1[0-2]),\_minmax\(0,\_1fr\)\)\_([1-9]|[1-9][0-9]|[1-9][0-9][0-9])px\]/
      pattern: /^grid-cols-.*/
    }
  ]

}

