import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../../constants/colors';

const GlassCard = memo(({ 
  children, 
  style, 
  variant = 'default',
  padding = 20,
  margin = 0,
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'rgba(74, 144, 226, 0.15)',
          borderColor: 'rgba(74, 144, 226, 0.3)',
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(123, 104, 238, 0.15)',
          borderColor: 'rgba(123, 104, 238, 0.3)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(76, 175, 80, 0.15)',
          borderColor: 'rgba(76, 175, 80, 0.3)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(255, 152, 0, 0.15)',
          borderColor: 'rgba(255, 152, 0, 0.3)',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(244, 67, 54, 0.15)',
          borderColor: 'rgba(244, 67, 54, 0.3)',
        };
      default:
        return {
          backgroundColor: colors.glassBackground,
          borderColor: colors.glassBorder,
        };
    }
  };

  const cardStyle = [
    styles.card,
    getVariantStyle(),
    {
      padding,
      margin,
    },
    style,
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    // Base glassmorphism styles as specified in CLAUDE.md
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }),
  },
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
