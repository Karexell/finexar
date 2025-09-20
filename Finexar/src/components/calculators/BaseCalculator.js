import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { useCalculator } from '../../hooks/useCalculator';
import { useHistory } from '../../hooks/useHistory';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { GlassCard, GlassButton } from '../glassmorphism';
import { InputField, OutputField } from './';

const BaseCalculator = memo(({ 
  calculatorType,
  calculatorName,
  category,
  inputFields = [],
  outputFields = [],
  calculationFunction,
  validationRules = {},
  style,
  ...props 
}) => {
  const { t, isRTL } = useTranslation();
  const { addCalculation } = useHistory();
  const {
    inputs,
    outputs,
    errors,
    isCalculating,
    updateInput,
    calculate,
    saveToHistory,
    reset,
    formatNumber,
    hasInputs,
    hasOutputs,
  } = useCalculator(calculatorType);

  const handleCalculate = useCallback(async () => {
    const results = await calculate(calculationFunction, validationRules);
    if (results) {
      // Auto-save to history
      await saveToHistory(calculatorName, category);
    }
  }, [calculate, calculationFunction, validationRules, saveToHistory, calculatorName, category]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleSaveToHistory = useCallback(async () => {
    await saveToHistory(calculatorName, category);
  }, [saveToHistory, calculatorName, category]);

  const containerStyle = [
    styles.container,
    isRTL() && styles.rtlContainer,
    style,
  ];

  return (
    <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
      {/* Input Section */}
      <GlassCard style={styles.section}>
        <Text style={[styles.sectionTitle, isRTL() && styles.rtlText]}>
          {t('inputs')}
        </Text>
        
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            value={inputs[field.name] || ''}
            onChangeText={(value) => updateInput(field.name, value)}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType || 'numeric'}
            error={errors[field.name]}
            required={field.required}
            disabled={isCalculating}
          />
        ))}
      </GlassCard>

      {/* Action Buttons */}
      <GlassCard style={styles.section}>
        <View style={[styles.buttonRow, isRTL() && styles.rtlButtonRow]}>
          <GlassButton
            title={t('calculate')}
            onPress={handleCalculate}
            variant="primary"
            disabled={!hasInputs || isCalculating}
            style={styles.actionButton}
          />
          <GlassButton
            title={t('reset')}
            onPress={handleReset}
            variant="ghost"
            disabled={!hasInputs && !hasOutputs}
            style={styles.actionButton}
          />
        </View>
      </GlassCard>

      {/* Output Section */}
      {hasOutputs && (
        <GlassCard style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL() && styles.rtlText]}>
            {t('results')}
          </Text>
          
          {outputFields.map((field) => (
            <OutputField
              key={field.name}
              label={field.label}
              value={formatNumber(outputs[field.name], field.formatOptions)}
              unit={field.unit}
              copyable={field.copyable}
            />
          ))}
          
          {/* Save to History Button */}
          <GlassButton
            title={t('saveToHistory')}
            onPress={handleSaveToHistory}
            variant="secondary"
            style={styles.saveButton}
          />
        </GlassCard>
      )}

      {/* Error Display */}
      {errors.general && (
        <GlassCard style={[styles.section, styles.errorSection]}>
          <Text style={[styles.errorText, isRTL() && styles.rtlText]}>
            {errors.general}
          </Text>
        </GlassCard>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  rtlContainer: {
    // RTL specific styles if needed
  },
  section: {
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  rtlText: {
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rtlButtonRow: {
    flexDirection: 'row-reverse',
  },
  actionButton: {
    flex: 1,
  },
  saveButton: {
    marginTop: 16,
  },
  errorSection: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
});

BaseCalculator.displayName = 'BaseCalculator';

export default BaseCalculator;
