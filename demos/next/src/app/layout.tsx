"use client";
import "@proompter/react/styles/global";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import "./globals.css";

const allThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();
  const [themeNumber, setThemeNumber] = useLocalStorage(
    "currentTheme",
    allThemes.indexOf("dark")
  );

  return (
    <html
      onKeyUp={(e) => {
        if (e.key == "t" && e.ctrlKey) {
          setThemeNumber((themeNumber + 1) % allThemes.length);
        }
      }}
      lang="en"
      data-theme={allThemes[themeNumber]}
    >
      <body>
        {isClient ? (
          children
        ) : (
          <div className="w-screen h-screen flex justify-center items-center">
            <div className=" loading-spinner loading" />
          </div>
        )}
      </body>
    </html>
  );
}
