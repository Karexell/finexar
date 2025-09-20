import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/fonts';
import { useTranslation } from '../hooks/useTranslation';
import { GlassCard } from '../components/glassmorphism';
import { Toolbar } from '../components/toolbar';
import { SearchBar, CategoryFilter } from '../components/common';
import { CalculatorCard } from '../components/calculators';
import { getAllCalculatorTypes } from '../constants/calculatorTypes';

const MainScreen = memo(() => {
  const { t, isRTL } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCalculatorPress = (calculator) => {
    // For now, just show an alert. In a real app, this would navigate to the calculator screen
    console.log('Calculator pressed:', calculator);
  };

  // Get filtered calculators
  const allCalculators = getAllCalculatorTypes();
  const filteredCalculators = allCalculators.filter(calc => {
    const matchesCategory = selectedCategory === 'all' || calc.category.id === selectedCategory;
    const matchesSearch = !searchQuery || 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Toolbar */}
        <Toolbar />

        {/* Search Area */}
        <GlassCard style={styles.searchCard}>
          <SearchBar
            onSearch={handleSearch}
            placeholder={t('search')}
            style={styles.searchBar}
          />
        </GlassCard>

        {/* Category Filter */}
        <GlassCard style={styles.categoryCard}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </GlassCard>

        {/* Welcome Card */}
        <GlassCard style={styles.welcomeCard}>
          <Text style={[styles.welcomeTitle, isRTL() && styles.rtlText]}>
            {t('welcomeMessage')}
          </Text>
          <Text style={[styles.welcomeSubtitle, isRTL() && styles.rtlText]}>
            {t('welcomeSubtitle')}
          </Text>
        </GlassCard>
        
        {/* Calculator Grid */}
        <GlassCard style={styles.calculatorsCard}>
          <Text style={[styles.calculatorsTitle, isRTL() && styles.rtlText]}>
            {t('calculators')}
          </Text>
          <View style={styles.calculatorGrid}>
            {filteredCalculators.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                calculator={calculator}
                onPress={handleCalculatorPress}
                style={styles.calculatorCard}
              />
            ))}
          </View>
          {filteredCalculators.length === 0 && (
            <Text style={[styles.noResults, isRTL() && styles.rtlText]}>
              {t('noResults')}
            </Text>
          )}
        </GlassCard>

        {/* Features Card */}
        <GlassCard style={styles.featuresCard}>
          <Text style={[styles.featuresTitle, isRTL() && styles.rtlText]}>
            {t('comingSoon')}
          </Text>
          <Text style={[styles.featuresText, isRTL() && styles.rtlText]}>
            • {t('multiLanguageSupport')}
          </Text>
          <Text style={[styles.featuresText, isRTL() && styles.rtlText]}>
            • {t('advancedCalculators')}
          </Text>
          <Text style={[styles.featuresText, isRTL() && styles.rtlText]}>
            • {t('glassmorphismDesign')}
          </Text>
          <Text style={[styles.featuresText, isRTL() && styles.rtlText]}>
            • {t('calculationHistory')}
          </Text>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
  },
  searchBar: {
    margin: 0,
  },
  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
  },
  welcomeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    padding: 24,
  },
  welcomeTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  calculatorsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
  },
  calculatorsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  calculatorGrid: {
    gap: 12,
  },
  calculatorCard: {
    marginBottom: 0,
  },
  noResults: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
    opacity: 0.7,
  },
  featuresCard: {
    marginHorizontal: 20,
    padding: 24,
  },
  featuresTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  rtlText: {
    textAlign: 'right',
  },
});

MainScreen.displayName = 'MainScreen';

export default MainScreen;
