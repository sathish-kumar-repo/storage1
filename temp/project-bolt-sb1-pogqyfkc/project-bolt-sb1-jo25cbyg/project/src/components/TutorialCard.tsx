import React from 'react';

interface TutorialCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
  image?: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  difficulty,
  progress = 0,
  image
}) => {
  const difficultyColor = {
    beginner: 'var(--color-success)',
    intermediate: 'var(--color-warning)',
    advanced: 'var(--color-error)'
  };
  
  return (
    <div className="card glass tutorial-card">
      {image && (
        <div className="card-image" style={{ height: '160px', overflow: 'hidden' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        <div className="card-meta" style={{ marginTop: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="difficulty-badge" style={{ 
            fontSize: '0.75rem', 
            padding: '2px 8px', 
            borderRadius: 'var(--radius-full)', 
            backgroundColor: difficultyColor[difficulty],
            color: 'white'
          }}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          
          <span className="duration">15 min read</span>
        </div>
        
        {progress > 0 && (
          <div className="tutorial-progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;