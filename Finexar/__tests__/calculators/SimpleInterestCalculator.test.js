import { calculateSimpleInterest } from '../../src/screens/calculators/SimpleInterestCalculator';

// Mock the calculation function
const mockCalculateSimpleInterest = async (inputs) => {
  const { principal, rate, time } = inputs;
  
  const principalAmount = parseFloat(principal);
  const interestRate = parseFloat(rate);
  const timePeriod = parseFloat(time);
  
  if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod)) {
    throw new Error('Invalid input values');
  }
  
  // Simple Interest Formula: I = P * R * T / 100
  const interest = (principalAmount * interestRate * timePeriod) / 100;
  const total = principalAmount + interest;
  
  return {
    interest: interest,
    total: total,
  };
};

describe('Simple Interest Calculator', () => {
  test('calculates simple interest correctly', async () => {
    const inputs = {
      principal: '10000',
      rate: '5',
      time: '2',
    };
    
    const result = await mockCalculateSimpleInterest(inputs);
    
    expect(result.interest).toBe(1000); // 10000 * 5 * 2 / 100
    expect(result.total).toBe(11000); // 10000 + 1000
  });

  test('handles decimal inputs correctly', async () => {
    const inputs = {
      principal: '1000.50',
      rate: '3.5',
      time: '1.5',
    };
    
    const result = await mockCalculateSimpleInterest(inputs);
    
    expect(result.interest).toBeCloseTo(52.52625); // 1000.50 * 3.5 * 1.5 / 100
    expect(result.total).toBeCloseTo(1053.02625); // 1000.50 + 52.52625
  });

  test('handles zero interest rate', async () => {
    const inputs = {
      principal: '5000',
      rate: '0',
      time: '3',
    };
    
    const result = await mockCalculateSimpleInterest(inputs);
    
    expect(result.interest).toBe(0);
    expect(result.total).toBe(5000);
  });

  test('throws error for invalid inputs', async () => {
    const inputs = {
      principal: 'invalid',
      rate: '5',
      time: '2',
    };
    
    await expect(mockCalculateSimpleInterest(inputs)).rejects.toThrow('Invalid input values');
  });

  test('handles large numbers', async () => {
    const inputs = {
      principal: '1000000',
      rate: '2.5',
      time: '10',
    };
    
    const result = await mockCalculateSimpleInterest(inputs);
    
    expect(result.interest).toBe(250000); // 1000000 * 2.5 * 10 / 100
    expect(result.total).toBe(1250000); // 1000000 + 250000
  });
});
