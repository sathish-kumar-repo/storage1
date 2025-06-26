import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface DailyProgress {
  date: string;
  diet: boolean;
  workout1: boolean;
  workout2: boolean;
  water: boolean;
  reading: boolean;
  photo: boolean;
}

interface ProgressCalendarProps {
  dailyProgress: DailyProgress[];
  currentDay: number;
}

const ProgressCalendar: React.FC<ProgressCalendarProps> = ({ dailyProgress, currentDay }) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (currentDay - 1));

  const getDayStatus = (dayIndex: number) => {
    const progress = dailyProgress[dayIndex];
    if (!progress) return 'future';
    
    const completed = progress.diet && progress.workout1 && progress.workout2 && 
                     progress.water && progress.reading && progress.photo;
    
    if (completed) return 'perfect';
    
    const completedTasks = [
      progress.diet, progress.workout1, progress.workout2,
      progress.water, progress.reading, progress.photo
    ].filter(Boolean).length;
    
    if (completedTasks >= 4) return 'good';
    if (completedTasks >= 2) return 'partial';
    return 'failed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'perfect': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'partial': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'perfect': return 'Perfect Day';
      case 'good': return 'Good Progress';
      case 'partial': return 'Partial Completion';
      case 'failed': return 'Needs Improvement';
      default: return 'Upcoming';
    }
  };

  const weeks = [];
  for (let week = 0; week < 11; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const dayIndex = week * 7 + day;
      if (dayIndex < 75) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayIndex);
        
        weekDays.push({
          dayIndex,
          date: currentDate,
          status: getDayStatus(dayIndex),
          isToday: dayIndex === currentDay - 1,
          isFuture: dayIndex >= currentDay
        });
      }
    }
    if (weekDays.length > 0) {
      weeks.push(weekDays);
    }
  }

  const getCompletionStats = () => {
    const completed = dailyProgress.slice(0, currentDay - 1);
    const perfectDays = completed.filter(day => 
      day.diet && day.workout1 && day.workout2 && day.water && day.reading && day.photo
    ).length;
    
    const taskStats = {
      diet: completed.filter(day => day.diet).length,
      workout1: completed.filter(day => day.workout1).length,
      workout2: completed.filter(day => day.workout2).length,
      water: completed.filter(day => day.water).length,
      reading: completed.filter(day => day.reading).length,
      photo: completed.filter(day => day.photo).length,
    };

    return { perfectDays, taskStats, totalDays: completed.length };
  };

  const stats = getCompletionStats();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <Calendar className="w-8 h-8 mr-3 text-blue-400" />
          75-Day Progress Calendar
        </h2>
        <p className="text-gray-400">Track your daily progress and maintain your streak</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.perfectDays}</div>
          <div className="text-sm text-gray-400">Perfect Days</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{currentDay - 1}</div>
          <div className="text-sm text-gray-400">Days Attempted</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">
            {stats.totalDays > 0 ? Math.round((stats.perfectDays / stats.totalDays) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-400">Success Rate</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-2xl font-bold text-orange-400">{75 - currentDay + 1}</div>
          <div className="text-sm text-gray-400">Days Remaining</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((dayData, dayInWeek) => (
                <div
                  key={dayData.dayIndex}
                  className={`relative aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    dayData.isToday 
                      ? 'border-yellow-400 ring-2 ring-yellow-400/30' 
                      : 'border-gray-600 hover:border-gray-500'
                  } ${dayData.isFuture ? 'opacity-50' : ''}`}
                  title={`Day ${dayData.dayIndex + 1} - ${getStatusText(dayData.status)}`}
                >
                  <div className={`w-full h-full rounded-md ${getStatusColor(dayData.status)} flex items-center justify-center relative`}>
                    <span className="text-sm font-bold text-white">
                      {dayData.dayIndex + 1}
                    </span>
                    
                    {dayData.isToday && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    )}
                    
                    {dayData.status === 'perfect' && !dayData.isFuture && (
                      <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-400 bg-gray-900 rounded-full" />
                    )}
                    
                    {dayData.status === 'failed' && !dayData.isFuture && (
                      <XCircle className="absolute -top-1 -right-1 w-4 h-4 text-red-400 bg-gray-900 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { status: 'perfect', label: 'Perfect Day', description: 'All 6 tasks completed' },
            { status: 'good', label: 'Good Progress', description: '4-5 tasks completed' },
            { status: 'partial', label: 'Partial', description: '2-3 tasks completed' },
            { status: 'failed', label: 'Needs Work', description: '0-1 tasks completed' },
            { status: 'future', label: 'Upcoming', description: 'Future day' },
          ].map(item => (
            <div key={item.status} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${getStatusColor(item.status)}`} />
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-400">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Breakdown */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Task Completion Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { key: 'diet', label: 'Diet', icon: '🥗' },
            { key: 'workout1', label: 'Indoor Workout', icon: '💪' },
            { key: 'workout2', label: 'Outdoor Workout', icon: '🏃' },
            { key: 'water', label: 'Water', icon: '💧' },
            { key: 'reading', label: 'Reading', icon: '📚' },
            { key: 'photo', label: 'Photo', icon: '📸' },
          ].map(task => {
            const completed = stats.taskStats[task.key as keyof typeof stats.taskStats];
            const percentage = stats.totalDays > 0 ? Math.round((completed / stats.totalDays) * 100) : 0;
            
            return (
              <div key={task.key} className="text-center">
                <div className="text-2xl mb-2">{task.icon}</div>
                <div className="text-lg font-bold">{completed}/{stats.totalDays}</div>
                <div className="text-sm text-gray-400">{task.label}</div>
                <div className="text-xs text-yellow-400">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressCalendar;