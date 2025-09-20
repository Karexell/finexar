import { useState, useCallback, useEffect } from 'react';
import { useHistory } from './useHistory';
import { useTranslation } from './useTranslation';

export const useCalculator = (calculatorType) => {
  const { addCalculation } = useHistory();
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({});
  const [outputs, setOutputs] = useState({});
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Update input value
  const updateInput = useCallback((fieldName, value) => {
    setInputs(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  }, [errors]);

  // Update multiple inputs
  const updateInputs = useCallback((newInputs) => {
    setInputs(prev => ({
      ...prev,
      ...newInputs,
    }));
  }, []);

  // Set error for a field
  const setError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Validate input
  const validateInput = useCallback((fieldName, value, rules = {}) => {
    const { required, min, max, pattern, custom } = rules;
    
    if (required && (!value || value.toString().trim() === '')) {
      return t('fieldRequired');
    }
    
    if (value && !isNaN(value)) {
      const numValue = parseFloat(value);
      
      if (min !== undefined && numValue < min) {
        return t('valueTooSmall', { min });
      }
      
      if (max !== undefined && numValue > max) {
        return t('valueTooLarge', { max });
      }
    }
    
    if (pattern && value && !pattern.test(value)) {
      return t('invalidFormat');
    }
    
    if (custom && typeof custom === 'function') {
      const customError = custom(value);
      if (customError) {
        return customError;
      }
    }
    
    return null;
  }, [t]);

  // Validate all inputs
  const validateInputs = useCallback((validationRules) => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
      const value = inputs[fieldName];
      const rules = validationRules[fieldName];
      const error = validateInput(fieldName, value, rules);
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [inputs, validateInput]);

  // Calculate results
  const calculate = useCallback(async (calculationFunction, validationRules = {}) => {
    try {
      setIsCalculating(true);
      clearErrors();
      
      // Validate inputs if rules provided
      if (Object.keys(validationRules).length > 0) {
        const isValid = validateInputs(validationRules);
        if (!isValid) {
          return null;
        }
      }
      
      // Perform calculation
      const results = await calculationFunction(inputs);
      
      if (results) {
        setOutputs(results);
        return results;
      }
      
      return null;
    } catch (error) {
      console.warn('Calculation error:', error);
      setError('general', error.message || t('calculationError'));
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [inputs, validateInputs, clearErrors, setError, t]);

  // Save calculation to history
  const saveToHistory = useCallback(async (calculatorName, category) => {
    try {
      const calculation = {
        calculatorType,
        calculatorName,
        category,
        inputs: Object.entries(inputs).map(([key, value]) => ({
          field: key,
          label: key,
          value: value,
        })),
        outputs: Object.entries(outputs).map(([key, value]) => ({
          field: key,
          label: key,
          value: value,
        })),
      };
      
      const saved = await addCalculation(calculation);
      return saved;
    } catch (error) {
      console.warn('Error saving to history:', error);
      return null;
    }
  }, [calculatorType, inputs, outputs, addCalculation]);

  // Reset calculator
  const reset = useCallback(() => {
    setInputs({});
    setOutputs({});
    setErrors({});
    setIsCalculating(false);
  }, []);

  // Format number for display
  const formatNumber = useCallback((value, options = {}) => {
    if (value === null || value === undefined || value === '') {
      return '0';
    }
    
    const {
      decimals = 2,
      currency = false,
      percentage = false,
      locale = 'en-US',
    } = options;
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      return '0';
    }
    
    if (currency) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(numValue);
    }
    
    if (percentage) {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(numValue / 100);
    }
    
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numValue);
  }, []);

  // Check if calculator has any inputs
  const hasInputs = Object.keys(inputs).length > 0;
  
  // Check if calculator has any outputs
  const hasOutputs = Object.keys(outputs).length > 0;
  
  // Check if calculator has any errors
  const hasErrors = Object.keys(errors).length > 0;

  return {
    // State
    inputs,
    outputs,
    errors,
    isCalculating,
    
    // Actions
    updateInput,
    updateInputs,
    setError,
    clearErrors,
    validateInput,
    validateInputs,
    calculate,
    saveToHistory,
    reset,
    
    // Utilities
    formatNumber,
    
    // Status
    hasInputs,
    hasOutputs,
    hasErrors,
  };
};

export default useCalculator;
