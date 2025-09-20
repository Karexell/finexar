import React, { memo, useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  Platform 
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import LoadingBar from '../common/LoadingBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SplashScreen = memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress animation - exactly 2 seconds as specified
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.02; // 2% every 40ms for 2 seconds total
        if (newProgress >= 1) {
          clearInterval(progressInterval);
          // Complete after exactly 2 seconds
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 100);
        }
        return newProgress;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, [fadeAnim, scaleAnim, logoAnim, onComplete]);

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <View style={styles.background} />
      
      {/* Main content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {/* Logo area */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoAnim,
              transform: [{
                translateY: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            }
          ]}
        >
          {/* Logo placeholder - can be replaced with actual logo */}
          <View style={styles.logo}>
            <Text style={styles.logoText}>F</Text>
          </View>
        </Animated.View>

        {/* App name */}
        <Animated.View 
          style={[
            styles.titleContainer,
            {
              opacity: logoAnim,
              transform: [{
                translateY: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              }],
            }
          ]}
        >
          <Text style={styles.title}>Finexar</Text>
          <Text style={styles.subtitle}>Financial Calculators Hub</Text>
        </Animated.View>

        {/* Loading bar */}
        <Animated.View 
          style={[
            styles.loadingContainer,
            {
              opacity: logoAnim,
              transform: [{
                translateY: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              }],
            }
          ]}
        >
          <LoadingBar 
            progress={progress}
            duration={2000}
            height={6}
            color={colors.primary}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Gradient background
    ...(Platform.OS === 'web' ? {
      background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundSecondary} 50%, ${colors.backgroundTertiary} 100%)`,
    } : {
      backgroundColor: colors.background,
    }),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.glassBackground,
    borderWidth: 2,
    borderColor: colors.glassBorder,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    // Web-specific glassmorphism
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }),
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: typography.primary,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen;
