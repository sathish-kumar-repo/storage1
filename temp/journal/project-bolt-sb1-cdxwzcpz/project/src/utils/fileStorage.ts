// File storage utilities for journal data
export interface StorageResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class FileStorage {
  private baseUrl = '/data';

  async readEntries(): Promise<StorageResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/entries.json`);
      if (!response.ok) {
        if (response.status === 404) {
          // File doesn't exist yet, return empty array
          return { success: true, data: [] };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error reading entries:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async writeEntries(entries: any[]): Promise<StorageResponse<void>> {
    try {
      // Store in localStorage as primary storage
      const data = JSON.stringify(entries, null, 2);
      localStorage.setItem('journal-file-data', data);
      
      // Auto-download backup file
      this.autoDownloadBackup(entries);
      
      return { success: true };
    } catch (error) {
      console.error('Error writing entries:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private autoDownloadBackup(entries: any[]) {
    try {
      const dataStr = JSON.stringify(entries, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `journal-auto-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      // Store the download link for manual access
      this.storeDownloadLink(url, link.download);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating auto backup:', error);
    }
  }

  private storeDownloadLink(url: string, filename: string) {
    const downloads = this.getStoredDownloads();
    downloads.unshift({
      url,
      filename,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });
    
    // Keep only last 10 backups
    const recentDownloads = downloads.slice(0, 10);
    localStorage.setItem('journal-downloads', JSON.stringify(recentDownloads));
  }

  getStoredDownloads() {
    try {
      const stored = localStorage.getItem('journal-downloads');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  async downloadBackup(filename?: string): Promise<void> {
    const result = await this.readEntries();
    if (result.success && result.data) {
      const dataStr = JSON.stringify(result.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `journal-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  async exportData(): Promise<void> {
    await this.downloadBackup(`journal-export-${new Date().toISOString().split('T')[0]}.json`);
  }

  async importData(file: File): Promise<StorageResponse<any[]>> {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid file format: expected an array of entries');
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Invalid JSON file' };
    }
  }

  // Auto-save individual entry
  async autoSaveEntry(entry: any): Promise<void> {
    try {
      const dataStr = JSON.stringify(entry, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `entry-${entry.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
      
      // Store for manual download later
      const autoSaves = this.getAutoSavedEntries();
      autoSaves.unshift({
        id: entry.id,
        title: entry.title,
        url,
        filename: link.download,
        timestamp: new Date().toISOString()
      });
      
      localStorage.setItem('journal-auto-saves', JSON.stringify(autoSaves.slice(0, 20)));
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error auto-saving entry:', error);
    }
  }

  getAutoSavedEntries() {
    try {
      const stored = localStorage.getItem('journal-auto-saves');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  downloadEntry(entry: any) {
    const dataStr = JSON.stringify(entry, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `entry-${entry.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${entry.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const fileStorage = new FileStorage();