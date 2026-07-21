import React, { createContext, useContext } from "react";
const colors = {
  // Backgrounds
  background: "#FAF7F2",
  card: "#FFFFFF",

  // Gold Brand
  primary: "#C9A227",
  primaryDark: "#B08D57",

  // Text
  text: "#1F1F1F",
  textSecondary: "#6B6B6B",

  // Inputs
  inputBackground: "#FFFFFF",
  border: "#E7DED2",
  placeholder: "#A8A8A8",

  // Status
  success: "#4CAF50",
  error: "#D32F2F",

  // Misc
  shadow: "rgba(0,0,0,0.08)",
};
const ThemeContext = createContext({
  colors,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
