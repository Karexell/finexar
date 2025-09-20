import React, { memo, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import BaseCalculator from '../../components/calculators/BaseCalculator';

const CompoundInterestCalculator = memo(() => {
  const { t } = useTranslation();

  // Input field configurations
  const inputFields = [
    {
      name: 'principal',
      label: t('principal'),
      placeholder: '10000',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'rate',
      label: t('rate'),
      placeholder: '5.5',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'time',
      label: t('time'),
      placeholder: '12',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'compounding',
      label: t('compounding'),
      placeholder: '12',
      keyboardType: 'numeric',
      required: true,
    },
  ];

  // Output field configurations
  const outputFields = [
    {
      name: 'interest',
      label: t('interest'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
    {
      name: 'total',
      label: t('total'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
    {
      name: 'effectiveRate',
      label: t('effectiveRate'),
      unit: '%',
      copyable: true,
      formatOptions: { percentage: true, decimals: 2 },
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
    time: {
      required: true,
      min: 0.01,
    },
    compounding: {
      required: true,
      min: 1,
    },
  };

  // Calculation function
  const calculateCompoundInterest = useCallback(async (inputs) => {
    const { principal, rate, time, compounding } = inputs;
    
    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate);
    const timePeriod = parseFloat(time);
    const compoundingFrequency = parseFloat(compounding);
    
    if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod) || isNaN(compoundingFrequency)) {
      throw new Error('Invalid input values');
    }
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    // Where: A = final amount, P = principal, r = annual interest rate, n = compounding frequency, t = time in years
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
  }, []);

  return (
    <BaseCalculator
      calculatorType="compound-interest"
      calculatorName={t('compoundInterest')}
      category="basic"
      inputFields={inputFields}
      outputFields={outputFields}
      calculationFunction={calculateCompoundInterest}
      validationRules={validationRules}
    />
  );
});

CompoundInterestCalculator.displayName = 'CompoundInterestCalculator';

export default CompoundInterestCalculator;
