import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../contexts/ThemeContext";

export default function ThemeContextWrapper({ children }) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    if (theme === themes.light) {
      document.body.classList.add("white-content");
    } else if (theme === themes.dark) {
      document.body.classList.remove("white-content");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
