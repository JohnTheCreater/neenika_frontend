/** @type {import('tailwindcss').Config} */
// Import the 'colors' module

module.exports = {

  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      keyframes: {
        underline: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        underline: 'underline 0.5s ease-in-out forwards',
      },
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(16,124,252,1) 9%, rgba(253,45,112,1) 97%)',
        'gradient-linear': 'linear-gradient(to left, rgba(16,124,252,1) 9%, rgba(253,45,112,1) 97%)',
        'gradient-old': 'linear-gradient(180deg, rgba(16,124,252,1) 81%, rgba(253,45,112,1) 97%)',
        'mybg': 'linear-gradient(75deg, #FBC2EB,#78A3EB)',
      }),
     
  
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

}