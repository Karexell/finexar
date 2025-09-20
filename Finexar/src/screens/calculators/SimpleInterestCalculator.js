import React, { memo, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import BaseCalculator from '../../components/calculators/BaseCalculator';

const SimpleInterestCalculator = memo(() => {
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
  };

  // Calculation function
  const calculateSimpleInterest = useCallback(async (inputs) => {
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
  }, []);

  return (
    <BaseCalculator
      calculatorType="simple-interest"
      calculatorName={t('simpleInterest')}
      category="basic"
      inputFields={inputFields}
      outputFields={outputFields}
      calculationFunction={calculateSimpleInterest}
      validationRules={validationRules}
    />
  );
});

SimpleInterestCalculator.displayName = 'SimpleInterestCalculator';

export default SimpleInterestCalculator;
