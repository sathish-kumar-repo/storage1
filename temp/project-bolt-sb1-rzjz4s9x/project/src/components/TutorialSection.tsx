import React from 'react';
import TutorialCard from './TutorialCard';
import '../styles/components/TutorialSection.scss';

const TutorialSection: React.FC = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Three.js',
      description: 'Learn the basics of 3D web development with Three.js. This tutorial covers setting up your first scene.',
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: '3D Graphics',
      difficulty: 'beginner' as const,
      duration: '30 min'
    },
    {
      id: 2,
      title: 'Advanced SCSS Techniques',
      description: 'Take your SCSS skills to the next level with mixins, functions, and advanced architecture patterns.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'CSS',
      difficulty: 'intermediate' as const,
      duration: '45 min'
    },
    {
      id: 3,
      title: 'Responsive Design Masterclass',
      description: 'Create beautiful websites that work on any device with modern responsive design techniques.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Design',
      difficulty: 'intermediate' as const,
      duration: '60 min'
    },
    {
      id: 4,
      title: 'Building 3D Animations',
      description: 'Learn how to create stunning 3D animations for the web using modern JavaScript tools.',
      image: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Animation',
      difficulty: 'advanced' as const,
      duration: '75 min'
    },
    {
      id: 5,
      title: 'Web Performance Optimization',
      description: 'Speed up your websites and improve user experience with these performance optimization techniques.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Performance',
      difficulty: 'intermediate' as const,
      duration: '50 min'
    },
    {
      id: 6,
      title: 'CSS Animation Fundamentals',
      description: 'Master the art of creating smooth, engaging animations using pure CSS techniques.',
      image: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Animation',
      difficulty: 'beginner' as const,
      duration: '40 min'
    }
  ];

  return (
    <section id="tutorials" className="tutorial-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest Tutorials</h2>
          <p>Expand your skills with these carefully crafted learning resources</p>
        </div>
        
        <div className="tutorials-grid">
          {tutorials.map(tutorial => (
            <TutorialCard
              key={tutorial.id}
              title={tutorial.title}
              description={tutorial.description}
              image={tutorial.image}
              category={tutorial.category}
              difficulty={tutorial.difficulty}
              duration={tutorial.duration}
            />
          ))}
        </div>
        
        <div className="view-all">
          <button className="btn btn-secondary">View All Tutorials</button>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;