import React from "react";
import "../styles/globals.css";

const getSystemThemePreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const globalTypes = {
  theme: {
    description: "Global theme for components",
    defaultValue: getSystemThemePreference(),
    toolbar: {
      // The label to show for this toolbar item
      title: "Theme",
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const withTheme = (Story: any, context) => {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  const updateTheme = (themeName) => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(themeName + "-theme");
  };

  // only recompute the theme if the themeKey changes

  return <Story />;
};

export const decorators = [withTheme];
