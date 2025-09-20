import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import SplashScreen from './components/splash/SplashScreen';
import MainScreen from './screens/MainScreen';
import { colors } from './constants/colors';
import './services/translationService'; // Initialize i18n

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  // Set up global styles for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Add global styles for web
      const style = document.createElement('style');
      style.textContent = `
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(135deg, #0F1419 0%, #1A1F2E 50%, #252B3D 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        #root {
          min-height: 100vh;
          width: 100%;
        }
        
        /* Glassmorphism support for older browsers */
        .glass-fallback {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        /* Smooth transitions */
        * {
          transition: all 0.2s ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <MainScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
