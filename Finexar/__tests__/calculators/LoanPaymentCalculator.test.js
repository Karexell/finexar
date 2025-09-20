// Mock the calculation function
const mockCalculateLoanPayment = async (inputs) => {
  const { principal, rate, term } = inputs;
  
  const principalAmount = parseFloat(principal);
  const annualRate = parseFloat(rate);
  const termYears = parseFloat(term);
  
  if (isNaN(principalAmount) || isNaN(annualRate) || isNaN(termYears)) {
    throw new Error('Invalid input values');
  }
  
  // Monthly interest rate
  const monthlyRate = annualRate / 100 / 12;
  
  // Number of monthly payments
  const numberOfPayments = termYears * 12;
  
  // Monthly payment calculation using the standard loan payment formula
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment;
  
  if (monthlyRate === 0) {
    // If no interest, just divide principal by number of payments
    monthlyPayment = principalAmount / numberOfPayments;
  } else {
    const rateFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPayment = principalAmount * (monthlyRate * rateFactor) / (rateFactor - 1);
  }
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principalAmount;
  
  return {
    monthlyPayment: monthlyPayment,
    totalInterest: totalInterest,
    totalPayment: totalPayment,
  };
};

describe('Loan Payment Calculator', () => {
  test('calculates loan payment correctly', async () => {
    const inputs = {
      principal: '100000',
      rate: '5',
      term: '30',
    };
    
    const result = await mockCalculateLoanPayment(inputs);
    
    expect(result.monthlyPayment).toBeCloseTo(536.82, 2);
    expect(result.totalInterest).toBeCloseTo(93255.20, 2);
    expect(result.totalPayment).toBeCloseTo(193255.20, 2);
  });

  test('handles zero interest rate', async () => {
    const inputs = {
      principal: '12000',
      rate: '0',
      term: '1',
    };
    
    const result = await mockCalculateLoanPayment(inputs);
    
    expect(result.monthlyPayment).toBe(1000); // 12000 / 12
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(12000);
  });

  test('handles short term loan', async () => {
    const inputs = {
      principal: '10000',
      rate: '6',
      term: '2',
    };
    
    const result = await mockCalculateLoanPayment(inputs);
    
    expect(result.monthlyPayment).toBeCloseTo(443.21, 2);
    expect(result.totalInterest).toBeCloseTo(636.96, 2);
    expect(result.totalPayment).toBeCloseTo(10636.96, 2);
  });

  test('handles high interest rate', async () => {
    const inputs = {
      principal: '50000',
      rate: '15',
      term: '5',
    };
    
    const result = await mockCalculateLoanPayment(inputs);
    
    expect(result.monthlyPayment).toBeCloseTo(1189.50, 2);
    expect(result.totalInterest).toBeCloseTo(21370.00, 2);
    expect(result.totalPayment).toBeCloseTo(71370.00, 2);
  });

  test('throws error for invalid inputs', async () => {
    const inputs = {
      principal: 'invalid',
      rate: '5',
      term: '30',
    };
    
    await expect(mockCalculateLoanPayment(inputs)).rejects.toThrow('Invalid input values');
  });

  test('handles large loan amount', async () => {
    const inputs = {
      principal: '1000000',
      rate: '4.5',
      term: '30',
    };
    
    const result = await mockCalculateLoanPayment(inputs);
    
    expect(result.monthlyPayment).toBeCloseTo(5066.85, 2);
    expect(result.totalInterest).toBeCloseTo(824066.00, 2);
    expect(result.totalPayment).toBeCloseTo(1824066.00, 2);
  });
});
