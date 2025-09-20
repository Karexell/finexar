import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { calculatorCategories } from '../../constants/calculatorTypes';
import { GlassButton } from '../glassmorphism';

const CategoryFilter = memo(({ 
  selectedCategory, 
  onCategorySelect, 
  style,
  showAll = true 
}) => {
  const { t, isRTL } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const categories = showAll 
    ? [{ id: 'all', name: t('all'), icon: '📊', color: colors.primary }, ...Object.values(calculatorCategories)]
    : Object.values(calculatorCategories);

  const handleCategoryPress = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      '📊': '📊',
      'calculator': '🧮',
      'trending-up': '📈',
      'pie-chart': '📊',
      'home': '🏠',
      'clock': '⏰',
      'file-text': '📄',
      'dollar-sign': '💱',
    };
    return iconMap[category.icon] || '📊';
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
    return nameMap[category.id] || category.name;
  };

  const containerStyle = [
    styles.container,
    isRTL() && styles.rtlContainer,
    style,
  ];

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isRTL() && styles.rtlScrollContent
        ]}
        onScroll={(event) => setScrollPosition(event.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
      >
        {categories.map((category) => (
          <GlassButton
            key={category.id}
            title={`${getCategoryIcon(category)} ${getCategoryName(category)}`}
            onPress={() => handleCategoryPress(category.id)}
            variant={selectedCategory === category.id ? 'primary' : 'ghost'}
            size="small"
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            textStyle={[
              styles.categoryButtonText,
              selectedCategory === category.id && styles.selectedCategoryText,
              isRTL() && styles.rtlText,
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  rtlContainer: {
    // RTL specific styles if needed
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  rtlScrollContent: {
    flexDirection: 'row-reverse',
  },
  categoryButton: {
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedCategory: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderColor: 'rgba(74, 144, 226, 0.4)',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  selectedCategoryText: {
    color: colors.primary,
    fontWeight: '600',
  },
  rtlText: {
    textAlign: 'right',
  },
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
