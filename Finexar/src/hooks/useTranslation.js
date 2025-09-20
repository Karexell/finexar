import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { languages, DEFAULT_LANGUAGE } from '../constants/languages';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = useCallback(async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
    } catch (error) {
      console.warn('Error changing language:', error);
    }
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return languages[i18n.language] || languages[DEFAULT_LANGUAGE];
  }, [i18n.language]);

  const isRTL = useCallback(() => {
    const currentLang = getCurrentLanguage();
    return currentLang?.rtl || false;
  }, [getCurrentLanguage]);

  const getDirection = useCallback(() => {
    return isRTL() ? 'rtl' : 'ltr';
  }, [isRTL]);

  return {
    t,
    changeLanguage,
    currentLanguage: i18n.language,
    getCurrentLanguage,
    isRTL,
    getDirection,
    languages: Object.values(languages),
  };
};

export default useTranslation;
