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
      // In a real application, this would need a backend API
      // For now, we'll use localStorage as a fallback but structure it like file storage
      const data = JSON.stringify(entries, null, 2);
      localStorage.setItem('journal-file-data', data);
      
      // Also try to download the file for backup
      this.downloadBackup(entries);
      
      return { success: true };
    } catch (error) {
      console.error('Error writing entries:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private downloadBackup(entries: any[]) {
    try {
      const dataStr = JSON.stringify(entries, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      // Create a temporary download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `journal-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      // Only auto-download on manual save, not on every change
      // This prevents spam downloads
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  }

  async exportData(): Promise<void> {
    const result = await this.readEntries();
    if (result.success && result.data) {
      const dataStr = JSON.stringify(result.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `journal-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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
}

export const fileStorage = new FileStorage();