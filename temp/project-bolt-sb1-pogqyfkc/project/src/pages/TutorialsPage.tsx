import React, { useState, useEffect } from 'react';
import { tutorials } from '../data/tutorials';
import TutorialCard from '../components/TutorialCard';
import GlassCard from '../components/GlassCard';
import { Filter, Search, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TutorialsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique tags
  const allTags = tutorials.flatMap(tutorial => tutorial.tags);
  const uniqueTags = [...new Set(allTags)];
  
  // Filter tutorials
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel ? tutorial.level === selectedLevel : true;
    const matchesTag = selectedTag ? tutorial.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesLevel && matchesTag;
  });
  
  // Reset filters when component unmounts
  useEffect(() => {
    return () => {
      setSearchQuery('');
      setSelectedLevel(null);
      setSelectedTag(null);
    };
  }, []);
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(null);
    setSelectedTag(null);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tutorials</h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Browse our comprehensive collection of 3D tutorials for all skill levels
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-10">
          <GlassCard
            variant={isDarkMode ? 'dark' : 'default'}
            className="p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Search size={18} className="opacity-60" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tutorials..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ color: 'var(--color-text)' }}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={18} className="opacity-60 hover:opacity-100" />
                  </button>
                )}
              </div>
              
              {/* Filter Button (Mobile) */}
              <button
                className="md:hidden flex items-center gap-2 px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
                Filters
                {(selectedLevel || selectedTag) && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    {(selectedLevel ? 1 : 0) + (selectedTag ? 1 : 0)}
                  </span>
                )}
              </button>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex gap-4">
                {/* Level Filter */}
                <div className="flex flex-wrap gap-2">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <button
                      key={level}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedLevel === level ? 'shadow-md' : ''
                      }`}
                      style={{
                        backgroundColor: selectedLevel === level 
                          ? 'var(--color-primary)' 
                          : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        color: selectedLevel === level ? 'white' : 'var(--color-text)',
                        border: '1px solid',
                        borderColor: selectedLevel === level 
                          ? 'var(--color-primary)' 
                          : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
                
                {/* Clear Filters */}
                {(selectedLevel || selectedTag || searchQuery) && (
                  <button
                    className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--color-text)',
                      border: '1px solid',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Filters (Expandable) */}
            <div
              className={`mt-4 md:hidden transition-all duration-300 overflow-hidden ${
                isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 border-t border-white/10">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                      <button
                        key={level}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          selectedLevel === level ? 'shadow-md' : ''
                        }`}
                        style={{
                          backgroundColor: selectedLevel === level 
                            ? 'var(--color-primary)' 
                            : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          color: selectedLevel === level ? 'white' : 'var(--color-text)',
                          border: '1px solid',
                          borderColor: selectedLevel === level 
                            ? 'var(--color-primary)' 
                            : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTags.map(tag => (
                      <button
                        key={tag}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          selectedTag === tag ? 'shadow-md' : ''
                        }`}
                        style={{
                          backgroundColor: selectedTag === tag 
                            ? 'var(--color-primary)' 
                            : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          color: selectedTag === tag ? 'white' : 'var(--color-text)',
                          border: '1px solid',
                          borderColor: selectedTag === tag 
                            ? 'var(--color-primary)' 
                            : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                {(selectedLevel || selectedTag || searchQuery) && (
                  <button
                    className="w-full px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--color-text)',
                      border: '1px solid',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm">
            Showing <span className="font-medium">{filteredTutorials.length}</span> tutorials
            {(selectedLevel || selectedTag || searchQuery) && ' with current filters'}
          </p>
        </div>
        
        {/* Tutorials Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <TutorialCard 
                key={tutorial.id} 
                tutorial={tutorial}
                delay={index % 5}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No tutorials found</h3>
            <p className="opacity-80 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsPage;