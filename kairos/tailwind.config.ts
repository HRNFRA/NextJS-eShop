/** import type { Config } from "tailwindcss"; */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#588E3A",
        "secondary": "#00e0ff",
        "accent": "#e55b00",
        "neutral": "#1d1e13",
        "base-100": "#fcfcfc",                
        "info": "#008bff",
        "success": "#00b958",                
        "warning": "#E26D5C",
        "error": "#ff71a4",
        body: {
          "background-color" : "#e3e6e6"
        },
        },
      },
    ],
  },
};
// export default config;
