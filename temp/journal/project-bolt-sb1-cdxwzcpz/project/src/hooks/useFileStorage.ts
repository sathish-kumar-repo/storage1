import { useState, useEffect } from 'react';
import { fileStorage, StorageResponse } from '../utils/fileStorage';
import { JournalEntry } from '../types/journal';

export function useFileStorage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoSaving, setAutoSaving] = useState(false);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    setError(null);
    
    // Try to load from file storage first, fallback to localStorage
    let result = await fileStorage.readEntries();
    
    if (!result.success) {
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem('journal-file-data');
        if (stored) {
          result = { success: true, data: JSON.parse(stored) };
        } else {
          result = { success: true, data: [] };
        }
      } catch (err) {
        result = { success: true, data: [] };
      }
    }
    
    if (result.success) {
      setEntries(result.data || []);
    } else {
      setError(result.error || 'Failed to load entries');
      setEntries([]);
    }
    
    setLoading(false);
  };

  const saveEntries = async (newEntries: JournalEntry[], autoSave = false) => {
    if (autoSave) {
      setAutoSaving(true);
    }

    const result = await fileStorage.writeEntries(newEntries);
    
    if (result.success) {
      setEntries(newEntries);
      setError(null);
    } else {
      setError(result.error || 'Failed to save entries');
    }
    
    if (autoSave) {
      setAutoSaving(false);
    }
    
    return result.success;
  };

  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    
    const newEntries = [newEntry, ...entries];
    
    // Auto-save individual entry
    await fileStorage.autoSaveEntry(newEntry);
    
    // Save all entries with auto-save flag
    return await saveEntries(newEntries, true);
  };

  const updateEntry = async (id: string, updates: Partial<JournalEntry>) => {
    const updatedEntry = entries.find(e => e.id === id);
    if (updatedEntry) {
      const newEntry = { ...updatedEntry, ...updates, updatedAt: new Date().toISOString() };
      
      // Auto-save individual entry
      await fileStorage.autoSaveEntry(newEntry);
    }

    const newEntries = entries.map(entry => 
      entry.id === id 
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    );
    
    return await saveEntries(newEntries, true);
  };

  const deleteEntry = async (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    return await saveEntries(newEntries, true);
  };

  const exportData = async () => {
    await fileStorage.exportData();
  };

  const downloadEntry = (entry: JournalEntry) => {
    fileStorage.downloadEntry(entry);
  };

  const importData = async (file: File) => {
    const result = await fileStorage.importData(file);
    
    if (result.success && result.data) {
      await saveEntries(result.data);
      return true;
    } else {
      setError(result.error || 'Failed to import data');
      return false;
    }
  };

  return {
    entries,
    loading,
    error,
    autoSaving,
    addEntry,
    updateEntry,
    deleteEntry,
    exportData,
    downloadEntry,
    importData,
    refreshEntries: loadEntries
  };
}