import { renderHook, act } from '@testing-library/react-hooks';
import { useCalculator } from '../../src/hooks/useCalculator';

// Mock the useHistory hook
jest.mock('../../src/hooks/useHistory', () => ({
  useHistory: () => ({
    addCalculation: jest.fn(() => Promise.resolve({ id: '1' })),
  }),
}));

// Mock the useTranslation hook
jest.mock('../../src/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('useCalculator Hook', () => {
  test('initializes with empty state', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    expect(result.current.inputs).toEqual({});
    expect(result.current.outputs).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.hasInputs).toBe(false);
    expect(result.current.hasOutputs).toBe(false);
    expect(result.current.hasErrors).toBe(false);
  });

  test('updates input value', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    act(() => {
      result.current.updateInput('principal', '1000');
    });
    
    expect(result.current.inputs.principal).toBe('1000');
    expect(result.current.hasInputs).toBe(true);
  });

  test('updates multiple inputs', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    act(() => {
      result.current.updateInputs({
        principal: '1000',
        rate: '5',
        time: '2',
      });
    });
    
    expect(result.current.inputs).toEqual({
      principal: '1000',
      rate: '5',
      time: '2',
    });
  });

  test('sets and clears errors', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    act(() => {
      result.current.setError('principal', 'Invalid value');
    });
    
    expect(result.current.errors.principal).toBe('Invalid value');
    expect(result.current.hasErrors).toBe(true);
    
    act(() => {
      result.current.clearErrors();
    });
    
    expect(result.current.errors).toEqual({});
    expect(result.current.hasErrors).toBe(false);
  });

  test('validates input correctly', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    // Test required validation
    const requiredError = result.current.validateInput('principal', '', { required: true });
    expect(requiredError).toBe('fieldRequired');
    
    // Test min validation
    const minError = result.current.validateInput('rate', '5', { min: 10 });
    expect(minError).toBe('valueTooSmall');
    
    // Test max validation
    const maxError = result.current.validateInput('rate', '15', { max: 10 });
    expect(maxError).toBe('valueTooLarge');
    
    // Test valid input
    const noError = result.current.validateInput('rate', '8', { min: 5, max: 10 });
    expect(noError).toBeNull();
  });

  test('validates all inputs', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    act(() => {
      result.current.updateInputs({
        principal: '1000',
        rate: '5',
        time: '2',
      });
    });
    
    const validationRules = {
      principal: { required: true, min: 0.01 },
      rate: { required: true, min: 0, max: 100 },
      time: { required: true, min: 0.01 },
    };
    
    act(() => {
      const isValid = result.current.validateInputs(validationRules);
      expect(isValid).toBe(true);
    });
    
    expect(result.current.errors).toEqual({});
  });

  test('calculates results successfully', async () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    const mockCalculationFunction = jest.fn().mockResolvedValue({
      interest: 100,
      total: 1100,
    });
    
    act(() => {
      result.current.updateInputs({
        principal: '1000',
        rate: '10',
        time: '1',
      });
    });
    
    let calculationResult;
    await act(async () => {
      calculationResult = await result.current.calculate(mockCalculationFunction);
    });
    
    expect(calculationResult).toEqual({
      interest: 100,
      total: 1100,
    });
    expect(result.current.outputs).toEqual({
      interest: 100,
      total: 1100,
    });
    expect(result.current.hasOutputs).toBe(true);
    expect(mockCalculationFunction).toHaveBeenCalledWith({
      principal: '1000',
      rate: '10',
      time: '1',
    });
  });

  test('handles calculation errors', async () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    const mockCalculationFunction = jest.fn().mockRejectedValue(new Error('Calculation failed'));
    
    act(() => {
      result.current.updateInputs({
        principal: '1000',
        rate: '10',
        time: '1',
      });
    });
    
    await act(async () => {
      const calculationResult = await result.current.calculate(mockCalculationFunction);
      expect(calculationResult).toBeNull();
    });
    
    expect(result.current.errors.general).toBe('Calculation failed');
    expect(result.current.hasErrors).toBe(true);
  });

  test('formats numbers correctly', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    // Test currency formatting
    const currencyFormatted = result.current.formatNumber(1234.56, { currency: true });
    expect(currencyFormatted).toMatch(/\$1,234\.56/);
    
    // Test percentage formatting
    const percentageFormatted = result.current.formatNumber(5.5, { percentage: true });
    expect(percentageFormatted).toMatch(/5\.50%/);
    
    // Test decimal formatting
    const decimalFormatted = result.current.formatNumber(1234.567, { decimals: 2 });
    expect(decimalFormatted).toBe('1,234.57');
    
    // Test invalid input
    const invalidFormatted = result.current.formatNumber('invalid');
    expect(invalidFormatted).toBe('0');
  });

  test('resets calculator state', () => {
    const { result } = renderHook(() => useCalculator('test-calculator'));
    
    // Set some state
    act(() => {
      result.current.updateInputs({ principal: '1000' });
      result.current.setError('principal', 'Error');
    });
    
    // Reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.inputs).toEqual({});
    expect(result.current.outputs).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.isCalculating).toBe(false);
  });
});
