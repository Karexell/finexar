import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Storage keys
const STORAGE_KEYS = {
  LANGUAGE: 'user-language',
  HISTORY: 'calculation-history',
  SETTINGS: 'user-settings',
  THEME: 'user-theme',
};

// Web fallback for localStorage
const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: (key) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
      clear: () => Promise.resolve(localStorage.clear()),
    };
  }
  return AsyncStorage;
};

const storage = getStorage();

class StorageService {
  // Generic storage methods
  async getItem(key) {
    try {
      const value = await storage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn(`Error getting item ${key}:`, error);
      return null;
    }
  }

  async setItem(key, value) {
    try {
      await storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error setting item ${key}:`, error);
      return false;
    }
  }

  async removeItem(key) {
    try {
      await storage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing item ${key}:`, error);
      return false;
    }
  }

  async clear() {
    try {
      await storage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing storage:', error);
      return false;
    }
  }

  // Language storage
  async getLanguage() {
    const language = await this.getItem(STORAGE_KEYS.LANGUAGE);
    return language || 'en';
  }

  async setLanguage(language) {
    return await this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  // History storage
  async getHistory() {
    const history = await this.getItem(STORAGE_KEYS.HISTORY);
    return history || [];
  }

  async addToHistory(calculation) {
    try {
      const history = await this.getHistory();
      const newCalculation = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...calculation,
      };
      
      // Add to beginning of array (newest first)
      const updatedHistory = [newCalculation, ...history];
      
      // Limit history to 100 items
      const limitedHistory = updatedHistory.slice(0, 100);
      
      await this.setItem(STORAGE_KEYS.HISTORY, limitedHistory);
      return newCalculation;
    } catch (error) {
      console.warn('Error adding to history:', error);
      return null;
    }
  }

  async clearHistory() {
    return await this.setItem(STORAGE_KEYS.HISTORY, []);
  }

  async removeFromHistory(calculationId) {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter(item => item.id !== calculationId);
      await this.setItem(STORAGE_KEYS.HISTORY, updatedHistory);
      return true;
    } catch (error) {
      console.warn('Error removing from history:', error);
      return false;
    }
  }

  // Settings storage
  async getSettings() {
    const settings = await this.getItem(STORAGE_KEYS.SETTINGS);
    return settings || {
      autoSave: true,
      showNotifications: true,
      defaultCurrency: 'USD',
      numberFormat: 'en-US',
    };
  }

  async updateSettings(newSettings) {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      await this.setItem(STORAGE_KEYS.SETTINGS, updatedSettings);
      return updatedSettings;
    } catch (error) {
      console.warn('Error updating settings:', error);
      return null;
    }
  }

  // Theme storage (for future use)
  async getTheme() {
    const theme = await this.getItem(STORAGE_KEYS.THEME);
    return theme || 'dark';
  }

  async setTheme(theme) {
    return await this.setItem(STORAGE_KEYS.THEME, theme);
  }

  // Data migration
  async migrateData() {
    try {
      // Check if migration is needed
      const migrationVersion = await this.getItem('migration-version');
      const currentVersion = '1.0.0';
      
      if (migrationVersion !== currentVersion) {
        console.log('Migrating data to version:', currentVersion);
        
        // Perform any necessary data migrations here
        // For now, just update the version
        await this.setItem('migration-version', currentVersion);
        
        console.log('Data migration completed');
      }
    } catch (error) {
      console.warn('Error during data migration:', error);
    }
  }

  // Storage health check
  async healthCheck() {
    try {
      const testKey = 'health-check';
      const testValue = { timestamp: Date.now() };
      
      await this.setItem(testKey, testValue);
      const retrieved = await this.getItem(testKey);
      await this.removeItem(testKey);
      
      return retrieved && retrieved.timestamp === testValue.timestamp;
    } catch (error) {
      console.warn('Storage health check failed:', error);
      return false;
    }
  }

  // Get storage usage (web only)
  async getStorageUsage() {
    if (Platform.OS === 'web') {
      try {
        let totalSize = 0;
        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length;
          }
        }
        return {
          used: totalSize,
          available: 'unknown', // Browser doesn't provide this info
        };
      } catch (error) {
        console.warn('Error getting storage usage:', error);
        return null;
      }
    }
    return null;
  }
}

// Create singleton instance
const storageService = new StorageService();

// Initialize storage service
storageService.migrateData();

export default storageService;
