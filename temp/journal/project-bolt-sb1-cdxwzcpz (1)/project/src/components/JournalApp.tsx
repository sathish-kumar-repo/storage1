import React, { useState } from 'react';
import { Plus, Menu, X, Download, Upload, AlertCircle } from 'lucide-react';
import { useJournalData } from '../hooks/useJournalData';
import { JournalEntry } from '../types/journal';
import { EntryCard } from './EntryCard';
import { EntryForm } from './EntryForm';
import { Sidebar } from './Sidebar';
import { EmptyState } from './EmptyState';
import { ThemeToggle } from './ThemeToggle';

export function JournalApp() {
  const {
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
  } = useJournalData();

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSaveEntry = async (entryData: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    let success = false;
    
    if (editingEntry) {
      success = await updateEntry(editingEntry.id, entryData);
    } else {
      success = await addEntry(entryData);
    }
    
    if (success) {
      setShowForm(false);
      setEditingEntry(undefined);
    }
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await deleteEntry(id);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEntry(undefined);
  };

  const handleCreateFirst = () => {
    setShowForm(true);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
    // Reset the input
    e.target.value = '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 
                      dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 
                      flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar
            isOpen={true}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            allTags={allTags}
            stats={stats}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Journal
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredEntries.length} of {entries.length} entries
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  id="import-data"
                />
                <label
                  htmlFor="import-data"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                           text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 
                           transition-colors cursor-pointer"
                  title="Import journal data"
                >
                  <Upload className="w-5 h-5" />
                </label>
                <button
                  onClick={exportData}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                           text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Export journal data"
                >
                  <Download className="w-5 h-5" />
                </button>
                <ThemeToggle />
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg
                           font-medium transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  New Entry
                </button>
              </div>
            </div>
          </header>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          )}

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {entries.length === 0 ? (
              <EmptyState hasEntries={false} onCreateFirst={handleCreateFirst} />
            ) : filteredEntries.length === 0 ? (
              <EmptyState hasEntries={true} onCreateFirst={handleCreateFirst} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEntries.map(entry => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Entry Form Modal */}
      {showForm && (
        <EntryForm
          entry={editingEntry}
          onSave={handleSaveEntry}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}