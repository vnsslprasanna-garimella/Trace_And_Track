/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // sleek blue
        background: '#0f172a', // dark slate
        surface: '#1e293b', // lighter slate
        accent: '#10b981', // emerald
      },
    },
  },
  plugins: [],
}
