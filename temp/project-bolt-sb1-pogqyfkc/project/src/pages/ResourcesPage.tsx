import React from 'react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { ExternalLink, Download } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const headerRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div ref={headerRef} className="mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Tools, assets, and learning materials to help you master 3D creation
          </p>
        </div>
        
        {/* Resources Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {resourceCategories.map((category, index) => {
            const animRef = useScrollAnimation<HTMLDivElement>({ 
              threshold: 0.1,
              delay: index * 100,
            });
            
            return (
              <div key={category.id} ref={animRef} className="slide-up">
                <GlassCard
                  variant={isDarkMode ? 'dark' : 'default'}
                  hoverable
                  className="p-6 h-full"
                >
                  <div className="flex flex-col h-full">
                    <div 
                      className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="opacity-80 mb-6">{category.description}</p>
                    
                    <Link 
                      to={`/resources/${category.id}`}
                      className="mt-auto inline-flex items-center gap-1 font-medium text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Browse {category.title}
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
        
        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource, index) => {
              const animRef = useScrollAnimation<HTMLDivElement>({ 
                threshold: 0.1,
                delay: index * 100,
              });
              
              return (
                <div key={resource.id} ref={animRef} className="slide-up">
                  <GlassCard
                    variant={isDarkMode ? 'dark' : 'default'}
                    hoverable
                    className="overflow-hidden"
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${resource.image})` }}
                    ></div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{resource.title}</h3>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          {resource.type}
                        </span>
                      </div>
                      
                      <p className="opacity-80 mb-6">{resource.description}</p>
                      
                      <div className="flex gap-3">
                        <a 
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md text-sm"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          {resource.type === 'Tool' ? 'Visit Website' : 'Download'}
                          {resource.type === 'Tool' ? <ExternalLink size={14} /> : <Download size={14} />}
                        </a>
                        
                        <Link
                          to={`/resources/${resource.category}/${resource.id}`}
                          className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md text-sm"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Free 3D Assets */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Free 3D Assets</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {freeAssets.map((asset, index) => {
              const animRef = useScrollAnimation<HTMLDivElement>({ 
                threshold: 0.1,
                delay: index * 50,
              });
              
              return (
                <div key={asset.id} ref={animRef} className="slide-up">
                  <GlassCard
                    variant={isDarkMode ? 'dark' : 'default'}
                    hoverable
                    className="overflow-hidden"
                  >
                    <div 
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${asset.image})` }}
                    ></div>
                    
                    <div className="p-4">
                      <h3 className="font-bold mb-1 line-clamp-1">{asset.title}</h3>
                      <p className="text-xs opacity-80 mb-3 line-clamp-2">{asset.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)' }}>
                          Free
                        </span>
                        
                        <a 
                          href={asset.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Resource Categories Data
const resourceCategories = [
  {
    id: 'software',
    title: '3D Software',
    description: 'Professional applications for creating, editing, and rendering 3D models.',
    color: 'rgba(59, 130, 246, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3B82F6' }}><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>,
  },
  {
    id: 'textures',
    title: 'Textures & Materials',
    description: 'High-quality textures and materials to enhance your 3D creations.',
    color: 'rgba(245, 158, 11, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#F59E0B' }}><circle cx="9" cy="9" r="2"/><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10.8"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3 3v-6"/><path d="m17 16.5 3 3"/></svg>,
  },
  {
    id: 'models',
    title: '3D Models',
    description: 'Ready-to-use 3D models and assets for your projects.',
    color: 'rgba(16, 185, 129, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10B981' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  },
  {
    id: 'plugins',
    title: 'Plugins & Add-ons',
    description: 'Extend the functionality of your 3D software with these tools.',
    color: 'rgba(139, 92, 246, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#8B5CF6' }}><path d="M12 13V7"/><path d="M9 10h6"/><path d="M12 22V19"/><path d="M12 3V2"/><path d="M3 12H2"/><path d="M19 12h1"/><path d="M18.4 5.6 22 2"/><path d="M18.4 18.4 22 22"/><path d="M5.6 5.6 2 2"/><path d="M5.6 18.4 2 22"/></svg>,
  },
  {
    id: 'tutorials',
    title: 'External Tutorials',
    description: 'Curated list of external tutorials and learning resources.',
    color: 'rgba(236, 72, 153, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#EC4899' }}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  },
  {
    id: 'scripts',
    title: 'Scripts & Automations',
    description: 'Scripts to automate common tasks and improve your workflow.',
    color: 'rgba(20, 184, 166, 0.2)',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#14B8A6' }}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
  },
];

// Featured Resources Data
const featuredResources = [
  {
    id: '1',
    title: 'Blender 3D',
    description: 'Free and open source 3D creation suite. It supports the entirety of the 3D pipeline.',
    image: 'https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg',
    type: 'Tool',
    category: 'software',
    link: 'https://www.blender.org/',
  },
  {
    id: '2',
    title: 'PBR Material Pack',
    description: 'A collection of 50+ high-quality PBR materials for architectural and product visualization.',
    image: 'https://images.pexels.com/photos/7054510/pexels-photo-7054510.jpeg',
    type: 'Asset Pack',
    category: 'textures',
    link: '#',
  },
  {
    id: '3',
    title: 'Character Rigging Guide',
    description: 'Comprehensive guide to character rigging for animation in various 3D software.',
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg',
    type: 'Guide',
    category: 'tutorials',
    link: '#',
  },
  {
    id: '4',
    title: 'Environment Creation Kit',
    description: 'Tools and assets for quickly creating realistic natural environments.',
    image: 'https://images.pexels.com/photos/7054532/pexels-photo-7054532.jpeg',
    type: 'Toolkit',
    category: 'plugins',
    link: '#',
  },
];

// Free Assets Data
const freeAssets = [
  {
    id: '1',
    title: 'Modern Chair',
    description: 'Low-poly modern chair model with textures',
    image: 'https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg',
    link: '#',
  },
  {
    id: '2',
    title: 'Concrete Texture Pack',
    description: '10 high-resolution concrete textures',
    image: 'https://images.pexels.com/photos/7054510/pexels-photo-7054510.jpeg',
    link: '#',
  },
  {
    id: '3',
    title: 'Indoor Plant Collection',
    description: '5 indoor plant models with materials',
    image: 'https://images.pexels.com/photos/7054521/pexels-photo-7054521.jpeg',
    link: '#',
  },
  {
    id: '4',
    title: 'Basic Character Rig',
    description: 'Rigged human character for animation',
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg',
    link: '#',
  },
  {
    id: '5',
    title: 'Forest Environment',
    description: 'Low-poly forest environment assets',
    image: 'https://images.pexels.com/photos/7054532/pexels-photo-7054532.jpeg',
    link: '#',
  },
  {
    id: '6',
    title: 'Sci-Fi Props',
    description: 'Collection of futuristic props and devices',
    image: 'https://images.pexels.com/photos/7054538/pexels-photo-7054538.jpeg',
    link: '#',
  },
  {
    id: '7',
    title: 'Kitchen Utensils',
    description: 'Realistic kitchen tools and utensils',
    image: 'https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg',
    link: '#',
  },
  {
    id: '8',
    title: 'Metal Materials',
    description: '15 PBR metal materials',
    image: 'https://images.pexels.com/photos/7054510/pexels-photo-7054510.jpeg',
    link: '#',
  },
];

export default ResourcesPage;