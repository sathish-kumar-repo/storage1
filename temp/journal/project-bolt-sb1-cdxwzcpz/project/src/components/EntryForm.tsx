import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Upload, Download } from 'lucide-react';
import { JournalEntry } from '../types/journal';
import { MoodIcon } from './MoodIcon';
import { RichTextEditor } from './RichTextEditor';

interface EntryFormProps {
  entry?: JournalEntry;
  onSave: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const moods = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'bad', label: 'Bad' },
  { value: 'terrible', label: 'Terrible' }
] as const;

export function EntryForm({ entry, onSave, onCancel }: EntryFormProps) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [mood, setMood] = useState<typeof moods[number]['value']>(entry?.mood || 'neutral');
  const [date, setDate] = useState(entry?.date || new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState<string[]>(entry?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setMood(entry.mood);
      setDate(entry.date);
      setTags(entry.tags);
    }
  }, [entry]);

  // Auto-save functionality
  useEffect(() => {
    if (title.trim() && content.trim()) {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
      
      const timer = setTimeout(() => {
        autoSaveEntry();
      }, 3000); // Auto-save after 3 seconds of inactivity
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [title, content, mood, date, tags]);

  const autoSaveEntry = () => {
    if (!title.trim() || !content.trim()) return;
    
    const entryData = {
      title: title.trim(),
      content: content.trim(),
      mood,
      date,
      tags,
      autoSaved: true
    };
    
    // Save to localStorage as draft
    localStorage.setItem('journal-draft', JSON.stringify(entryData));
    
    // Create auto-save backup file
    const dataStr = JSON.stringify(entryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Store auto-save info
    const autoSaves = JSON.parse(localStorage.getItem('journal-auto-saves') || '[]');
    autoSaves.unshift({
      title: title.trim(),
      timestamp: new Date().toISOString(),
      url,
      filename: `auto-save-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.json`
    });
    
    localStorage.setItem('journal-auto-saves', JSON.stringify(autoSaves.slice(0, 10)));
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        mood,
        date,
        tags
      });
      
      // Clear draft after successful save
      localStorage.removeItem('journal-draft');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      addTag();
    }
  };

  const exportEntry = () => {
    const entryData = {
      title: title.trim(),
      content: content.trim(),
      mood,
      date,
      tags,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(entryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal-entry-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.title) setTitle(data.title);
        if (data.content) setContent(data.content);
        if (data.mood) setMood(data.mood);
        if (data.date) setDate(data.date);
        if (data.tags && Array.isArray(data.tags)) setTags(data.tags);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    e.target.value = '';
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('journal-draft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        setTitle(data.title || '');
        setContent(data.content || '');
        setMood(data.mood || 'neutral');
        setDate(data.date || new Date().toISOString().split('T')[0]);
        setTags(data.tags || []);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  };

  // Check for draft on mount
  useEffect(() => {
    if (!entry) {
      const draft = localStorage.getItem('journal-draft');
      if (draft && window.confirm('Found an auto-saved draft. Would you like to load it?')) {
        loadDraft();
      }
    }
  }, [entry]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {entry ? 'Edit Entry' : 'New Journal Entry'}
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".json"
              onChange={importEntry}
              className="hidden"
              id="import-entry"
            />
            <label
              htmlFor="import-entry"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                       text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 
                       transition-colors cursor-pointer"
              title="Import entry from JSON"
            >
              <Upload className="w-5 h-5" />
            </label>
            <button
              onClick={exportEntry}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                       text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Download entry as JSON"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                       text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(95vh-80px)]">
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Enter journal title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <div className="flex gap-3 flex-wrap">
                {moods.map((moodOption) => (
                  <button
                    key={moodOption.value}
                    type="button"
                    onClick={() => setMood(moodOption.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
                             ${mood === moodOption.value
                               ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                               : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                             }`}
                  >
                    <MoodIcon mood={moodOption.value} size="sm" />
                    <span className="text-sm font-medium">{moodOption.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your thoughts here..."
                className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                           transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 
                             text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-indigo-900 dark:hover:text-indigo-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 
                       text-white py-3 px-6 rounded-lg font-medium transition-colors 
                       flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : (entry ? 'Update Entry' : 'Save Entry')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}