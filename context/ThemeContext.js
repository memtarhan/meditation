import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      const themePreference = await AsyncStorage.getItem("themePreference");
      setIsDarkTheme(themePreference === "dark");
    };
    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(!isDarkTheme);
    await AsyncStorage.setItem("themePreference", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};