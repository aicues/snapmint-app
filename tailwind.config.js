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
        // sans: ['Cairo', ...defaultTheme.fontFamily.sans],
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
      }
    }  
  },
  plugins: [
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
      {
        'snap-take-2': {
           'primary' : '#DBC5F1',
           'primary-focus' : '#ffffff',
           'primary-content' : '#09020D',

           'secondary' : '#8721BB',
           'secondary-focus' : '#B55AE2',
           'secondary-content' : '#09020D',

           'accent' : '#2AFFC0',
           'accent-focus' : '#80FFD9',
           'accent-content' : '#09020D',

           'neutral' : '#030104',
           'neutral-focus' : '#430F61',
           'neutral-content' : '#d5ccff',

          //  'base-100' : '#1e0f30',
          //  'base-200' : '#100416',
          //  'base-300' : '#09020D',
          'base-100' : '#320D45',
           'base-200' : '#1e0f30',
           'base-300' : '#100517',
           'base-content' : '#ffffff',

           'info' : '#1c92f2',
           'success' : '#00CC8F',
           'warning' : '#ff9900',
           'error' : '#ff5724',

          '--rounded-box': '1rem',          
          '--rounded-btn': '0.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '0.25s',       
          '--animation-input': '0.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '0.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "snap-take-2",
  }
}
