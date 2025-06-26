import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  hasEntries: boolean;
  onCreateFirst: () => void;
}

export function EmptyState({ hasEntries, onCreateFirst }: EmptyStateProps) {
  if (hasEntries) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No entries match your filters
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or clear the filters to see all entries.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <BookOpen className="w-24 h-24 mx-auto text-gray-400 mb-6" />
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
        Welcome to Your Journal
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Start documenting your thoughts, experiences, and memories. 
        Your first entry is just a click away.
      </p>
      <button
        onClick={onCreateFirst}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg
                 font-medium transition-colors flex items-center gap-2 mx-auto"
      >
        <Plus className="w-5 h-5" />
        Write Your First Entry
      </button>
    </div>
  );
}