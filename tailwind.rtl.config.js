const defaultTheme = require('tailwindcss/defaultTheme'); //https://github.com/saadeghi/daisyui/issues/890#issuecomment-1165326225
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html,js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js", 
    "node_modules/react-daisyui/dist/**/*.js']",
    
    "./src/app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //https://github.com/saadeghi/daisyui/issues/890#issuecomment-1165326225
      fontFamily: {
        sans: ['Cairo', ...defaultTheme.fontFamily.sans],
      }
    }  
  },
  plugins: [
    require("tailwindcss-flip"),
    require("daisyui"), 
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    // themes: ["dracula", "luxury", "cmyk", "autumn",  ],
    themes: [
      { snapdark: {
          "primary": "#2AFFC0",      
          "secondary": "#BF95F9",
          "accent": "#FFB86B",
          "neutral": "#414558",
          // "base-200": "#ff0000",
          "base-100": "#272935", //#272935 #09010f #0d091a
          "info": "#8BE8FD",     
          "success": "#52FA7C",   
          "warning": "#F1FA89",
          "error": "#FF5757",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "snapdark",
  }
}
