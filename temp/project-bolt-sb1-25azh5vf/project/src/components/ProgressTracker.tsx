import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize completed steps from localStorage or set all to false
    const savedProgress = localStorage.getItem(`tutorial-progress-${steps.join('-')}`);
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    } else {
      setCompletedSteps(steps.map(() => false));
    }
  }, [steps]);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    localStorage.setItem(
      `tutorial-progress-${steps.join('-')}`,
      JSON.stringify(completedSteps)
    );
  }, [completedSteps, steps]);

  const toggleStep = (index: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = !newCompletedSteps[index];
    setCompletedSteps(newCompletedSteps);
  };

  return (
    <div className="glass p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Progress
      </h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
              currentStep === index
                ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-opacity-30'
            }`}
            onClick={() => onStepChange(index)}
          >
            <button
              className="mr-3 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300"
              onClick={(e) => {
                e.stopPropagation();
                toggleStep(index);
              }}
              aria-label={completedSteps[index] ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {completedSteps[index] ? (
                <CheckCircle size={20} className="text-success-500" />
              ) : (
                <Circle size={20} />
              )}
            </button>
            <span className={`${completedSteps[index] ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedSteps.filter(Boolean).length} of {steps.length} completed
          </span>
          <div className="bg-gray-200 dark:bg-gray-700 w-36 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary-500 h-full rounded-full"
              style={{
                width: `${(completedSteps.filter(Boolean).length / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;