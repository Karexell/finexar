import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { GlassCard } from '../glassmorphism';

const CalculatorCard = memo(({ 
  calculator,
  onPress,
  style,
  ...props 
}) => {
  const { t, isRTL } = useTranslation();

  const getCategoryIcon = (category) => {
    const iconMap = {
      'basic': '🧮',
      'advanced': '📈',
      'investment': '📊',
      'loan': '🏠',
      'retirement': '⏰',
      'tax': '📄',
      'currency': '💱',
    };
    return iconMap[category] || '🧮';
  };

  const getCategoryName = (category) => {
    const nameMap = {
      'basic': t('basicFinancial'),
      'advanced': t('advancedFinancial'),
      'investment': t('investment'),
      'loan': t('loanMortgage'),
      'retirement': t('retirementPlanning'),
      'tax': t('taxCalculations'),
      'currency': t('currencyExchange'),
    };
    return nameMap[category] || category;
  };

  const getCalculatorName = (calculatorId) => {
    const nameMap = {
      'simple-interest': t('simpleInterest'),
      'compound-interest': t('compoundInterest'),
      'present-value': t('presentValue'),
      'future-value': t('futureValue'),
      'loan-payment': t('loanPayment'),
      'mortgage': t('mortgage'),
      'investment-return': t('investmentReturn'),
      'annuity': t('annuity'),
      'retirement-planning': t('retirementPlanning'),
      'tax-calculator': t('taxCalculator'),
      'currency-converter': t('currencyConverter'),
    };
    return nameMap[calculatorId] || calculatorId;
  };

  const cardStyle = [
    styles.card,
    isRTL() && styles.rtlCard,
    style,
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => onPress && onPress(calculator)}
      activeOpacity={0.8}
      {...props}
    >
      <GlassCard style={styles.glassCard}>
        <View style={[styles.content, isRTL() && styles.rtlContent]}>
          {/* Category Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.categoryIcon}>
              {getCategoryIcon(calculator.category?.id)}
            </Text>
          </View>

          {/* Calculator Info */}
          <View style={[styles.info, isRTL() && styles.rtlInfo]}>
            <Text style={[styles.calculatorName, isRTL() && styles.rtlText]}>
              {getCalculatorName(calculator.id)}
            </Text>
            <Text style={[styles.categoryName, isRTL() && styles.rtlText]}>
              {getCategoryName(calculator.category?.id)}
            </Text>
            {calculator.description && (
              <Text style={[styles.description, isRTL() && styles.rtlText]}>
                {calculator.description}
              </Text>
            )}
          </View>

          {/* Arrow Icon */}
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowIcon}>
              {isRTL() ? '←' : '→'}
            </Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    }),
  },
  rtlCard: {
    // RTL specific styles if needed
  },
  glassCard: {
    padding: 0,
    margin: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  rtlContent: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  rtlInfo: {
    // RTL specific styles if needed
  },
  calculatorName: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  rtlText: {
    textAlign: 'right',
  },
  categoryName: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  description: {
    ...typography.caption,
    color: colors.textTertiary,
    lineHeight: 16,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

CalculatorCard.displayName = 'CalculatorCard';

export default CalculatorCard;
