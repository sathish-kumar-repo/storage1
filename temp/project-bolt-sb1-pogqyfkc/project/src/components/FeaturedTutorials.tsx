import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import TutorialCard from './TutorialCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FeaturedTutorials: React.FC = () => {
  const headingRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div ref={headingRef} className="flex justify-between items-end mb-12 slide-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tutorials</h2>
            <p className="text-lg opacity-80 max-w-2xl">
              Explore our handpicked selection of the most comprehensive and engaging 3D tutorials
            </p>
          </div>
          <Link 
            to="/tutorials" 
            className="hidden md:flex items-center gap-2 font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            View all tutorials
            <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTutorials.map((tutorial, index) => (
            <TutorialCard 
              key={tutorial.id} 
              tutorial={tutorial} 
              featured={index === 0}
              delay={index * 2}
            />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Link 
            to="/tutorials" 
            className="flex items-center gap-2 font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            View all tutorials
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorials;