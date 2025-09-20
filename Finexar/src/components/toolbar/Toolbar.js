import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { GlassCard } from '../glassmorphism';
import LanguageSelector from './LanguageSelector';
import HistoryButton from './HistoryButton';

const Toolbar = memo(({ style, showHistory = true }) => {
  const { t, isRTL } = useTranslation();

  return (
    <GlassCard style={[styles.toolbar, isRTL() && styles.rtlToolbar, style]}>
      <View style={[styles.toolbarContent, isRTL() && styles.rtlToolbarContent]}>
        {/* Brand Header */}
        <View style={[styles.brandSection, isRTL() && styles.rtlBrandSection]}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>F</Text>
          </View>
          <View style={styles.brandText}>
            <Text style={[styles.appName, isRTL() && styles.rtlText]}>
              {t('appName')}
            </Text>
            <Text style={[styles.appSubtitle, isRTL() && styles.rtlText]}>
              {t('appSubtitle')}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionsSection, isRTL() && styles.rtlActionsSection]}>
          {showHistory && <HistoryButton />}
          <LanguageSelector size="small" />
        </View>
      </View>
    </GlassCard>
  );
});

const styles = StyleSheet.create({
  toolbar: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  rtlToolbar: {
    // RTL specific styles if needed
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rtlToolbarContent: {
    flexDirection: 'row-reverse',
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rtlBrandSection: {
    flexDirection: 'row-reverse',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: typography.primary,
  },
  brandText: {
    flex: 1,
  },
  appName: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  appSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    opacity: 0.8,
  },
  rtlText: {
    textAlign: 'right',
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rtlActionsSection: {
    flexDirection: 'row-reverse',
  },
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
