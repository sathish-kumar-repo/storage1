import { useState, useMemo } from 'react';
import { useFileStorage } from './useFileStorage';
import { JournalEntry, FilterOptions, JournalStats } from '../types/journal';

const defaultFilters: FilterOptions = {
  searchText: '',
  selectedTags: [],
  selectedMoods: [],
  dateRange: { start: null, end: null },
  sortBy: 'newest'
};

export function useJournalData() {
  const {
    entries,
    loading,
    error,
    addEntry: addEntryToStorage,
    updateEntry: updateEntryInStorage,
    deleteEntry: deleteEntryFromStorage,
    exportData,
    importData
  } = useFileStorage();
  
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    entries.forEach(entry => entry.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    let filtered = entries.filter(entry => {
      // Search text filter
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const matchesSearch = 
          entry.title.toLowerCase().includes(searchLower) ||
          entry.content.toLowerCase().includes(searchLower) ||
          entry.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Tags filter
      if (filters.selectedTags.length > 0) {
        const hasMatchingTag = filters.selectedTags.some(tag => entry.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      // Mood filter
      if (filters.selectedMoods.length > 0) {
        if (!filters.selectedMoods.includes(entry.mood)) return false;
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const entryDate = new Date(entry.date);
        if (filters.dateRange.start && entryDate < new Date(filters.dateRange.start)) return false;
        if (filters.dateRange.end && entryDate > new Date(filters.dateRange.end)) return false;
      }

      return true;
    });

    // Sort entries
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [entries, filters]);

  const stats = useMemo((): JournalStats => {
    const now = new Date();
    const thisMonth = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    });

    const moodValues = { excellent: 5, good: 4, neutral: 3, bad: 2, terrible: 1 };
    const averageMood = entries.length > 0 
      ? entries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / entries.length 
      : 0;

    const tagCounts = new Map<string, number>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    const topTags = Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const moodDistribution = entries.reduce((dist, entry) => {
      dist[entry.mood] = (dist[entry.mood] || 0) + 1;
      return dist;
    }, {} as Record<string, number>);

    return {
      totalEntries: entries.length,
      entriesThisMonth: thisMonth.length,
      averageMood,
      topTags,
      moodDistribution
    };
  }, [entries]);

  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await addEntryToStorage(entry);
  };

  const updateEntry = async (id: string, updates: Partial<JournalEntry>) => {
    return await updateEntryInStorage(id, updates);
  };

  const deleteEntry = async (id: string) => {
    return await deleteEntryFromStorage(id);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    entries,
    filteredEntries,
    filters,
    setFilters,
    allTags,
    stats,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    clearFilters,
    exportData,
    importData
  };
}