import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import TutorialCard from './TutorialCard';
import GlassCard from './GlassCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../context/ThemeContext';

const PopularTutorials: React.FC = () => {
  const headingRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { isDarkMode } = useTheme();
  const popularTutorials = tutorials.filter(tutorial => tutorial.popular);
  
  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[100px]"></div>
        <div className="absolute bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div ref={headingRef} className="flex justify-between items-end mb-12 slide-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular This Week</h2>
            <p className="text-lg opacity-80 max-w-2xl">
              The most loved tutorials by our community members this week
            </p>
          </div>
          <Link 
            to="/tutorials" 
            className="hidden md:flex items-center gap-2 font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            View all
            <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTutorials.map((tutorial, index) => (
            <TutorialCard 
              key={tutorial.id} 
              tutorial={tutorial}
              delay={index * 2}
            />
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-20">
          <GlassCard 
            variant={isDarkMode ? 'dark' : 'default'}
            className="p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
                <p className="opacity-80 mb-6">
                  Subscribe to our newsletter to receive updates on new tutorials, resources, and community events.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ color: 'var(--color-text)' }}
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white'
                    }}
                  >
                    Subscribe
                  </button>
                </form>
                
                <p className="text-xs opacity-60 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              
              <div className="hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg" 
                  alt="3D Modeling" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default PopularTutorials;