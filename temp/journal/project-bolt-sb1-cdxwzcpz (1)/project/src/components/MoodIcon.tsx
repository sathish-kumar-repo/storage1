import React from 'react';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MoodIconProps {
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  size?: 'sm' | 'md' | 'lg';
}

const moodConfig = {
  excellent: { icon: ThumbsUp, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  good: { icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  neutral: { icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  bad: { icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  terrible: { icon: ThumbsDown, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' }
};

const sizeConfig = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export function MoodIcon({ mood, size = 'md' }: MoodIconProps) {
  const { icon: Icon, color, bg } = moodConfig[mood];
  
  return (
    <div className={`p-1.5 rounded-full ${bg} flex items-center justify-center`}>
      <Icon className={`${sizeConfig[size]} ${color}`} />
    </div>
  );
}