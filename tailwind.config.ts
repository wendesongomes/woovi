import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#4D4D4D",
        "light-gray": "#B2B2B2",
        "lighter-gray": "#AFAFAF",
        "deep-blue": "#133A6F",
        "soft-gray": "#E5E5E5",
        "mint-green": "#03D69D",
        "pale-gray": "#E5E5E5",
      },
    },
  },
  plugins: [],
};
export default config;
