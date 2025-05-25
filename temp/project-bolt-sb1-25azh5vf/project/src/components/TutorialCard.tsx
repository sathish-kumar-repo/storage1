import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TutorialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  icon,
  to,
  difficulty,
  estimatedTime,
}) => {
  const difficultyColor = {
    Beginner: 'bg-success-500',
    Intermediate: 'bg-accent-500',
    Advanced: 'bg-secondary-500',
  }[difficulty];

  return (
    <div className="card hover:shadow-xl group">
      <div className="flex items-start mb-4">
        <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 text-primary-600 dark:text-primary-400 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center space-x-3 mt-1">
            <span className={`px-2 py-1 rounded-full ${difficultyColor} text-white text-xs font-medium`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {estimatedTime}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors"
      >
        Start Learning
        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default TutorialCard;