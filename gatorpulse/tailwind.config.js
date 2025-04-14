/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0021A5',     // UF Blue
        secondary: '#FA4616',   // UF Orange
        background: '#FFFFFF',  // White
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0021A5',     // UF Blue
          secondary: '#FA4616',   // UF Orange
          accent: '#FA4616',      // Optional: reuse orange
          neutral: '#3D4451',
          'base-100': '#FFFFFF',  // Background color
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
}

