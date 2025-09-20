import React, { memo, useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  Platform, 
  Animated, 
  TouchableWithoutFeedback,
  Dimensions 
} from 'react-native';
import { colors } from '../../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GlassModal = memo(({ 
  visible,
  onClose,
  children,
  style,
  animationType = 'fade',
  transparent = true,
  size = 'medium',
  ...props 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          width: screenWidth * 0.8,
          maxWidth: 400,
        };
      case 'large':
        return {
          width: screenWidth * 0.95,
          maxWidth: 800,
        };
      case 'fullscreen':
        return {
          width: screenWidth,
          height: screenHeight,
          borderRadius: 0,
        };
      default:
        return {
          width: screenWidth * 0.9,
          maxWidth: 600,
        };
    }
  };

  const modalStyle = [
    styles.modal,
    getSizeStyle(),
    style,
  ];

  const handleBackdropPress = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType="none"
      onRequestClose={onClose}
      {...props}
    >
      <Animated.View 
        style={[
          styles.backdrop,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          style={[
            modalStyle,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    // Glassmorphism styles
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 20,
    padding: 24,
    // Web-specific styles
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      maxHeight: '90vh',
      overflow: 'auto',
    }),
  },
});

GlassModal.displayName = 'GlassModal';

export default GlassModal;
