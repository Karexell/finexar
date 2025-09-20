// Mock the calculation function
const mockCalculateCompoundInterest = async (inputs) => {
  const { principal, rate, time, compounding } = inputs;
  
  const principalAmount = parseFloat(principal);
  const interestRate = parseFloat(rate);
  const timePeriod = parseFloat(time);
  const compoundingFrequency = parseFloat(compounding);
  
  if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod) || isNaN(compoundingFrequency)) {
    throw new Error('Invalid input values');
  }
  
  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const rateDecimal = interestRate / 100;
  const total = principalAmount * Math.pow(1 + (rateDecimal / compoundingFrequency), compoundingFrequency * timePeriod);
  const interest = total - principalAmount;
  
  // Effective Annual Rate: (1 + r/n)^n - 1
  const effectiveRate = (Math.pow(1 + (rateDecimal / compoundingFrequency), compoundingFrequency) - 1) * 100;
  
  return {
    interest: interest,
    total: total,
    effectiveRate: effectiveRate,
  };
};

describe('Compound Interest Calculator', () => {
  test('calculates compound interest correctly', async () => {
    const inputs = {
      principal: '10000',
      rate: '5',
      time: '2',
      compounding: '12',
    };
    
    const result = await mockCalculateCompoundInterest(inputs);
    
    // Expected values for monthly compounding
    expect(result.interest).toBeCloseTo(1047.13, 2);
    expect(result.total).toBeCloseTo(11047.13, 2);
    expect(result.effectiveRate).toBeCloseTo(5.12, 2);
  });

  test('handles annual compounding', async () => {
    const inputs = {
      principal: '1000',
      rate: '10',
      time: '1',
      compounding: '1',
    };
    
    const result = await mockCalculateCompoundInterest(inputs);
    
    expect(result.interest).toBeCloseTo(100, 2); // 1000 * 0.1
    expect(result.total).toBeCloseTo(1100, 2); // 1000 + 100
    expect(result.effectiveRate).toBeCloseTo(10, 2);
  });

  test('handles quarterly compounding', async () => {
    const inputs = {
      principal: '5000',
      rate: '8',
      time: '1',
      compounding: '4',
    };
    
    const result = await mockCalculateCompoundInterest(inputs);
    
    expect(result.interest).toBeCloseTo(412.16, 2);
    expect(result.total).toBeCloseTo(5412.16, 2);
    expect(result.effectiveRate).toBeCloseTo(8.24, 2);
  });

  test('handles zero interest rate', async () => {
    const inputs = {
      principal: '1000',
      rate: '0',
      time: '2',
      compounding: '12',
    };
    
    const result = await mockCalculateCompoundInterest(inputs);
    
    expect(result.interest).toBe(0);
    expect(result.total).toBe(1000);
    expect(result.effectiveRate).toBe(0);
  });

  test('throws error for invalid inputs', async () => {
    const inputs = {
      principal: 'invalid',
      rate: '5',
      time: '2',
      compounding: '12',
    };
    
    await expect(mockCalculateCompoundInterest(inputs)).rejects.toThrow('Invalid input values');
  });

  test('handles large numbers', async () => {
    const inputs = {
      principal: '1000000',
      rate: '3',
      time: '10',
      compounding: '12',
    };
    
    const result = await mockCalculateCompoundInterest(inputs);
    
    expect(result.interest).toBeCloseTo(349304.35, 2);
    expect(result.total).toBeCloseTo(1349304.35, 2);
    expect(result.effectiveRate).toBeCloseTo(3.04, 2);
  });
});
