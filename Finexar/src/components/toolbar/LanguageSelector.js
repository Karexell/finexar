import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/fonts';
import { GlassButton, GlassModal } from '../glassmorphism';

const LanguageSelector = memo(({ style, size = 'medium' }) => {
  const { t, changeLanguage, currentLanguage, getCurrentLanguage, isRTL } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const currentLang = getCurrentLanguage();

  const handleLanguageSelect = async (languageCode) => {
    await changeLanguage(languageCode);
    setIsModalVisible(false);
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          minHeight: 28,
        };
      case 'large':
        return {
          paddingHorizontal: 20,
          paddingVertical: 12,
          minHeight: 48,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 36,
        };
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return typography.caption;
      case 'large':
        return typography.bodyLarge;
      default:
        return typography.body;
    }
  };

  const buttonStyle = [
    styles.button,
    getSizeStyle(),
    isRTL() && styles.rtlButton,
    style,
  ];

  const textStyle = [
    styles.text,
    getTextSizeStyle(),
    isRTL() && styles.rtlText,
  ];

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <GlassButton
          title={`${currentLang.flag} ${currentLang.name}`}
          onPress={() => setIsModalVisible(true)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={buttonStyle}
          textStyle={textStyle}
          variant="ghost"
          size={size}
        />
      </Animated.View>

      <GlassModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        size="medium"
      >
        <View style={[styles.modalContent, isRTL() && styles.rtlModalContent]}>
          <Text style={[styles.modalTitle, isRTL() && styles.rtlText]}>
            {t('language')}
          </Text>
          
          <View style={styles.languageList}>
            {Object.values(languages).map((language) => (
              <GlassButton
                key={language.code}
                title={`${language.flag} ${language.nativeName}`}
                onPress={() => handleLanguageSelect(language.code)}
                variant={currentLanguage === language.code ? 'primary' : 'ghost'}
                style={[
                  styles.languageButton,
                  currentLanguage === language.code && styles.selectedLanguage,
                ]}
                textStyle={[
                  styles.languageButtonText,
                  currentLanguage === language.code && styles.selectedLanguageText,
                  isRTL() && styles.rtlText,
                ]}
              />
            ))}
          </View>
        </View>
      </GlassModal>
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rtlButton: {
    flexDirection: 'row-reverse',
  },
  text: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  rtlText: {
    textAlign: 'right',
  },
  modalContent: {
    alignItems: 'center',
  },
  rtlModalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  languageList: {
    width: '100%',
    gap: 12,
  },
  languageButton: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedLanguage: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderColor: 'rgba(74, 144, 226, 0.4)',
  },
  languageButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedLanguageText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
