export interface Tutorial {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  steps: number;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}