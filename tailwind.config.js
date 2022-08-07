/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#232c33',
        white: '#ffffff',
        yellow: '#f3b61f',
        orange: '#d68b54',
        teal: '#5a7d7c',
        pink: '#b95f89',
        darkpink: '#ba5f7f'
      },
    },
    screens: {
      xs: '350px',
      sm: '500px'
    }
  },
  plugins: [],
}
