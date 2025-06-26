import React from 'react';
import { Search, Calendar, Tag, Heart, RotateCcw, BarChart3 } from 'lucide-react';
import { FilterOptions, JournalStats } from '../types/journal';
import { MoodIcon } from './MoodIcon';

interface SidebarProps {
  isOpen: boolean;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  allTags: string[];
  stats: JournalStats;
}

const moods = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'bad', label: 'Bad' },
  { value: 'terrible', label: 'Terrible' }
] as const;

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' }
] as const;

export function Sidebar({ isOpen, filters, onFiltersChange, onClearFilters, allTags, stats }: SidebarProps) {
  const handleTagToggle = (tag: string) => {
    const updatedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    onFiltersChange({ ...filters, selectedTags: updatedTags });
  };

  const handleMoodToggle = (mood: string) => {
    const updatedMoods = filters.selectedMoods.includes(mood)
      ? filters.selectedMoods.filter(m => m !== mood)
      : [...filters.selectedMoods, mood];
    onFiltersChange({ ...filters, selectedMoods: updatedMoods });
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                    h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Search</h3>
          </div>
          <input
            type="text"
            placeholder="Search entries..."
            value={filters.searchText}
            onChange={(e) => onFiltersChange({ ...filters, searchText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Date Range</h3>
          </div>
          <div className="space-y-2">
            <input
              type="date"
              placeholder="Start date"
              value={filters.dateRange.start || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                dateRange: { ...filters.dateRange, start: e.target.value || null }
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
            <input
              type="date"
              placeholder="End date"
              value={filters.dateRange.end || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                dateRange: { ...filters.dateRange, end: e.target.value || null }
              })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Mood Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Mood</h3>
          </div>
          <div className="space-y-2">
            {moods.map(mood => (
              <label key={mood.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.selectedMoods.includes(mood.value)}
                  onChange={() => handleMoodToggle(mood.value)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded 
                           focus:ring-indigo-500 focus:ring-2"
                />
                <MoodIcon mood={mood.value} size="sm" />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {mood.label}
                </span>
                {stats.moodDistribution[mood.value] && (
                  <span className="text-xs text-gray-500 ml-auto">
                    ({stats.moodDistribution[mood.value]})
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-900 dark:text-white">Tags</h3>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allTags.map(tag => (
                <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded 
                             focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Sort By</h3>
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 
                   border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                   hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear All Filters
        </button>

        {/* Stats */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Statistics</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Entries</span>
              <span className="font-medium text-gray-900 dark:text-white">{stats.totalEntries}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">This Month</span>
              <span className="font-medium text-gray-900 dark:text-white">{stats.entriesThisMonth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg. Mood</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {stats.averageMood.toFixed(1)}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}