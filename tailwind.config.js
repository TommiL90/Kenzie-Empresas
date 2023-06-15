/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    screens: {
      xs: "320px",
      // => @media (min-width: 320px) { ... }

      sm: "480px",
      // => @media (min-width: 480px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px"
      // => @media (min-width: 1200px) { ... }
      // "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
      // "3xl": "1600px"
      // => @media (min-width: 1400px) { ... }
    },
    colors: {
      "color-brand-1": "#0000ff",
      "color-brand-2": "#3532ff",
      "color-success": "#36b37e",
      "color-error": "#ff5630",
      "color-warning": "#ffab00",
      "color-grey-1": "#212529",
      "color-grey-2": "#495057",
      "color-grey-3": "#adb5bd",
      "color-grey-4": "#e9ecef",
      "color-grey-5": "#f1f3f5",
      "color-grey-6": "#ffffff"
    },
    extend: {
      boxShadow: {
        default: "0px 11px 17px -6px #00000029"
      },
      transitionProperty: {
        default: "all"
      },
      transitionDuration: {
        default: "300ms"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
