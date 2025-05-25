import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings, ThemeMode, ThemeColors, GlassmorphismSettings, FontSettings } from '../types/theme';

interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  setMode: (mode: ThemeMode) => void;
  setColors: (colors: Partial<ThemeColors>) => void;
  setGlassSettings: (settings: Partial<GlassmorphismSettings>) => void;
  setFontSettings: (settings: Partial<FontSettings>) => void;
  resetTheme: () => void;
}

const defaultLightColors: ThemeColors = {
  primary: '#3B82F6',
  secondary: '#14B8A6',
  accent: '#F97316', 
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#ffffff',
  text: '#1F2937'
};

const defaultDarkColors: ThemeColors = {
  primary: '#60A5FA',
  secondary: '#2DD4BF',
  accent: '#FB923C',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  background: '#111827',
  text: '#F9FAFB'
};

const defaultGlassSettings: GlassmorphismSettings = {
  blur: 10,
  transparency: 0.2,
  border: 1
};

const defaultFontSettings: FontSettings = {
  size: 16,
  family: 'Inter, system-ui, sans-serif',
  weight: 400
};

const defaultTheme: ThemeSettings = {
  mode: 'light',
  colors: defaultLightColors,
  glass: defaultGlassSettings,
  font: defaultFontSettings
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  setMode: () => {},
  setColors: () => {},
  setGlassSettings: () => {},
  setFontSettings: () => {},
  resetTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('glassmorphism-theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('glassmorphism-theme', JSON.stringify(theme));
    applyThemeToDocument(theme);
  }, [theme]);

  const applyThemeToDocument = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Apply glass settings
    root.style.setProperty('--glass-blur', `${theme.glass.blur}px`);
    root.style.setProperty('--glass-transparency', theme.glass.transparency.toString());
    root.style.setProperty('--glass-border', `${theme.glass.border}px`);
    
    // Apply font settings
    root.style.setProperty('--font-size', `${theme.font.size}px`);
    root.style.setProperty('--font-family', theme.font.family);
    root.style.setProperty('--font-weight', theme.font.weight.toString());
    
    // Apply theme mode
    document.body.className = theme.mode;
  };

  const setMode = (mode: ThemeMode) => {
    setTheme(prev => ({
      ...prev,
      mode,
      colors: mode === 'light' ? defaultLightColors : defaultDarkColors
    }));
  };

  const setColors = (colors: Partial<ThemeColors>) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors }
    }));
  };

  const setGlassSettings = (settings: Partial<GlassmorphismSettings>) => {
    setTheme(prev => ({
      ...prev,
      glass: { ...prev.glass, ...settings }
    }));
  };

  const setFontSettings = (settings: Partial<FontSettings>) => {
    setTheme(prev => ({
      ...prev,
      font: { ...prev.font, ...settings }
    }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        setMode, 
        setColors, 
        setGlassSettings, 
        setFontSettings,
        resetTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};