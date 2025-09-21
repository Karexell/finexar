import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// إحذف الاستيراد المباشر لـ AsyncStorage من مكتبة React Native
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE } from '../constants/languages';

// تحديد AsyncStorage ليناسب المتصفح أو React Native
let AsyncStorage;

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

if (isWeb) {
  // تعريف بديل يستخدم localStorage في المتصفح
  AsyncStorage = {
    getItem: async (key) => {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.warn('AsyncStorage.getItem (web) error:', e);
        return null;
      }
    },
    setItem: async (key, value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.warn('AsyncStorage.setItem (web) error:', e);
      }
    },
    removeItem: async (key) => {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        console.warn('AsyncStorage.removeItem (web) error:', e);
      }
    },
  };
} else {
  // إذا كانت البيئة ليست Web، استورد مكتبة React Native AsyncStorage
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      reset: 'Reset',
      calculate: 'Calculate',
      result: 'Result',
      results: 'Results',
      history: 'History',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: 'Financial Calculators Hub',
      welcomeMessage: 'Welcome to Finexar',
      welcomeSubtitle: 'Your comprehensive financial calculators hub',
      
      // Navigation
      home: 'Home',
      calculators: 'Calculators',
      categories: 'Categories',
      about: 'About',
      
      // Calculator categories
      basicFinancial: 'Basic Financial',
      advancedFinancial: 'Advanced Financial',
      investment: 'Investment',
      loanMortgage: 'Loan & Mortgage',
      retirementPlanning: 'Retirement Planning',
      taxCalculations: 'Tax Calculations',
      currencyExchange: 'Currency & Exchange',
      
      // Calculator types
      simpleInterest: 'Simple Interest',
      compoundInterest: 'Compound Interest',
      presentValue: 'Present Value',
      futureValue: 'Future Value',
      loanPayment: 'Loan Payment',
      mortgage: 'Mortgage Calculator',
      investmentReturn: 'Investment Return',
      annuity: 'Annuity Calculator',
      retirementPlanning: 'Retirement Planning',
      taxCalculator: 'Tax Calculator',
      currencyConverter: 'Currency Converter',
      
      // Calculator inputs
      principal: 'Principal',
      rate: 'Interest Rate (%)',
      time: 'Time Period',
      compounding: 'Compounding Frequency',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
      presentValue: 'Present Value',
      futureValue: 'Future Value',
      amount: 'Amount',
      fromCurrency: 'From Currency',
      toCurrency: 'To Currency',
      convertedAmount: 'Converted Amount',
      
      // History
      calculationHistory: 'Calculation History',
      noHistory: 'No calculation history found',
      clearHistory: 'Clear History',
      clearHistoryConfirm: 'Are you sure you want to clear all calculation history?',
      
      // Errors
      invalidInput: 'Invalid input',
      calculationError: 'Calculation error',
      networkError: 'Network error',
      unknownError: 'Unknown error occurred',
      
      // Success messages
      calculationSaved: 'Calculation saved to history',
      historyCleared: 'History cleared successfully',
      languageChanged: 'Language changed successfully',
      
      // Additional UI text
      comingSoon: 'Coming Soon',
      multiLanguageSupport: 'Multi-language support (7 languages)',
      advancedCalculators: 'Advanced financial calculators',
      glassmorphismDesign: 'Glassmorphism design system',
      calculationHistory: 'Calculation history',
      all: 'All',
      
      // Validation messages
      fieldRequired: 'This field is required',
      valueTooSmall: 'Value must be at least {{min}}',
      valueTooLarge: 'Value must be at most {{max}}',
      invalidFormat: 'Invalid format',
      
      // Calculator UI
      inputs: 'Inputs',
      saveToHistory: 'Save to History',
      
      // Currency and units
      currency: 'USD',
      effectiveRate: 'Effective Annual Rate',
      term: 'Loan Term (Years)',
      
      // Search and results
      noResults: 'No calculators found',
    },
  },
  ar: {
    translation: {
      // Common
      welcome: 'مرحباً',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      search: 'بحث',
      filter: 'تصفية',
      clear: 'مسح',
      reset: 'إعادة تعيين',
      calculate: 'حساب',
      result: 'النتيجة',
      results: 'النتائج',
      history: 'السجل',
      settings: 'الإعدادات',
      language: 'اللغة',
      theme: 'المظهر',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: 'مركز حاسبات مالية شاملة',
      welcomeMessage: 'مرحباً بك في Finexar',
      welcomeSubtitle: 'مركز حاسبات مالية شامل لك',
      
      // Navigation
      home: 'الرئيسية',
      calculators: 'الحاسبات',
      categories: 'الفئات',
      about: 'حول',
      
      // Calculator categories
      basicFinancial: 'مالية أساسية',
      advancedFinancial: 'مالية متقدمة',
      investment: 'استثمار',
      loanMortgage: 'قروض ورهون',
      retirementPlanning: 'تخطيط التقاعد',
      taxCalculations: 'حسابات الضرائب',
      currencyExchange: 'العملات والصرف',
      
      // Calculator types
      simpleInterest: 'فائدة بسيطة',
      compoundInterest: 'فائدة مركبة',
      presentValue: 'القيمة الحالية',
      futureValue: 'القيمة المستقبلية',
      loanPayment: 'دفعة القرض',
      mortgage: 'حاسبة الرهن العقاري',
      investmentReturn: 'عائد الاستثمار',
      annuity: 'حاسبة الأقساط',
      retirementPlanning: 'تخطيط التقاعد',
      taxCalculator: 'حاسبة الضرائب',
      currencyConverter: 'محول العملات',
      
      // Calculator inputs
      principal: 'المبلغ الأساسي',
      rate: 'معدل الفائدة (%)',
      time: 'الفترة الزمنية',
      compounding: 'تكرار التركيب',
      monthlyPayment: 'الدفعة الشهرية',
      totalInterest: 'إجمالي الفائدة',
      totalPayment: 'إجمالي الدفع',
      presentValue: 'القيمة الحالية',
      futureValue: 'القيمة المستقبلية',
      amount: 'المبلغ',
      fromCurrency: 'من العملة',
      toCurrency: 'إلى العملة',
      convertedAmount: 'المبلغ المحول',
      
      // History
      calculationHistory: 'سجل الحسابات',
      noHistory: 'لا يوجد سجل حسابات',
      clearHistory: 'مسح السجل',
      clearHistoryConfirm: 'هل أنت متأكد من مسح جميع سجل الحسابات؟',
      
      // Errors
      invalidInput: 'إدخال غير صحيح',
      calculationError: 'خطأ في الحساب',
      networkError: 'خطأ في الشبكة',
      unknownError: 'حدث خطأ غير معروف',
      
      // Success messages
      calculationSaved: 'تم حفظ الحساب في السجل',
      historyCleared: 'تم مسح السجل بنجاح',
      languageChanged: 'تم تغيير اللغة بنجاح',
      
      // Additional UI text
      comingSoon: 'قريباً',
      multiLanguageSupport: 'دعم متعدد اللغات (7 لغات)',
      advancedCalculators: 'حاسبات مالية متقدمة',
      glassmorphismDesign: 'نظام تصميم زجاجي',
      calculationHistory: 'سجل الحسابات',
      all: 'الكل',
      
      // Validation messages
      fieldRequired: 'هذا الحقل مطلوب',
      valueTooSmall: 'القيمة يجب أن تكون على الأقل {{min}}',
      valueTooLarge: 'القيمة يجب أن تكون على الأكثر {{max}}',
      invalidFormat: 'تنسيق غير صحيح',
      
      // Calculator UI
      inputs: 'المدخلات',
      saveToHistory: 'حفظ في السجل',
      
      // Currency and units
      currency: 'SAR',
      effectiveRate: 'المعدل السنوي الفعال',
      term: 'مدة القرض (سنوات)',
      
      // Search and results
      noResults: 'لم يتم العثور على حاسبات',
    },
  },
  // ... باقي اللغات بنفس الشكل ...
};

// Language detection and storage
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        // Default to DEFAULT_LANGUAGE إذا ما في لغة محفوظة
        callback(DEFAULT_LANGUAGE);
      }
    } catch (error) {
      console.warn('Error detecting language:', error);
      callback(DEFAULT_LANGUAGE);
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.warn('Error saving language:', error);
    }
  },
};

// Initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // تعطيل suspense إذا لزم الأمر
    },
  });

// حفظ اللغة عندما تتغير
i18n.on('languageChanged', (lng) => {
  languageDetector.cacheUserLanguage(lng);
});

export default i18n;
