import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#cedfa6',
          300: '#9cbf4d',
        },
        pampas: '#f4f3ee',
        merino: '#f4f1de',
        black: '#1F2024',
      },
    },
  },
  plugins: [],
};
export default config;
