import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE } from '../constants/languages';

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
  fr: {
    translation: {
      // Common
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      search: 'Rechercher',
      filter: 'Filtrer',
      clear: 'Effacer',
      reset: 'Réinitialiser',
      calculate: 'Calculer',
      result: 'Résultat',
      results: 'Résultats',
      history: 'Historique',
      settings: 'Paramètres',
      language: 'Langue',
      theme: 'Thème',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: 'Centre de Calculatrices Financières',
      welcomeMessage: 'Bienvenue sur Finexar',
      welcomeSubtitle: 'Votre centre complet de calculatrices financières',
      
      // Navigation
      home: 'Accueil',
      calculators: 'Calculatrices',
      categories: 'Catégories',
      about: 'À propos',
      
      // Calculator categories
      basicFinancial: 'Financier de Base',
      advancedFinancial: 'Financier Avancé',
      investment: 'Investissement',
      loanMortgage: 'Prêts et Hypothèques',
      retirementPlanning: 'Planification de la Retraite',
      taxCalculations: 'Calculs Fiscaux',
      currencyExchange: 'Devises et Change',
      
      // Calculator types
      simpleInterest: 'Intérêt Simple',
      compoundInterest: 'Intérêt Composé',
      presentValue: 'Valeur Actuelle',
      futureValue: 'Valeur Future',
      loanPayment: 'Paiement de Prêt',
      mortgage: 'Calculateur d\'Hypothèque',
      investmentReturn: 'Rendement d\'Investissement',
      annuity: 'Calculateur de Rente',
      retirementPlanning: 'Planification de la Retraite',
      taxCalculator: 'Calculateur d\'Impôts',
      currencyConverter: 'Convertisseur de Devises',
      
      // Calculator inputs
      principal: 'Principal',
      rate: 'Taux d\'Intérêt (%)',
      time: 'Période',
      compounding: 'Fréquence de Composition',
      monthlyPayment: 'Paiement Mensuel',
      totalInterest: 'Intérêt Total',
      totalPayment: 'Paiement Total',
      presentValue: 'Valeur Actuelle',
      futureValue: 'Valeur Future',
      amount: 'Montant',
      fromCurrency: 'De la Devise',
      toCurrency: 'Vers la Devise',
      convertedAmount: 'Montant Converti',
      
      // History
      calculationHistory: 'Historique des Calculs',
      noHistory: 'Aucun historique de calcul trouvé',
      clearHistory: 'Effacer l\'Historique',
      clearHistoryConfirm: 'Êtes-vous sûr de vouloir effacer tout l\'historique des calculs ?',
      
      // Errors
      invalidInput: 'Entrée invalide',
      calculationError: 'Erreur de calcul',
      networkError: 'Erreur réseau',
      unknownError: 'Une erreur inconnue s\'est produite',
      
      // Success messages
      calculationSaved: 'Calcul enregistré dans l\'historique',
      historyCleared: 'Historique effacé avec succès',
      languageChanged: 'Langue changée avec succès',
      
      // Additional UI text
      comingSoon: 'Bientôt disponible',
      multiLanguageSupport: 'Support multilingue (7 langues)',
      advancedCalculators: 'Calculatrices financières avancées',
      glassmorphismDesign: 'Système de design glassmorphisme',
      calculationHistory: 'Historique des calculs',
      all: 'Tous',
      
      // Validation messages
      fieldRequired: 'Ce champ est requis',
      valueTooSmall: 'La valeur doit être au moins {{min}}',
      valueTooLarge: 'La valeur doit être au plus {{max}}',
      invalidFormat: 'Format invalide',
      
      // Calculator UI
      inputs: 'Entrées',
      saveToHistory: 'Enregistrer dans l\'historique',
      
      // Currency and units
      currency: 'EUR',
      effectiveRate: 'Taux Annuel Effectif',
      term: 'Durée du Prêt (Années)',
      
      // Search and results
      noResults: 'Aucune calculatrice trouvée',
    },
  },
  es: {
    translation: {
      // Common
      welcome: 'Bienvenido',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpiar',
      reset: 'Restablecer',
      calculate: 'Calcular',
      result: 'Resultado',
      results: 'Resultados',
      history: 'Historial',
      settings: 'Configuración',
      language: 'Idioma',
      theme: 'Tema',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: 'Centro de Calculadoras Financieras',
      welcomeMessage: 'Bienvenido a Finexar',
      welcomeSubtitle: 'Tu centro completo de calculadoras financieras',
      
      // Navigation
      home: 'Inicio',
      calculators: 'Calculadoras',
      categories: 'Categorías',
      about: 'Acerca de',
      
      // Calculator categories
      basicFinancial: 'Financiero Básico',
      advancedFinancial: 'Financiero Avanzado',
      investment: 'Inversión',
      loanMortgage: 'Préstamos e Hipotecas',
      retirementPlanning: 'Planificación de Jubilación',
      taxCalculations: 'Cálculos Fiscales',
      currencyExchange: 'Monedas y Cambio',
      
      // Calculator types
      simpleInterest: 'Interés Simple',
      compoundInterest: 'Interés Compuesto',
      presentValue: 'Valor Presente',
      futureValue: 'Valor Futuro',
      loanPayment: 'Pago de Préstamo',
      mortgage: 'Calculadora de Hipoteca',
      investmentReturn: 'Retorno de Inversión',
      annuity: 'Calculadora de Anualidad',
      retirementPlanning: 'Planificación de Jubilación',
      taxCalculator: 'Calculadora de Impuestos',
      currencyConverter: 'Convertidor de Monedas',
      
      // Calculator inputs
      principal: 'Principal',
      rate: 'Tasa de Interés (%)',
      time: 'Período de Tiempo',
      compounding: 'Frecuencia de Capitalización',
      monthlyPayment: 'Pago Mensual',
      totalInterest: 'Interés Total',
      totalPayment: 'Pago Total',
      presentValue: 'Valor Presente',
      futureValue: 'Valor Futuro',
      amount: 'Cantidad',
      fromCurrency: 'De la Moneda',
      toCurrency: 'A la Moneda',
      convertedAmount: 'Cantidad Convertida',
      
      // History
      calculationHistory: 'Historial de Cálculos',
      noHistory: 'No se encontró historial de cálculos',
      clearHistory: 'Limpiar Historial',
      clearHistoryConfirm: '¿Estás seguro de que quieres limpiar todo el historial de cálculos?',
      
      // Errors
      invalidInput: 'Entrada inválida',
      calculationError: 'Error de cálculo',
      networkError: 'Error de red',
      unknownError: 'Ocurrió un error desconocido',
      
      // Success messages
      calculationSaved: 'Cálculo guardado en el historial',
      historyCleared: 'Historial limpiado exitosamente',
      languageChanged: 'Idioma cambiado exitosamente',
      
      // Additional UI text
      comingSoon: 'Próximamente',
      multiLanguageSupport: 'Soporte multiidioma (7 idiomas)',
      advancedCalculators: 'Calculadoras financieras avanzadas',
      glassmorphismDesign: 'Sistema de diseño glassmorfismo',
      calculationHistory: 'Historial de cálculos',
      all: 'Todos',
      
      // Validation messages
      fieldRequired: 'Este campo es requerido',
      valueTooSmall: 'El valor debe ser al menos {{min}}',
      valueTooLarge: 'El valor debe ser como máximo {{max}}',
      invalidFormat: 'Formato inválido',
      
      // Calculator UI
      inputs: 'Entradas',
      saveToHistory: 'Guardar en el historial',
      
      // Currency and units
      currency: 'EUR',
      effectiveRate: 'Tasa Anual Efectiva',
      term: 'Plazo del Préstamo (Años)',
      
      // Search and results
      noResults: 'No se encontraron calculadoras',
    },
  },
  ru: {
    translation: {
      // Common
      welcome: 'Добро пожаловать',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      close: 'Закрыть',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий',
      search: 'Поиск',
      filter: 'Фильтр',
      clear: 'Очистить',
      reset: 'Сбросить',
      calculate: 'Вычислить',
      result: 'Результат',
      results: 'Результаты',
      history: 'История',
      settings: 'Настройки',
      language: 'Язык',
      theme: 'Тема',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: 'Центр Финансовых Калькуляторов',
      welcomeMessage: 'Добро пожаловать в Finexar',
      welcomeSubtitle: 'Ваш комплексный центр финансовых калькуляторов',
      
      // Navigation
      home: 'Главная',
      calculators: 'Калькуляторы',
      categories: 'Категории',
      about: 'О программе',
      
      // Calculator categories
      basicFinancial: 'Базовые Финансы',
      advancedFinancial: 'Продвинутые Финансы',
      investment: 'Инвестиции',
      loanMortgage: 'Кредиты и Ипотека',
      retirementPlanning: 'Планирование Пенсии',
      taxCalculations: 'Налоговые Расчеты',
      currencyExchange: 'Валюты и Обмен',
      
      // Calculator types
      simpleInterest: 'Простой Процент',
      compoundInterest: 'Сложный Процент',
      presentValue: 'Текущая Стоимость',
      futureValue: 'Будущая Стоимость',
      loanPayment: 'Платеж по Кредиту',
      mortgage: 'Калькулятор Ипотеки',
      investmentReturn: 'Доходность Инвестиций',
      annuity: 'Калькулятор Аннуитета',
      retirementPlanning: 'Планирование Пенсии',
      taxCalculator: 'Налоговый Калькулятор',
      currencyConverter: 'Конвертер Валют',
      
      // Calculator inputs
      principal: 'Основная Сумма',
      rate: 'Процентная Ставка (%)',
      time: 'Временной Период',
      compounding: 'Частота Начисления',
      monthlyPayment: 'Ежемесячный Платеж',
      totalInterest: 'Общий Процент',
      totalPayment: 'Общий Платеж',
      presentValue: 'Текущая Стоимость',
      futureValue: 'Будущая Стоимость',
      amount: 'Сумма',
      fromCurrency: 'Из Валюты',
      toCurrency: 'В Валюту',
      convertedAmount: 'Конвертированная Сумма',
      
      // History
      calculationHistory: 'История Расчетов',
      noHistory: 'История расчетов не найдена',
      clearHistory: 'Очистить Историю',
      clearHistoryConfirm: 'Вы уверены, что хотите очистить всю историю расчетов?',
      
      // Errors
      invalidInput: 'Неверный ввод',
      calculationError: 'Ошибка расчета',
      networkError: 'Ошибка сети',
      unknownError: 'Произошла неизвестная ошибка',
      
      // Success messages
      calculationSaved: 'Расчет сохранен в истории',
      historyCleared: 'История успешно очищена',
      languageChanged: 'Язык успешно изменен',
      
      // Additional UI text
      comingSoon: 'Скоро',
      multiLanguageSupport: 'Многоязычная поддержка (7 языков)',
      advancedCalculators: 'Продвинутые финансовые калькуляторы',
      glassmorphismDesign: 'Система дизайна глассморфизм',
      calculationHistory: 'История расчетов',
      all: 'Все',
      
      // Validation messages
      fieldRequired: 'Это поле обязательно',
      valueTooSmall: 'Значение должно быть не менее {{min}}',
      valueTooLarge: 'Значение должно быть не более {{max}}',
      invalidFormat: 'Неверный формат',
      
      // Calculator UI
      inputs: 'Входные данные',
      saveToHistory: 'Сохранить в историю',
      
      // Currency and units
      currency: 'RUB',
      effectiveRate: 'Эффективная Годовая Ставка',
      term: 'Срок Кредита (Лет)',
      
      // Search and results
      noResults: 'Калькуляторы не найдены',
    },
  },
  zh: {
    translation: {
      // Common
      welcome: '欢迎',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      search: '搜索',
      filter: '筛选',
      clear: '清除',
      reset: '重置',
      calculate: '计算',
      result: '结果',
      results: '结果',
      history: '历史',
      settings: '设置',
      language: '语言',
      theme: '主题',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: '金融计算器中心',
      welcomeMessage: '欢迎使用 Finexar',
      welcomeSubtitle: '您的综合金融计算器中心',
      
      // Navigation
      home: '首页',
      calculators: '计算器',
      categories: '分类',
      about: '关于',
      
      // Calculator categories
      basicFinancial: '基础金融',
      advancedFinancial: '高级金融',
      investment: '投资',
      loanMortgage: '贷款和抵押',
      retirementPlanning: '退休规划',
      taxCalculations: '税务计算',
      currencyExchange: '货币兑换',
      
      // Calculator types
      simpleInterest: '单利',
      compoundInterest: '复利',
      presentValue: '现值',
      futureValue: '未来值',
      loanPayment: '贷款支付',
      mortgage: '抵押计算器',
      investmentReturn: '投资回报',
      annuity: '年金计算器',
      retirementPlanning: '退休规划',
      taxCalculator: '税务计算器',
      currencyConverter: '货币转换器',
      
      // Calculator inputs
      principal: '本金',
      rate: '利率 (%)',
      time: '时间周期',
      compounding: '复利频率',
      monthlyPayment: '月付款',
      totalInterest: '总利息',
      totalPayment: '总付款',
      presentValue: '现值',
      futureValue: '未来值',
      amount: '金额',
      fromCurrency: '从货币',
      toCurrency: '到货币',
      convertedAmount: '转换金额',
      
      // History
      calculationHistory: '计算历史',
      noHistory: '未找到计算历史',
      clearHistory: '清除历史',
      clearHistoryConfirm: '您确定要清除所有计算历史吗？',
      
      // Errors
      invalidInput: '无效输入',
      calculationError: '计算错误',
      networkError: '网络错误',
      unknownError: '发生未知错误',
      
      // Success messages
      calculationSaved: '计算已保存到历史',
      historyCleared: '历史清除成功',
      languageChanged: '语言更改成功',
      
      // Additional UI text
      comingSoon: '即将推出',
      multiLanguageSupport: '多语言支持（7种语言）',
      advancedCalculators: '高级金融计算器',
      glassmorphismDesign: '玻璃态设计系统',
      calculationHistory: '计算历史',
      all: '全部',
      
      // Validation messages
      fieldRequired: '此字段为必填项',
      valueTooSmall: '值必须至少为 {{min}}',
      valueTooLarge: '值必须最多为 {{max}}',
      invalidFormat: '格式无效',
      
      // Calculator UI
      inputs: '输入',
      saveToHistory: '保存到历史',
      
      // Currency and units
      currency: 'CNY',
      effectiveRate: '有效年利率',
      term: '贷款期限（年）',
      
      // Search and results
      noResults: '未找到计算器',
    },
  },
  ja: {
    translation: {
      // Common
      welcome: 'ようこそ',
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      cancel: 'キャンセル',
      confirm: '確認',
      save: '保存',
      delete: '削除',
      edit: '編集',
      close: '閉じる',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      search: '検索',
      filter: 'フィルター',
      clear: 'クリア',
      reset: 'リセット',
      calculate: '計算',
      result: '結果',
      results: '結果',
      history: '履歴',
      settings: '設定',
      language: '言語',
      theme: 'テーマ',
      
      // App specific
      appName: 'Finexar',
      appSubtitle: '金融計算機ハブ',
      welcomeMessage: 'Finexarへようこそ',
      welcomeSubtitle: 'あなたの包括的な金融計算機ハブ',
      
      // Navigation
      home: 'ホーム',
      calculators: '計算機',
      categories: 'カテゴリー',
      about: 'について',
      
      // Calculator categories
      basicFinancial: '基本金融',
      advancedFinancial: '高度な金融',
      investment: '投資',
      loanMortgage: 'ローンと住宅ローン',
      retirementPlanning: '退職計画',
      taxCalculations: '税計算',
      currencyExchange: '通貨と為替',
      
      // Calculator types
      simpleInterest: '単利',
      compoundInterest: '複利',
      presentValue: '現在価値',
      futureValue: '将来価値',
      loanPayment: 'ローン支払い',
      mortgage: '住宅ローン計算機',
      investmentReturn: '投資リターン',
      annuity: '年金計算機',
      retirementPlanning: '退職計画',
      taxCalculator: '税計算機',
      currencyConverter: '通貨コンバーター',
      
      // Calculator inputs
      principal: '元本',
      rate: '金利 (%)',
      time: '期間',
      compounding: '複利頻度',
      monthlyPayment: '月次支払い',
      totalInterest: '総利息',
      totalPayment: '総支払い',
      presentValue: '現在価値',
      futureValue: '将来価値',
      amount: '金額',
      fromCurrency: '通貨から',
      toCurrency: '通貨へ',
      convertedAmount: '変換金額',
      
      // History
      calculationHistory: '計算履歴',
      noHistory: '計算履歴が見つかりません',
      clearHistory: '履歴をクリア',
      clearHistoryConfirm: 'すべての計算履歴をクリアしてもよろしいですか？',
      
      // Errors
      invalidInput: '無効な入力',
      calculationError: '計算エラー',
      networkError: 'ネットワークエラー',
      unknownError: '不明なエラーが発生しました',
      
      // Success messages
      calculationSaved: '計算が履歴に保存されました',
      historyCleared: '履歴が正常にクリアされました',
      languageChanged: '言語が正常に変更されました',
      
      // Additional UI text
      comingSoon: '近日公開',
      multiLanguageSupport: '多言語サポート（7言語）',
      advancedCalculators: '高度な金融計算機',
      glassmorphismDesign: 'グラスモーフィズムデザインシステム',
      calculationHistory: '計算履歴',
      all: 'すべて',
      
      // Validation messages
      fieldRequired: 'このフィールドは必須です',
      valueTooSmall: '値は少なくとも {{min}} である必要があります',
      valueTooLarge: '値は最大 {{max}} である必要があります',
      invalidFormat: '無効な形式',
      
      // Calculator UI
      inputs: '入力',
      saveToHistory: '履歴に保存',
      
      // Currency and units
      currency: 'JPY',
      effectiveRate: '実効年利率',
      term: 'ローン期間（年）',
      
      // Search and results
      noResults: '計算機が見つかりません',
    },
  },
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
        // Default to English if no saved language
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
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

// Save language when changed
i18n.on('languageChanged', (lng) => {
  languageDetector.cacheUserLanguage(lng);
});

export default i18n;
