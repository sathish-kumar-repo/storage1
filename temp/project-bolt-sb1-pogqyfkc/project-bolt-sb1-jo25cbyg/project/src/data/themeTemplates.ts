import { ThemeTemplate } from '../types/theme';

export const themeTemplates: ThemeTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional blue-based design',
    colors: {
      light: {
        primary: '#2563EB',
        secondary: '#0891B2',
        accent: '#6D28D9',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        background: '#ffffff',
        text: '#1F2937'
      },
      dark: {
        primary: '#3B82F6',
        secondary: '#06B6D4',
        accent: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        background: '#111827',
        text: '#F9FAFB'
      }
    }
  },
  {
    id: 'nature-inspired',
    name: 'Nature Inspired',
    description: 'Organic and calming earth tones',
    colors: {
      light: {
        primary: '#059669',
        secondary: '#92400E',
        accent: '#B45309',
        success: '#065F46',
        warning: '#D97706',
        error: '#DC2626',
        background: '#ffffff',
        text: '#1F2937'
      },
      dark: {
        primary: '#10B981',
        secondary: '#D97706',
        accent: '#F59E0B',
        success: '#059669',
        warning: '#F59E0B',
        error: '#EF4444',
        background: '#111827',
        text: '#F9FAFB'
      }
    }
  },
  // Add more templates here...
];