import React, { memo, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import BaseCalculator from '../../components/calculators/BaseCalculator';

const LoanPaymentCalculator = memo(() => {
  const { t } = useTranslation();

  // Input field configurations
  const inputFields = [
    {
      name: 'principal',
      label: t('principal'),
      placeholder: '100000',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'rate',
      label: t('rate'),
      placeholder: '4.5',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'term',
      label: t('term'),
      placeholder: '30',
      keyboardType: 'numeric',
      required: true,
    },
  ];

  // Output field configurations
  const outputFields = [
    {
      name: 'monthlyPayment',
      label: t('monthlyPayment'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
    {
      name: 'totalInterest',
      label: t('totalInterest'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
    {
      name: 'totalPayment',
      label: t('totalPayment'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
  ];

  // Validation rules
  const validationRules = {
    principal: {
      required: true,
      min: 0.01,
    },
    rate: {
      required: true,
      min: 0,
      max: 100,
    },
    term: {
      required: true,
      min: 0.01,
    },
  };

  // Calculation function
  const calculateLoanPayment = useCallback(async (inputs) => {
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
  }, []);

  return (
    <BaseCalculator
      calculatorType="loan-payment"
      calculatorName={t('loanPayment')}
      category="loan"
      inputFields={inputFields}
      outputFields={outputFields}
      calculationFunction={calculateLoanPayment}
      validationRules={validationRules}
    />
  );
});

LoanPaymentCalculator.displayName = 'LoanPaymentCalculator';

export default LoanPaymentCalculator;
