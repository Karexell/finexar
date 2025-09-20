import storageService from '../../src/services/storageService';

// Mock AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock the storage service
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Language Storage', () => {
    test('gets default language when none stored', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);
      
      const language = await storageService.getLanguage();
      
      expect(language).toBe('en');
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('user-language');
    });

    test('gets stored language', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify('ar'));
      
      const language = await storageService.getLanguage();
      
      expect(language).toBe('ar');
    });

    test('sets language', async () => {
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const result = await storageService.setLanguage('fr');
      
      expect(result).toBe(true);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('user-language', JSON.stringify('fr'));
    });
  });

  describe('History Storage', () => {
    test('gets empty history when none stored', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);
      
      const history = await storageService.getHistory();
      
      expect(history).toEqual([]);
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('calculation-history');
    });

    test('gets stored history', async () => {
      const mockHistory = [
        { id: '1', calculatorName: 'Simple Interest', timestamp: '2023-01-01' },
        { id: '2', calculatorName: 'Compound Interest', timestamp: '2023-01-02' },
      ];
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockHistory));
      
      const history = await storageService.getHistory();
      
      expect(history).toEqual(mockHistory);
    });

    test('adds calculation to history', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const calculation = {
        calculatorName: 'Simple Interest',
        inputs: [{ field: 'principal', value: '1000' }],
        outputs: [{ field: 'interest', value: '50' }],
      };
      
      const result = await storageService.addToHistory(calculation);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('timestamp');
      expect(result.calculatorName).toBe('Simple Interest');
      expect(mockAsyncStorage.setItem).toHaveBeenCalled();
    });

    test('limits history to 100 items', async () => {
      const largeHistory = Array.from({ length: 100 }, (_, i) => ({
        id: i.toString(),
        calculatorName: `Calculator ${i}`,
        timestamp: new Date().toISOString(),
      }));
      
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(largeHistory));
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const calculation = {
        calculatorName: 'New Calculator',
        inputs: [],
        outputs: [],
      };
      
      await storageService.addToHistory(calculation);
      
      const setItemCall = mockAsyncStorage.setItem.mock.calls[0];
      const savedHistory = JSON.parse(setItemCall[1]);
      
      expect(savedHistory).toHaveLength(100);
      expect(savedHistory[0].calculatorName).toBe('New Calculator');
    });

    test('clears history', async () => {
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const result = await storageService.clearHistory();
      
      expect(result).toBe(true);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('calculation-history', JSON.stringify([]));
    });

    test('removes calculation from history', async () => {
      const mockHistory = [
        { id: '1', calculatorName: 'Calculator 1' },
        { id: '2', calculatorName: 'Calculator 2' },
        { id: '3', calculatorName: 'Calculator 3' },
      ];
      
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockHistory));
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const result = await storageService.removeFromHistory('2');
      
      expect(result).toBe(true);
      const setItemCall = mockAsyncStorage.setItem.mock.calls[0];
      const updatedHistory = JSON.parse(setItemCall[1]);
      expect(updatedHistory).toHaveLength(2);
      expect(updatedHistory.find(item => item.id === '2')).toBeUndefined();
    });
  });

  describe('Settings Storage', () => {
    test('gets default settings when none stored', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);
      
      const settings = await storageService.getSettings();
      
      expect(settings).toEqual({
        autoSave: true,
        showNotifications: true,
        defaultCurrency: 'USD',
        numberFormat: 'en-US',
      });
    });

    test('updates settings', async () => {
      const currentSettings = {
        autoSave: true,
        showNotifications: true,
        defaultCurrency: 'USD',
        numberFormat: 'en-US',
      };
      
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(currentSettings));
      mockAsyncStorage.setItem.mockResolvedValue();
      
      const newSettings = { defaultCurrency: 'EUR' };
      const result = await storageService.updateSettings(newSettings);
      
      expect(result.defaultCurrency).toBe('EUR');
      expect(result.autoSave).toBe(true); // Should preserve existing settings
    });
  });

  describe('Error Handling', () => {
    test('handles storage errors gracefully', async () => {
      mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      
      const result = await storageService.getLanguage();
      
      expect(result).toBe('en'); // Should return default value
    });

    test('handles setItem errors gracefully', async () => {
      mockAsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));
      
      const result = await storageService.setLanguage('fr');
      
      expect(result).toBe(false);
    });
  });
});
