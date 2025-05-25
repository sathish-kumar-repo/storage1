import React, { useState } from 'react';
import { AlignJustify, X, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setMode } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleTheme = () => {
    setMode(theme.mode === 'light' ? 'dark' : 'light');
  };
  
  return (
    <header className="header glass glass-nav">
      <div className="header-container">
        <div className="logo">
          <Palette size={24} />
          <span>GlassMorphic</span>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Tutorials</a>
          <a href="#" className="nav-link">Examples</a>
          <a href="#" className="nav-link">Documentation</a>
        </nav>
        
        <div className="header-actions">
          <button className="btn-icon-only" onClick={toggleTheme} aria-label="Toggle theme">
            {theme.mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button className="btn btn-primary" onClick={toggleSidebar}>
            <Palette size={18} />
            <span>Customize</span>
          </button>
          
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;