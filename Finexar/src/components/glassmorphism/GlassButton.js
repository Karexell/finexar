import React, { memo, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';

const GlassButton = memo(({ 
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'rgba(74, 144, 226, 0.2)',
          borderColor: 'rgba(74, 144, 226, 0.4)',
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(123, 104, 238, 0.2)',
          borderColor: 'rgba(123, 104, 238, 0.4)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: 'rgba(76, 175, 80, 0.4)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          borderColor: 'rgba(255, 152, 0, 0.4)',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          borderColor: 'rgba(244, 67, 54, 0.4)',
        };
      case 'ghost':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      default:
        return {
          backgroundColor: colors.glassBackground,
          borderColor: colors.glassBorder,
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 32,
        };
      case 'large':
        return {
          paddingHorizontal: 32,
          paddingVertical: 16,
          minHeight: 56,
        };
      default:
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          minHeight: 44,
        };
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return typography.buttonSmall;
      case 'large':
        return typography.buttonLarge;
      default:
        return typography.button;
    }
  };

  const buttonStyle = [
    styles.button,
    getVariantStyle(),
    getSizeStyle(),
    disabled && styles.disabled,
    isPressed && styles.pressed,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    getTextSizeStyle(),
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <Text style={textStyleCombined}>
          {loading ? 'Loading...' : title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  button: {
    // Base glassmorphism styles
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    }),
  },
  text: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowOpacity: 0.1,
    ...(Platform.OS === 'web' && {
      transform: 'scale(0.98)',
    }),
  },
  disabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0.05,
    ...(Platform.OS === 'web' && {
      cursor: 'not-allowed',
    }),
  },
  disabledText: {
    color: colors.textDisabled,
  },
});

GlassButton.displayName = 'GlassButton';

export default GlassButton;
