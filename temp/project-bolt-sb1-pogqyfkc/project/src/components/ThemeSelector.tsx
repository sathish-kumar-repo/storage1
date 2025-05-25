import React from 'react';
import { X, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { themes, currentTheme, setTheme, isThemeSelectorOpen, toggleThemeSelector } = useTheme();

  return (
    <>
      {/* Theme Selector Button */}
      <button 
        onClick={toggleThemeSelector}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Open theme selector"
      >
        <Palette 
          size={24} 
          className="text-primary stroke-current transition-all duration-300 group-hover:rotate-12" 
          style={{ color: 'var(--color-primary)' }}
        />
      </button>

      {/* Theme Selector Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-72 md:w-80 p-6 bg-white/20 backdrop-blur-2xl border-l border-white/30 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isThemeSelectorOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Color Themes</h3>
          <button 
            onClick={toggleThemeSelector}
            className="p-2 rounded-full hover:bg-black/10 transition-colors duration-300"
            aria-label="Close theme selector"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="grid gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                currentTheme.id === theme.id 
                  ? 'border-2 shadow-lg scale-105' 
                  : 'border border-white/30 hover:scale-[1.02]'
              }`}
              style={{
                backgroundColor: `${theme.background}`,
                borderColor: theme.id === currentTheme.id ? theme.primary : '',
              }}
              onClick={() => setTheme(theme.id)}
              aria-label={`Select ${theme.name} theme`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{ color: theme.text }}>{theme.name}</span>
                {currentTheme.id === theme.id && (
                  <span 
                    className="px-2 py-1 text-xs rounded-full" 
                    style={{ backgroundColor: theme.primary, color: 'white' }}
                  >
                    Active
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {[theme.primary, theme.secondary, theme.accent, theme.success, theme.warning].map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThemeSelector;