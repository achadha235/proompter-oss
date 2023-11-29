import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import "../styles/globals.css";
import themes from "../themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // Decorator to change the theme
    (Story, context) => {
      const { theme: themeKey } = context.globals;
      const updateTheme = (themeName) => {
        const html = document.getElementsByTagName("html")[0];
        html.setAttribute("data-theme", themeName);
      };
      useEffect(() => {
        updateTheme(context.globals.theme);
      }, [themeKey]);

      return <Story />;
    },
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      // Default value based on the "prefers-color-scheme" media query
      defaultValue: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      toolbar: {
        // The label to show for this toolbar item
        title: "Theme",
        icon: "circlehollow",
        // Array of plain string values or MenuItem shape (see below)
        items: themes,
        showName: true,
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
