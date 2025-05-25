import React from 'react';
import { Award, BookOpen, Users, Code } from 'lucide-react';
import '../styles/components/AboutSection.scss';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p className="lead">I'm passionate about creating beautiful, interactive learning experiences.</p>
            <p>
              With over 8 years of experience in web development and design, I specialize in creating
              tutorials that combine visual aesthetics with clear, practical instruction. My goal is to
              make complex technical concepts accessible and engaging for learners at all levels.
            </p>
            <p>
              I believe in the power of visual learning, which is why I incorporate 3D graphics,
              animations, and clean design in all my tutorials. This approach helps learners grasp
              concepts more intuitively and retain information better.
            </p>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-icon"><Award size={24} /></span>
                <span className="stat-number">120+</span>
                <span className="stat-label">Tutorials Created</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon"><Users size={24} /></span>
                <span className="stat-number">50k+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon"><BookOpen size={24} /></span>
                <span className="stat-number">15</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon"><Code size={24} /></span>
                <span className="stat-number">8+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-container">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Author portrait" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;