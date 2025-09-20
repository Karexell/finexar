# Finexar - Financial Calculators Hub

A comprehensive React Native web application providing financial calculation tools with multi-language support and glassmorphism design.

## Features

- **Multi-language Support**: 7 languages (English, Arabic, French, Spanish, Russian, Chinese, Japanese)
- **Glassmorphism Design**: Modern, elegant UI with dark theme
- **Financial Calculators**: Simple Interest, Compound Interest, Loan Payment, and more
- **Calculation History**: Persistent storage of all calculations
- **Responsive Design**: Works across various screen sizes
- **RTL Support**: Full right-to-left layout support for Arabic

## Technology Stack

- **Framework**: React Native with Web support
- **Styling**: Glassmorphism design system
- **State Management**: React Context API and Hooks
- **Internationalization**: react-i18next
- **Storage**: AsyncStorage with web fallback
- **Testing**: Jest and React Native Testing Library

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── glassmorphism/    # Design system components
│   ├── calculators/      # Calculator-specific components
│   └── toolbar/          # Navigation and toolbar
├── screens/
│   ├── MainScreen.js     # Main application screen
│   └── calculators/      # Individual calculator screens
├── services/
│   ├── translationService.js  # i18n implementation
│   └── storageService.js      # Persistence layer
├── hooks/
│   ├── useTranslation.js      # Translation hook
│   ├── useHistory.js          # History management
│   └── useCalculator.js       # Calculator logic
├── constants/
│   ├── colors.js              # Color palette
│   ├── fonts.js               # Typography system
│   ├── languages.js           # Language configuration
│   └── calculatorTypes.js     # Calculator definitions
└── utils/                     # Utility functions
```

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Finexar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run web
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run web` - Start web development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Calculator Framework

The application uses a generic calculator framework that makes it easy to add new calculators:

### Creating a New Calculator

1. Create a new calculator component in `src/screens/calculators/`
2. Define input fields, output fields, and validation rules
3. Implement the calculation function
4. Use the `BaseCalculator` component

Example:
```javascript
const MyCalculator = memo(() => {
  const { t } = useTranslation();

  const inputFields = [
    {
      name: 'principal',
      label: t('principal'),
      placeholder: '1000',
      keyboardType: 'numeric',
      required: true,
    },
  ];

  const outputFields = [
    {
      name: 'result',
      label: t('result'),
      unit: t('currency'),
      copyable: true,
      formatOptions: { currency: true, decimals: 2 },
    },
  ];

  const validationRules = {
    principal: { required: true, min: 0.01 },
  };

  const calculateFunction = useCallback(async (inputs) => {
    // Your calculation logic here
    return { result: calculatedValue };
  }, []);

  return (
    <BaseCalculator
      calculatorType="my-calculator"
      calculatorName={t('myCalculator')}
      category="basic"
      inputFields={inputFields}
      outputFields={outputFields}
      calculationFunction={calculateFunction}
      validationRules={validationRules}
    />
  );
});
```

## Design System

### Glassmorphism Components

- `GlassCard` - Base card component with glassmorphism effect
- `GlassButton` - Button with glassmorphism styling
- `GlassModal` - Modal with glassmorphism backdrop

### Color Palette

- **Primary**: #4A90E2 (Blue)
- **Secondary**: #7B68EE (Purple)
- **Background**: #0F1419 (Dark)
- **Surface**: rgba(255, 255, 255, 0.1) (Semi-transparent)

### Typography

- **Primary Font**: Inter
- **Monospace**: SF Mono
- **Scale**: 12px to 60px

## Internationalization

The application supports 7 languages with full RTL support for Arabic:

- English (en) - Default
- Arabic (ar) - RTL
- French (fr)
- Spanish (es)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)

### Adding New Translations

1. Add translation keys to `src/services/translationService.js`
2. Provide translations for all supported languages
3. Use the `useTranslation` hook in components

## Testing

The project includes comprehensive tests:

- **Unit Tests**: Calculator functions and utilities
- **Component Tests**: React components
- **Integration Tests**: Full user workflows

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Performance

- **Initial Load**: < 3 seconds
- **Language Switching**: < 200ms
- **Calculator Operations**: Real-time
- **Bundle Size**: Optimized for web

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the repository.
