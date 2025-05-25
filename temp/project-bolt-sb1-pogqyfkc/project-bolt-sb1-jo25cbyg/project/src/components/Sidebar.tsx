import React from 'react';
import { X, RotateCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ColorPicker from './ColorPicker';
import Slider from './Slider';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeTemplates from './ThemeTemplates';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    theme, 
    setColors, 
    setGlassSettings, 
    setFontSettings,
    resetTheme 
  } = useTheme();
  
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      
      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Theme Customization</h2>
          <button className="close-sidebar" onClick={onClose} aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <ThemeSwitcher />
          </div>
          
          <div className="sidebar-section">
            <ThemeTemplates />
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Colors</h3>
            <ColorPicker 
              label="Primary Color"
              color={theme.colors.primary}
              onChange={(color) => setColors({ primary: color })}
            />
            
            <ColorPicker 
              label="Secondary Color"
              color={theme.colors.secondary}
              onChange={(color) => setColors({ secondary: color })}
            />
            
            <ColorPicker 
              label="Accent Color"
              color={theme.colors.accent}
              onChange={(color) => setColors({ accent: color })}
            />
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Glassmorphism</h3>
            <Slider 
              label="Blur Effect"
              min={0}
              max={20}
              step={1}
              value={theme.glass.blur}
              onChange={(value) => setGlassSettings({ blur: value })}
              unit="px"
            />
            
            <Slider 
              label="Transparency"
              min={0}
              max={0.5}
              step={0.01}
              value={theme.glass.transparency}
              onChange={(value) => setGlassSettings({ transparency: value })}
            />
            
            <Slider 
              label="Border Width"
              min={0}
              max={3}
              step={1}
              value={theme.glass.border}
              onChange={(value) => setGlassSettings({ border: value })}
              unit="px"
            />
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Typography</h3>
            <Slider 
              label="Font Size"
              min={12}
              max={20}
              step={1}
              value={theme.font.size}
              onChange={(value) => setFontSettings({ size: value })}
              unit="px"
            />
            
            <Slider 
              label="Font Weight"
              min={300}
              max={700}
              step={100}
              value={theme.font.weight}
              onChange={(value) => setFontSettings({ weight: value })}
            />
          </div>
          
          <button 
            className="btn btn-ghost" 
            onClick={resetTheme}
            style={{ width: '100%', marginTop: 'var(--space-lg)' }}
          >
            <RotateCw size={18} />
            <span>Reset to Default</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;