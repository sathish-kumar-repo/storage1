import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

// Predefined color palettes
export const colorPresets = {
  primary: [
    '#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD', // Blues
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Purples
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D', // Ambers
    '#EF4444', '#DC2626', '#B91C1C', '#F87171', '#FCA5A5', // Reds
    '#84CC16', '#65A30D', '#4D7C0F', '#A3E635', '#BEF264', // Limes
    '#06B6D4', '#0891B2', '#0E7490', '#22D3EE', '#67E8F9', // Cyans
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Violets
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D'  // Ambers
  ],
  secondary: [
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D', // Ambers
    '#6B7280', '#4B5563', '#374151', '#9CA3AF', '#D1D5DB', // Grays
    '#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD', // Blues
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Purples
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#84CC16', '#65A30D', '#4D7C0F', '#A3E635', '#BEF264', // Limes
    '#06B6D4', '#0891B2', '#0E7490', '#22D3EE', '#67E8F9', // Cyans
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Violets
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D'  // Ambers
  ],
  accent: [
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#EF4444', '#DC2626', '#B91C1C', '#F87171', '#FCA5A5', // Reds
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Purples
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD', // Blues
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D', // Ambers
    '#84CC16', '#65A30D', '#4D7C0F', '#A3E635', '#BEF264', // Limes
    '#06B6D4', '#0891B2', '#0E7490', '#22D3EE', '#67E8F9', // Cyans
    '#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', // Violets
    '#EC4899', '#DB2777', '#BE185D', '#F472B6', '#FBCFE8', // Pinks
    '#F97316', '#EA580C', '#C2410C', '#FB923C', '#FDBA74', // Oranges
    '#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', // Emeralds
    '#14B8A6', '#0D9488', '#0F766E', '#2DD4BF', '#5EEAD4', // Teals
    '#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', // Indigos
    '#D946EF', '#C026D3', '#A21CAF', '#E879F9', '#F5D0FE', // Fuchsias
    '#F59E0B', '#D97706', '#B45309', '#FBB632', '#FCD34D'  // Ambers
  ]
};

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  color, 
  onChange, 
  presetColors = [] 
}) => {
  const handlePresetClick = (presetColor: string) => {
    onChange(presetColor);
  };

  const type = label.toLowerCase().includes('primary') ? 'primary' : 
               label.toLowerCase().includes('secondary') ? 'secondary' : 
               label.toLowerCase().includes('accent') ? 'accent' : null;

  const allPresets = type ? colorPresets[type] : presetColors;

  return (
    <div className="color-picker">
      <div className="color-label">
        <span>{label}</span>
        <div 
          className="color-preview" 
          style={{ backgroundColor: color }} 
        />
      </div>
      
      <input 
        type="color" 
        value={color} 
        onChange={(e) => onChange(e.target.value)} 
        className="color-input" 
      />
      
      <div className="preset-colors">
        {allPresets.map((presetColor, index) => (
          <div 
            key={index}
            className={`preset-color ${color === presetColor ? 'active' : ''}`}
            style={{ backgroundColor: presetColor }}
            onClick={() => handlePresetClick(presetColor)}
            title={presetColor}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;