import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setMode } = useTheme();
  
  const handleChange = () => {
    setMode(theme.mode === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className="switcher theme-switcher">
      <label htmlFor="theme-toggle" className="switcher-label">
        {theme.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
      </label>
      
      <label className="switcher-track">
        <input
          id="theme-toggle"
          type="checkbox"
          className="switcher-input"
          checked={theme.mode === 'dark'}
          onChange={handleChange}
        />
        <span className="switcher-slider">
          <Sun size={16} className="sun-icon" />
          <Moon size={16} className="moon-icon" />
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;