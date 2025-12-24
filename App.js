import "expo-router/entry";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      {/* Expo Router will handle the navigation */}
    </ThemeProvider>
  );
};

export default App;