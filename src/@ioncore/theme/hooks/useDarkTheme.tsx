import { useState } from "react";

export default function useDarkTheme(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  // Check if the user has set a color scheme preference for dark on their device
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDark = media.matches;

  const [isDark, setIsDark] = useState(prefersDark);
  media.addEventListener("change", (e) => {
    setIsDark(e.matches);
  });

  return [isDark, setIsDark];
}