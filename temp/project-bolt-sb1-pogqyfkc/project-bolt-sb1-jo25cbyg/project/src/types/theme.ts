export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  text: string;
}

export interface GlassmorphismSettings {
  blur: number;
  transparency: number;
  border: number;
}

export interface FontSettings {
  size: number;
  family: string;
  weight: number;
}

export interface ThemeSettings {
  mode: ThemeMode;
  colors: ThemeColors;
  glass: GlassmorphismSettings;
  font: FontSettings;
}

export interface ThemeTemplate {
  id: string;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}