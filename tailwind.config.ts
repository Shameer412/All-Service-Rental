import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2200px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        afacad: ["var(--font-afacad)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      // Includes custom nav and typography scale
      fontSize: {
        'nav-link': ['22px', { lineHeight: '49px', letterSpacing: '-0.01em' }],
        'h1': ['40px', { lineHeight: '56px' }],
        'h2': ['32px', { lineHeight: '38px' }],
        'h3': ['24px', { lineHeight: '28px' }],
        'text-lg': ['18px', { lineHeight: '21px' }],
        'text-md': ['16px', { lineHeight: '19px' }],
        'text-sm': ['14px', { lineHeight: '16px' }],
        'text-xs': ['12px', { lineHeight: '14px' }],
        'text-xxs': ['10px', { lineHeight: '12px' }],
      },
      colors: {
        // Brand Colors from image_fc234d.png
        primary: "#001C2F",
        secondary: "#28A745",
        brandBlack: "#050505",
        brandDarkBg: "#050E1B", // Main background from CSS data
        error: "#E0241A",
        // Gray Scale shades
        gray: {
          700: "#727272",
          600: "#86878A",
          500: "#AFAFAF",
          300: "#E9E9EA",
          100: "#E9E9EA", // Note: image shows 100 and 300 same hex
        },
      },
      borderRadius: {
        'brand': '16px', // From your CSS data
      }
    },
  },
  plugins: [],
};
export default config;
