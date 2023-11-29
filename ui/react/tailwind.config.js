/** @type {import('tailwindcss').Config} */

import themes from "./themes";

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "ai-",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("daisyui"),
  ],
  daisyui: {
    themes,
  },
};
