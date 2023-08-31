/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Poppins', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        'blue': '#2F527B',
        'violet': '#6066D0CC',
        'yellow': '#F9A826',
        'red': '#EA8282',
        'green': '#60BF88',
        'blue-900': '#1D355D'
      },
    },
    
  },
  plugins: [],
}

