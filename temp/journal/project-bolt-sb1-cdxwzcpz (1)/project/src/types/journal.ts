export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  searchText: string;
  selectedTags: string[];
  selectedMoods: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  sortBy: 'newest' | 'oldest' | 'title';
}

export interface JournalStats {
  totalEntries: number;
  entriesThisMonth: number;
  averageMood: number;
  topTags: Array<{ tag: string; count: number }>;
  moodDistribution: Record<string, number>;
}