import React from 'react';
import { Calendar, Target, TrendingUp, Award, Flame, CheckCircle } from 'lucide-react';

interface DailyProgress {
  date: string;
  diet: boolean;
  workout1: boolean;
  workout2: boolean;
  water: boolean;
  reading: boolean;
  photo: boolean;
}

interface DashboardStatsProps {
  currentDay: number;
  completedDays: number;
  currentStreak: number;
  dailyProgress: DailyProgress[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  currentDay,
  completedDays,
  currentStreak,
  dailyProgress,
}) => {
  const progressPercentage = (currentDay - 1) / 75 * 100;
  const completionRate = dailyProgress.length > 0 ? (completedDays / (currentDay - 1)) * 100 : 0;

  const getTaskCompletionRate = (task: keyof DailyProgress) => {
    if (dailyProgress.length === 0) return 0;
    const completed = dailyProgress.filter(day => day[task]).length;
    return (completed / dailyProgress.length) * 100;
  };

  const CircularProgress: React.FC<{ percentage: number; size: number; strokeWidth: number; color: string }> = ({
    percentage,
    size,
    strokeWidth,
    color,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-400" />
            <span className="text-3xl font-bold text-blue-400">Day</span>
          </div>
          <div className="text-4xl font-bold mb-2">{currentDay}</div>
          <div className="text-gray-400">of 75 days</div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-3xl font-bold text-green-400">Perfect</span>
          </div>
          <div className="text-4xl font-bold mb-2">{completedDays}</div>
          <div className="text-gray-400">complete days</div>
          <div className="mt-4">
            <span className="text-green-400 font-semibold">
              {completionRate.toFixed(1)}% success rate
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <span className="text-3xl font-bold text-orange-400">Streak</span>
          </div>
          <div className="text-4xl font-bold mb-2">{currentStreak}</div>
          <div className="text-gray-400">consecutive days</div>
          <div className="mt-4">
            <span className="text-orange-400 font-semibold">
              {currentStreak > 0 ? '🔥 On fire!' : 'Start your streak!'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <span className="text-3xl font-bold text-yellow-400">Level</span>
          </div>
          <div className="text-4xl font-bold mb-2">
            {currentDay <= 25 ? 'Beginner' : currentDay <= 50 ? 'Warrior' : 'Champion'}
          </div>
          <div className="text-gray-400">mental toughness</div>
          <div className="mt-4">
            <span className="text-yellow-400 font-semibold">
              {75 - currentDay + 1} days to go
            </span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-yellow-400" />
            Overall Progress
          </h3>
          <div className="flex items-center justify-center">
            <CircularProgress
              percentage={progressPercentage}
              size={200}
              strokeWidth={12}
              color="url(#gradient)"
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400">
              {currentDay - 1} of 75 days completed
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
            Task Performance
          </h3>
          <div className="space-y-4">
            {[
              { key: 'diet' as const, label: 'Diet Compliance', color: 'bg-blue-500' },
              { key: 'workout1' as const, label: 'Indoor Workout', color: 'bg-green-500' },
              { key: 'workout2' as const, label: 'Outdoor Workout', color: 'bg-purple-500' },
              { key: 'water' as const, label: 'Water Intake', color: 'bg-cyan-500' },
              { key: 'reading' as const, label: 'Daily Reading', color: 'bg-yellow-500' },
              { key: 'photo' as const, label: 'Progress Photo', color: 'bg-pink-500' },
            ].map((task) => {
              const rate = getTaskCompletionRate(task.key);
              return (
                <div key={task.key} className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">{task.label}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className={`${task.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {rate.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8 rounded-2xl border border-yellow-500/20">
        <div className="text-center">
          <blockquote className="text-2xl font-bold text-yellow-400 mb-4">
            "The 75 Hard Challenge isn't about fitness. It's about building mental toughness and discipline."
          </blockquote>
          <p className="text-gray-400">— Andy Frisella</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;