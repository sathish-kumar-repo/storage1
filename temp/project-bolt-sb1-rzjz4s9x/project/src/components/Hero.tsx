import React from 'react';
import { ChevronDown } from 'lucide-react';
import ThreeScene from './ThreeScene';
import '../styles/components/Hero.scss';

interface HeroProps {
  authorName: string;
  authorRole: string;
}

const Hero: React.FC<HeroProps> = ({ authorName, authorRole }) => {
  const handleScrollDown = () => {
    const tutorialsSection = document.getElementById('tutorials');
    if (tutorialsSection) {
      tutorialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <ThreeScene 
        authorName={authorName}
        authorRole={authorRole}
      />
      
      <div className="author-info">
        <h1 className="fade-in">{authorName}</h1>
        <p className="slide-up">{authorRole}</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Explore Tutorials</button>
          <button className="btn btn-accent">Contact Me</button>
        </div>
      </div>
      
      <div className="scroll-indicator" onClick={handleScrollDown}>
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;