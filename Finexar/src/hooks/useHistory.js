import { useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load history from storage
  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const storedHistory = await storageService.getHistory();
      setHistory(storedHistory);
    } catch (err) {
      console.warn('Error loading history:', err);
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add calculation to history
  const addCalculation = useCallback(async (calculation) => {
    try {
      setError(null);
      const newCalculation = await storageService.addToHistory(calculation);
      if (newCalculation) {
        setHistory(prev => [newCalculation, ...prev]);
        return newCalculation;
      }
      return null;
    } catch (err) {
      console.warn('Error adding calculation to history:', err);
      setError(err.message || 'Failed to save calculation');
      return null;
    }
  }, []);

  // Remove calculation from history
  const removeCalculation = useCallback(async (calculationId) => {
    try {
      setError(null);
      const success = await storageService.removeFromHistory(calculationId);
      if (success) {
        setHistory(prev => prev.filter(item => item.id !== calculationId));
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Error removing calculation from history:', err);
      setError(err.message || 'Failed to remove calculation');
      return false;
    }
  }, []);

  // Clear all history
  const clearHistory = useCallback(async () => {
    try {
      setError(null);
      const success = await storageService.clearHistory();
      if (success) {
        setHistory([]);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Error clearing history:', err);
      setError(err.message || 'Failed to clear history');
      return false;
    }
  }, []);

  // Get calculations by category
  const getCalculationsByCategory = useCallback((category) => {
    if (!category || category === 'all') {
      return history;
    }
    return history.filter(item => item.category === category);
  }, [history]);

  // Get calculations by search query
  const searchCalculations = useCallback((query) => {
    if (!query || query.trim() === '') {
      return history;
    }
    
    const lowercaseQuery = query.toLowerCase();
    return history.filter(item => 
      item.calculatorName?.toLowerCase().includes(lowercaseQuery) ||
      item.category?.toLowerCase().includes(lowercaseQuery) ||
      item.inputs?.some(input => 
        input.label?.toLowerCase().includes(lowercaseQuery) ||
        input.value?.toString().toLowerCase().includes(lowercaseQuery)
      ) ||
      item.outputs?.some(output => 
        output.label?.toLowerCase().includes(lowercaseQuery) ||
        output.value?.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
  }, [history]);

  // Get recent calculations (last N items)
  const getRecentCalculations = useCallback((limit = 10) => {
    return history.slice(0, limit);
  }, [history]);

  // Get calculation statistics
  const getStatistics = useCallback(() => {
    const total = history.length;
    const categories = {};
    const calculators = {};
    
    history.forEach(item => {
      // Count by category
      if (item.category) {
        categories[item.category] = (categories[item.category] || 0) + 1;
      }
      
      // Count by calculator
      if (item.calculatorName) {
        calculators[item.calculatorName] = (calculators[item.calculatorName] || 0) + 1;
      }
    });

    return {
      total,
      categories,
      calculators,
      mostUsedCategory: Object.keys(categories).reduce((a, b) => 
        categories[a] > categories[b] ? a : b, ''),
      mostUsedCalculator: Object.keys(calculators).reduce((a, b) => 
        calculators[a] > calculators[b] ? a : b, ''),
    };
  }, [history]);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    loading,
    error,
    addCalculation,
    removeCalculation,
    clearHistory,
    getCalculationsByCategory,
    searchCalculations,
    getRecentCalculations,
    getStatistics,
    refreshHistory: loadHistory,
  };
};

export default useHistory;
