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
        primary: '#10B981',    // Green
        secondary: '#3B82F6',  // Blue
        accent: '#F59E0B',     // Amber
        danger: '#EF4444',     // Red
        success: '#10B981',    // Green
        warning: '#F59E0B',    // Amber
      },
    },
  },
  plugins: [],
};
export default config;
