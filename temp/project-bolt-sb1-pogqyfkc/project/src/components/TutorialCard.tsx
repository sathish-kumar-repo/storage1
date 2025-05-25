import React from 'react';
import { Clock, ChevronRight, LayoutList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tutorial } from '../types';
import GlassCard from './GlassCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../context/ThemeContext';

interface TutorialCardProps {
  tutorial: Tutorial;
  featured?: boolean;
  delay?: number;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ 
  tutorial, 
  featured = false,
  delay = 0
}) => {
  const animRef = useScrollAnimation<HTMLDivElement>({ 
    threshold: 0.1,
    delay: delay * 100,
    once: true
  });
  
  const { isDarkMode } = useTheme();

  const levelClass = `level-${tutorial.level}`;
  
  return (
    <div 
      ref={animRef} 
      className={`slide-up ${featured ? 'col-span-2 md:col-span-2' : 'col-span-2 md:col-span-1'}`}
    >
      <GlassCard 
        variant={isDarkMode ? 'dark' : 'default'}
        hoverable
        className="h-full overflow-hidden transition-all duration-300"
      >
        <div className="flex flex-col h-full">
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${tutorial.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {tutorial.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20" style={{ color: 'var(--color-primary)' }}>
                  Featured
                </span>
              )}
              {tutorial.popular && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/20" style={{ color: 'var(--color-secondary)' }}>
                  Popular
                </span>
              )}
            </div>
            
            {/* Level badge */}
            <div className="absolute bottom-4 left-4">
              <span className={`level-badge ${levelClass}`}>
                {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
            <p className="text-sm mb-4 opacity-80 flex-grow">{tutorial.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} style={{ color: 'var(--color-text)' }} className="opacity-70" />
                  <span className="text-xs">{tutorial.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <LayoutList size={16} style={{ color: 'var(--color-text)' }} className="opacity-70" />
                  <span className="text-xs">{tutorial.steps} steps</span>
                </div>
              </div>
              
              <Link 
                to={`/tutorial/${tutorial.id}`}
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-primary"
                style={{ color: 'var(--color-primary)' }}
              >
                View
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default TutorialCard;