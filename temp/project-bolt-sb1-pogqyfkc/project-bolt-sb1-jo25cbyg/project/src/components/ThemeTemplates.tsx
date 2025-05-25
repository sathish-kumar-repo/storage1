import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themeTemplates } from '../data/themeTemplates';

const ThemeTemplates: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const applyTemplate = (templateId: string) => {
    const template = themeTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    setTheme(prev => ({
      ...prev,
      colors: template.colors[prev.mode]
    }));
  };
  
  return (
    <div className="theme-templates">
      <h3 className="section-title">Professional Templates</h3>
      <div className="templates-grid">
        {themeTemplates.map((template) => (
          <div
            key={template.id}
            className="template-card glass"
            onClick={() => applyTemplate(template.id)}
          >
            <div className="template-preview">
              <div className="color-strip" style={{ backgroundColor: template.colors.light.primary }} />
              <div className="color-strip" style={{ backgroundColor: template.colors.light.secondary }} />
              <div className="color-strip" style={{ backgroundColor: template.colors.light.accent }} />
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeTemplates;