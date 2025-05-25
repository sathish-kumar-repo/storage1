import React from 'react';
import '../styles/components/TutorialCard.scss';

interface TutorialCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  image,
  category,
  difficulty,
  duration
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return '';
    }
  };

  return (
    <div className="tutorial-card">
      <div className="tutorial-image">
        <img src={image} alt={title} />
        <span className="category">{category}</span>
      </div>
      <div className="tutorial-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tutorial-meta">
          <span className={`difficulty ${getDifficultyColor()}`}>{difficulty}</span>
          <span className="duration">{duration}</span>
        </div>
        <button className="btn-primary">Start Learning</button>
      </div>
    </div>
  );
};

export default TutorialCard;