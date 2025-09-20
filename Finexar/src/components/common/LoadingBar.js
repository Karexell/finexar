import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { colors } from '../../constants/colors';

const LoadingBar = memo(({ 
  progress = 0,
  duration = 2000,
  height = 4,
  color = colors.primary,
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  style,
  animated = true,
  ...props 
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(progress);
    }
  }, [progress, duration, animated, progressAnim]);

  const progressStyle = [
    styles.progressBar,
    {
      height,
      backgroundColor: color,
    },
  ];

  const containerStyle = [
    styles.container,
    {
      height,
      backgroundColor,
    },
    style,
  ];

  return (
    <View style={containerStyle} {...props}>
      <Animated.View
        style={[
          progressStyle,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    // Glassmorphism effect
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
    }),
  },
  progressBar: {
    borderRadius: 2,
    // Gradient effect for web
    ...(Platform.OS === 'web' && {
      background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
    }),
  },
});

LoadingBar.displayName = 'LoadingBar';

export default LoadingBar;
