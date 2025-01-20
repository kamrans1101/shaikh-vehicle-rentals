import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/custom-layout/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: `#000`,
        secondary: '#7EACB5',
        tertiary: '#FADFA1',
        quaternary: '#C96868'
      },
    },
  },
  plugins: [],
} satisfies Config;
