/** @type {import('tailwindcss').Config} */

/* eslint-disable */
import themes from "./themes";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import daisyUI from "daisyui";

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "ai-",
  theme: {
    extend: {},
  },
  plugins: [
    forms({ strategy: "class" }),
    typography,
    containerQueries,
    daisyUI,
  ],
  daisyui: {
    themes,
  },
};
