import React from 'react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MessageSquare, Users, Award, Calendar, ExternalLink } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const headerRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div ref={headerRef} className="mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community</h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Connect with fellow 3D artists, share your work, and participate in discussions
          </p>
        </div>
        
        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {communityFeatures.map((feature, index) => {
            const animRef = useScrollAnimation<HTMLDivElement>({ 
              threshold: 0.1,
              delay: index * 100,
            });
            
            return (
              <div key={feature.title} ref={animRef} className="slide-up">
                <GlassCard
                  variant={isDarkMode ? 'dark' : 'default'}
                  hoverable
                  className="p-6 h-full"
                >
                  <div className="flex flex-col h-full">
                    <div 
                      className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="opacity-80 mb-6">{feature.description}</p>
                    
                    <a 
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 font-medium text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {feature.linkText}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => {
              const animRef = useScrollAnimation<HTMLDivElement>({ 
                threshold: 0.1,
                delay: index * 100,
              });
              
              return (
                <div key={event.id} ref={animRef} className="slide-up">
                  <GlassCard
                    variant={isDarkMode ? 'dark' : 'default'}
                    hoverable
                    className="overflow-hidden"
                  >
                    <div 
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm"
                          style={{ color: 'white' }}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={16} className="opacity-60" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm opacity-80 mb-4">{event.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">
                          {event.attendees} attendees
                        </span>
                        
                        <a 
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          Register
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Community Showcase */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Community Showcase</h2>
            <a 
              href="#"
              className="hidden md:inline-flex items-center gap-1 font-medium text-sm"
              style={{ color: 'var(--color-primary)' }}
            >
              View All
              <ExternalLink size={14} />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {showcaseItems.map((item, index) => {
              const animRef = useScrollAnimation<HTMLDivElement>({ 
                threshold: 0.1,
                delay: index * 50,
              });
              
              return (
                <div key={item.id} ref={animRef} className="slide-up">
                  <GlassCard
                    variant={isDarkMode ? 'dark' : 'default'}
                    hoverable
                    className="overflow-hidden"
                  >
                    <div 
                      className="aspect-square bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    
                    <div className="p-4">
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full overflow-hidden"
                            style={{ 
                              backgroundImage: `url(${item.authorAvatar})`,
                              backgroundSize: 'cover'
                            }}
                          ></div>
                          <span className="text-xs">{item.author}</span>
                        </div>
                        
                        <span className="text-xs opacity-60">
                          {item.likes} likes
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a 
              href="#"
              className="inline-flex items-center gap-1 font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              View All Showcase Items
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Community Features Data
const communityFeatures = [
  {
    title: 'Discussion Forums',
    description: 'Join conversations about techniques, tools, industry trends, and get help with your projects.',
    color: 'rgba(59, 130, 246, 0.2)',
    icon: <MessageSquare style={{ color: '#3B82F6' }} />,
    link: '#',
    linkText: 'Join the discussion',
  },
  {
    title: 'User Groups',
    description: 'Connect with 3D artists in your area or with similar interests through our user groups.',
    color: 'rgba(139, 92, 246, 0.2)',
    icon: <Users style={{ color: '#8B5CF6' }} />,
    link: '#',
    linkText: 'Find your group',
  },
  {
    title: 'Challenges & Contests',
    description: 'Participate in monthly 3D challenges to improve your skills and win prizes.',
    color: 'rgba(245, 158, 11, 0.2)',
    icon: <Award style={{ color: '#F59E0B' }} />,
    link: '#',
    linkText: 'View current challenges',
  },
  {
    title: 'Events Calendar',
    description: 'Stay updated with workshops, webinars, and meet-ups in the 3D community.',
    color: 'rgba(16, 185, 129, 0.2)',
    icon: <Calendar style={{ color: '#10B981' }} />,
    link: '#',
    linkText: 'See upcoming events',
  },
];

// Upcoming Events Data
const upcomingEvents = [
  {
    id: '1',
    title: 'Character Design Workshop',
    description: 'Learn the principles of character design for animation and games.',
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg',
    type: 'Workshop',
    date: 'March 25, 2025',
    attendees: 128,
    link: '#',
  },
  {
    id: '2',
    title: 'Environmental Lighting Webinar',
    description: 'Master the art of realistic lighting for 3D environments.',
    image: 'https://images.pexels.com/photos/7054510/pexels-photo-7054510.jpeg',
    type: 'Webinar',
    date: 'April 10, 2025',
    attendees: 256,
    link: '#',
  },
  {
    id: '3',
    title: '3D Printing Meetup',
    description: 'Connect with 3D printing enthusiasts and see the latest technology.',
    image: 'https://images.pexels.com/photos/7054538/pexels-photo-7054538.jpeg',
    type: 'Meetup',
    date: 'April 15, 2025',
    attendees: 75,
    link: '#',
  },
];

// Showcase Items Data
const showcaseItems = [
  {
    id: '1',
    title: 'Futuristic City',
    author: 'Alex Chen',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    image: 'https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg',
    likes: 342,
  },
  {
    id: '2',
    title: 'Forest Cottage',
    author: 'Mia Johnson',
    authorAvatar: 'https://i.pravatar.cc/100?img=2',
    image: 'https://images.pexels.com/photos/7054532/pexels-photo-7054532.jpeg',
    likes: 287,
  },
  {
    id: '3',
    title: 'Sci-Fi Character',
    author: 'David Park',
    authorAvatar: 'https://i.pravatar.cc/100?img=3',
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg',
    likes: 415,
  },
  {
    id: '4',
    title: 'Abstract Sculpture',
    author: 'Sofia Rodriguez',
    authorAvatar: 'https://i.pravatar.cc/100?img=4',
    image: 'https://images.pexels.com/photos/7054510/pexels-photo-7054510.jpeg',
    likes: 189,
  },
  {
    id: '5',
    title: 'Product Visualization',
    author: 'James Wilson',
    authorAvatar: 'https://i.pravatar.cc/100?img=5',
    image: 'https://images.pexels.com/photos/7054521/pexels-photo-7054521.jpeg',
    likes: 275,
  },
  {
    id: '6',
    title: 'Fantasy Landscape',
    author: 'Emma Thompson',
    authorAvatar: 'https://i.pravatar.cc/100?img=6',
    image: 'https://images.pexels.com/photos/7054538/pexels-photo-7054538.jpeg',
    likes: 322,
  },
  {
    id: '7',
    title: 'Interior Design',
    author: 'Michael Brown',
    authorAvatar: 'https://i.pravatar.cc/100?img=7',
    image: 'https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg',
    likes: 246,
  },
  {
    id: '8',
    title: 'Character Animation',
    author: 'Olivia Garcia',
    authorAvatar: 'https://i.pravatar.cc/100?img=8',
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg',
    likes: 398,
  },
];

export default CommunityPage;