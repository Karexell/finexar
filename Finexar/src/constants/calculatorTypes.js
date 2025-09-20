// Calculator Categories and Types
export const calculatorCategories = {
  BASIC: {
    id: 'basic',
    name: 'Basic Financial',
    icon: 'calculator',
    color: '#4A90E2',
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced Financial',
    icon: 'trending-up',
    color: '#7B68EE',
  },
  INVESTMENT: {
    id: 'investment',
    name: 'Investment',
    icon: 'pie-chart',
    color: '#4CAF50',
  },
  LOAN: {
    id: 'loan',
    name: 'Loan & Mortgage',
    icon: 'home',
    color: '#FF9800',
  },
  RETIREMENT: {
    id: 'retirement',
    name: 'Retirement Planning',
    icon: 'clock',
    color: '#9C27B0',
  },
  TAX: {
    id: 'tax',
    name: 'Tax Calculations',
    icon: 'file-text',
    color: '#F44336',
  },
  CURRENCY: {
    id: 'currency',
    name: 'Currency & Exchange',
    icon: 'dollar-sign',
    color: '#00BCD4',
  },
};

// Individual Calculator Types
export const calculatorTypes = {
  // Basic Financial Calculators
  SIMPLE_INTEREST: {
    id: 'simple-interest',
    name: 'Simple Interest',
    category: calculatorCategories.BASIC,
    description: 'Calculate simple interest on principal amount',
    icon: 'percent',
    inputs: ['principal', 'rate', 'time'],
    outputs: ['interest', 'total'],
  },
  COMPOUND_INTEREST: {
    id: 'compound-interest',
    name: 'Compound Interest',
    category: calculatorCategories.BASIC,
    description: 'Calculate compound interest with different compounding periods',
    icon: 'trending-up',
    inputs: ['principal', 'rate', 'time', 'compounding'],
    outputs: ['interest', 'total'],
  },
  PRESENT_VALUE: {
    id: 'present-value',
    name: 'Present Value',
    category: calculatorCategories.ADVANCED,
    description: 'Calculate present value of future cash flows',
    icon: 'dollar-sign',
    inputs: ['futureValue', 'rate', 'time'],
    outputs: ['presentValue'],
  },
  FUTURE_VALUE: {
    id: 'future-value',
    name: 'Future Value',
    category: calculatorCategories.ADVANCED,
    description: 'Calculate future value of present investment',
    icon: 'trending-up',
    inputs: ['presentValue', 'rate', 'time'],
    outputs: ['futureValue'],
  },
  
  // Loan Calculators
  LOAN_PAYMENT: {
    id: 'loan-payment',
    name: 'Loan Payment',
    category: calculatorCategories.LOAN,
    description: 'Calculate monthly loan payments',
    icon: 'credit-card',
    inputs: ['principal', 'rate', 'term'],
    outputs: ['monthlyPayment', 'totalInterest', 'totalPayment'],
  },
  MORTGAGE: {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: calculatorCategories.LOAN,
    description: 'Calculate mortgage payments and amortization',
    icon: 'home',
    inputs: ['homePrice', 'downPayment', 'rate', 'term'],
    outputs: ['monthlyPayment', 'totalInterest', 'totalPayment'],
  },
  
  // Investment Calculators
  INVESTMENT_RETURN: {
    id: 'investment-return',
    name: 'Investment Return',
    category: calculatorCategories.INVESTMENT,
    description: 'Calculate investment returns and performance',
    icon: 'pie-chart',
    inputs: ['initialInvestment', 'currentValue', 'time'],
    outputs: ['return', 'returnPercentage'],
  },
  ANNUITY: {
    id: 'annuity',
    name: 'Annuity Calculator',
    category: calculatorCategories.INVESTMENT,
    description: 'Calculate annuity payments and values',
    icon: 'repeat',
    inputs: ['payment', 'rate', 'time'],
    outputs: ['presentValue', 'futureValue'],
  },
  
  // Retirement Planning
  RETIREMENT_PLANNING: {
    id: 'retirement-planning',
    name: 'Retirement Planning',
    category: calculatorCategories.RETIREMENT,
    description: 'Plan for retirement savings and income',
    icon: 'clock',
    inputs: ['currentAge', 'retirementAge', 'currentSavings', 'monthlyContribution', 'expectedReturn'],
    outputs: ['retirementSavings', 'monthlyIncome'],
  },
  
  // Tax Calculators
  TAX_CALCULATOR: {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    category: calculatorCategories.TAX,
    description: 'Calculate income tax and deductions',
    icon: 'file-text',
    inputs: ['income', 'deductions', 'filingStatus'],
    outputs: ['taxableIncome', 'taxOwed', 'effectiveRate'],
  },
  
  // Currency
  CURRENCY_CONVERTER: {
    id: 'currency-converter',
    name: 'Currency Converter',
    category: calculatorCategories.CURRENCY,
    description: 'Convert between different currencies',
    icon: 'dollar-sign',
    inputs: ['amount', 'fromCurrency', 'toCurrency'],
    outputs: ['convertedAmount'],
  },
};

// Get calculators by category
export const getCalculatorsByCategory = (categoryId) => {
  return Object.values(calculatorTypes).filter(calc => calc.category.id === categoryId);
};

// Get all calculator categories
export const getAllCategories = () => {
  return Object.values(calculatorCategories);
};

// Get all calculator types
export const getAllCalculatorTypes = () => {
  return Object.values(calculatorTypes);
};

export default calculatorTypes;
