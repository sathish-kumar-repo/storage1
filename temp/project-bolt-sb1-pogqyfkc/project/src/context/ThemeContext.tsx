import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeOption } from "../types";
import { themes } from "../data/themes";

interface ThemeContextType {
  currentTheme: ThemeOption;
  setTheme: (themeId: string) => void;
  themes: ThemeOption[];
  isThemeSelectorOpen: boolean;
  toggleThemeSelector: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(themes[0]);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme and dark mode from localStorage on initial render
  useEffect(() => {
    const savedThemeId = localStorage.getItem("themeId");
    if (savedThemeId) {
      const savedTheme = themes.find((theme) => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }

    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true");
    } else {
      // Check if user prefers dark mode
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Set theme variables in CSS
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      currentTheme.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      currentTheme.secondary
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      currentTheme.accent
    );
    document.documentElement.style.setProperty(
      "--color-success",
      currentTheme.success
    );
    document.documentElement.style.setProperty(
      "--color-warning",
      currentTheme.warning
    );
    document.documentElement.style.setProperty(
      "--color-error",
      currentTheme.error
    );

    // Set background and text based on dark mode
    if (isDarkMode) {
      document.documentElement.style.setProperty(
        "--color-background",
        themes.find((theme) => theme.id === "night-mode")?.background ||
          "#111827"
      );
      document.documentElement.style.setProperty(
        "--color-text",
        themes.find((theme) => theme.id === "night-mode")?.text || "#F9FAFB"
      );
    } else {
      document.documentElement.style.setProperty(
        "--color-background",
        currentTheme.background
      );
      document.documentElement.style.setProperty(
        "--color-text",
        currentTheme.text
      );
    }

    // Save to localStorage
    localStorage.setItem("themeId", currentTheme.id);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [currentTheme, isDarkMode]);

  const setTheme = (themeId: string) => {
    const newTheme = themes.find((theme) => theme.id === themeId);
    if (newTheme) {
      setCurrentTheme(newTheme);
    }
  };

  const toggleThemeSelector = () => {
    setIsThemeSelectorOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        isThemeSelectorOpen,
        toggleThemeSelector,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
