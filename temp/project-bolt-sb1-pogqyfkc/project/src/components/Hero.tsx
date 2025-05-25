import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[100px]"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-secondary/20 blur-[100px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <span 
                className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)', 
                  color: 'var(--color-primary)' 
                }}
              >
                Learn 3D modeling & design
              </span>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">
                <span className="block">Master the Art of</span>
                <span className="text-gradient">3D Creation</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Discover expert-led tutorials, resources, and a supportive community to help you create stunning 3D content from beginner to professional level.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/tutorials"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white'
                  }}
                >
                  Start Learning
                  <ArrowRight size={18} />
                </Link>
                
                <Link
                  to="/tutorial/1"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Play size={18} style={{ color: 'var(--color-primary)' }} />
                  Watch Demo
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 overflow-hidden"
                      style={{ 
                        borderColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)',
                        backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
                        backgroundSize: 'cover'
                      }}
                    ></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Joined by <span style={{ color: 'var(--color-primary)' }}>10,000+</span> creators
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <GlassCard 
              variant={isDarkMode ? 'dark' : 'light'}
              className="w-full max-w-md p-3 transform rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <img 
                src="https://images.pexels.com/photos/7054532/pexels-photo-7054532.jpeg" 
                alt="3D Environment Design" 
                className="w-full h-auto rounded-lg shadow-lg" 
              />
              <div className="mt-3 p-3">
                <span className="level-badge level-advanced inline-block mb-2">Advanced</span>
                <h3 className="text-lg font-semibold">Environmental Design in 3D</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm opacity-80">120 minutes</span>
                  <Link 
                    to="/tutorial/5" 
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    View Tutorial
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;