import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#C73E9C",
          50: "#fdf2f9",
          100: "#fce7f5",
          200: "#fbcfec",
          300: "#f8a8dc",
          400: "#f272c4",
          500: "#C73E9C",
          600: "#b02d87",
          700: "#92246f",
          800: "#79205c",
          900: "#661e4e",
          950: "#3f0b2e",
        },
        accent: "#80E0DC",
        default: "#C73E9C",
      },
    },
  },
  plugins: [],
} satisfies Config;
