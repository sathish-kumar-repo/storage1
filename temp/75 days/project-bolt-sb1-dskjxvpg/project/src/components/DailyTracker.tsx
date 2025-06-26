import React, { useState } from 'react';
import { Apple, Dumbbell, TreePine, Droplets, BookOpen, Camera, CheckCircle, Clock, Trophy } from 'lucide-react';

interface DailyProgress {
  date: string;
  diet: boolean;
  workout1: boolean;
  workout2: boolean;
  water: boolean;
  reading: boolean;
  photo: boolean;
}

interface DailyTrackerProps {
  day: number;
  progress: DailyProgress;
  onUpdate: (key: keyof DailyProgress, value: boolean) => void;
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ day, progress, onUpdate }) => {
  const [waterCount, setWaterCount] = useState(0);
  const [readingPages, setReadingPages] = useState(0);

  const tasks = [
    {
      key: 'diet' as const,
      title: 'Follow Your Diet',
      description: 'No cheat meals or alcohol',
      icon: Apple,
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500',
    },
    {
      key: 'workout1' as const,
      title: 'Indoor Workout',
      description: '45 minutes of exercise',
      icon: Dumbbell,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-500',
    },
    {
      key: 'workout2' as const,
      title: 'Outdoor Workout',
      description: '45 minutes outside',
      icon: TreePine,
      color: 'from-purple-500 to-violet-600',
      borderColor: 'border-purple-500',
    },
    {
      key: 'water' as const,
      title: 'Drink Water',
      description: '1 gallon (3.8 liters)',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
    },
    {
      key: 'reading' as const,
      title: 'Read 10 Pages',
      description: 'Non-fiction book',
      icon: BookOpen,
      color: 'from-yellow-500 to-orange-600',
      borderColor: 'border-yellow-500',
    },
    {
      key: 'photo' as const,
      title: 'Progress Photo',
      description: 'Document your journey',
      icon: Camera,
      color: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-500',
    },
  ];

  const completedTasks = tasks.filter(task => progress[task.key]).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Day Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Day {day}</h2>
        <p className="text-gray-400 text-lg">
          {new Date(progress.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        {/* Progress Ring */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-700"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedTasks}</div>
                <div className="text-xs text-gray-400">of 6</div>
              </div>
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isCompleted = progress[task.key];
          
          return (
            <div
              key={task.key}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 transition-all duration-300 ${
                isCompleted 
                  ? `${task.borderColor} shadow-lg` 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${task.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{task.title}</h3>
                    <p className="text-gray-400 text-sm">{task.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onUpdate(task.key, !isCompleted)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 text-white shadow-lg scale-110'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Additional inputs for specific tasks */}
              {task.key === 'water' && (
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Glasses (8oz each)</span>
                    <span className="text-sm font-semibold">{waterCount}/16</span>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${
                          i < waterCount ? 'bg-cyan-500' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                      className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setWaterCount(Math.min(16, waterCount + 1))}
                      className="px-3 py-1 bg-cyan-600 rounded text-sm hover:bg-cyan-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {task.key === 'reading' && (
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Pages read today</span>
                    <span className="text-sm font-semibold">{readingPages}/10</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={readingPages}
                      onChange={(e) => setReadingPages(Math.max(0, parseInt(e.target.value) || 0))}
                      className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                      placeholder="0"
                      min="0"
                    />
                    <button
                      onClick={() => setReadingPages(10)}
                      className="px-3 py-2 bg-yellow-600 rounded text-sm hover:bg-yellow-500"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {/* Completion indicator */}
              {isCompleted && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Status */}
      {completedTasks === tasks.length && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30 text-center">
          <div className="flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-400">Perfect Day!</h3>
          </div>
          <p className="text-gray-300">
            Congratulations! You've completed all tasks for Day {day}. 
            Keep up the amazing work!
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-500/20">
        <h3 className="text-xl font-bold mb-3 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-400" />
          Daily Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-blue-400 mb-1">Morning</h4>
            <p>Start with your progress photo and plan your meals for the day.</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-1">Evening</h4>
            <p>Complete your reading before bed to end the day on a positive note.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;