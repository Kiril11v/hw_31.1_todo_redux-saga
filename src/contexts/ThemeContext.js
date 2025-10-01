import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  // инициализация из localStorage сразу при создании состояния
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // применяем класс к body
    document.body.className = theme === "light" ? "bg-light text-dark" : "bg-dark text-light";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

    return React.createElement(
        ThemeContext.Provider, 
        { value: { theme, toggleTheme } },
        children
    );
}


