CLAUDE.md - Finexar Development Guide
Project Overview
Finexar is a React Native web application providing a comprehensive financial calculators hub designed for corporate environments. The application emphasizes professional design, multi-language support, and glassmorphism aesthetics.
Core Architecture
Technology Stack
• Framework: React Native for Web
• Styling: Glassmorphism design system with dark theme
• State Management: Context API or Redux for language/history state
• Storage: AsyncStorage/Localtorage for persistence
• Build Tool: Metro bundler with web configuration
Project Structure
src/ ├── components/ │ ├── common/ # Reusable UI components │ ├── splash/ # Splash screen components │ ├── toolbar/ # Navigation and toolbar │ ├── calculators/ # Calculator-specific components │ └── glassmorphism/ # Design system components ├── screens/ │ ├── SplashScreen.js │ ├── MainScreen.js │ └── calculators/ # Individual calculator screens ├── services/ │ ├── translation.js # i18n implementation │ ├── storag.js # Persistence layer │ └── calculations.js # Calculator logic ├── constants/ │ ├── colors.js │ ├── fonts.js │ └── languages.js └── assets/ ├── images/ └── translations/ 
Key Implementation Requirements
1. Splash Screen Implementation
• Duration: Exactly 2 seconds
• Components: Logo, app name, progress bar
• Transition: Smooth fade to main interface
• No user interaction: Auto-advance only
2. Multi-language System
• Languages: English (default), Arabic, French, Spanish, Russian, Chinese, Japanese
• Peristence: Language choice saved across sessions
• Scope: All UI text except app name and splash screen
• RTL Support: Implement for Arabic
• Real-time switching: Immediate UI updates on language change
3. Glassmorphism Design System
// Example glassmorphism style object const glassStyle = { backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', } 
4. History Management
• Storage Persistent local storage
• Data Structure: Calculator type, inputs, outputs, timestamp
• Display: Modal or dedicated screen
• Ordering: Chronological (newest first)
Critical Development Guidelines
Component Architecture
• Functional Components: Use hooks exclusively
• Props Validation: Implement PropTypes for all components
• Error Boundaries: Wrap calculator components
• Memoization: Use React.memo for performance-critical components
State Management Patterns
// Language context structure const LanguagContext = { currentLanguage: 'en', translations: {}, changeLanguage: (lang) => {}, t: (key) => {} // Translation function } // History context structure const HistoryContext = { calculations: [], addCalculation: (calc) => {}, clearHistory: () => {} } 
Styling Conventions
• Dark Theme Only: No light mode support
• Glassmorphism: Apply to cards, modals, toolbar
• Typography: Professional fonts suitable for corporate use
• Responsive: Adapt to various screen sizes
• Accessibility: WCAG compliant contrast rtios
Performance Requirements
• Initial Load: <3 seconds including splash screen
• Language Switch: <200ms response time
• Calculator Operations: Real-time results
• Smooth Animations: 60fps transitions
Calculator Implementation Pattern
Generic Calculator Structure
const CalculatorTemplate = { inputs: [], // Array of input field configurations calculations: {}, // Calculation functions validations: {}, // Input validation rules outputs: [], // Output field configurations category: '', // Calculator categry icon: '' // Category icon } 
Input/Output Handling
• Validation: Real-time input validation
• Formatting: Locale-appropriate number formatting
• Error Handling: User-friendly error messages
• Auto-calculation: Update outputs on input change
Common Pitfalls to Avoid
MediaPipe Integration Issues
• Import Errors: Ensure proper MediaPipe package configuration
• Export Issues: Verify all required exports are available
• Build Configuration: Check metro.config.js for proper module resolution
React Native Wb Considerations
• Platform-specific Code: Use Platform.select() where needed
• Web Compatibility: Test all components in browser environment
• Touch vs Click: Handle both touch and mouse events
Translation Implementation
• Key Consistency: Maintain consistent translation keys
• Fallback Handling: Default to English if translation missing
• Context Awareness: Consider context-specific translations
• Number Formatting: Respect locale-specific number formats
Development Workflow
Setup Commands
npm install pm run web # Start development server npm run build # Build for production npm run test # Run test suite 
Code Quality Standards
• ESLint: Enforce code standards
• Prettier: Consistent code formatting
• TypeScript: Consider migration for type safety
• Testing: Unit tests for calculator logic
File Structure Templates
Component Template
import React, { memo } from 'react'; import { View, StyleSheet } from 'react-native'; import { useTranslation } from '../hooks/useTranslation'; const ComponentName = memo({ prop1, prop2 }) => { const { t } = useTranslation(); return ( <View style={styles.container}> {/* Component content */} </View> ); }); const styles = StyleSheet.create({ container: { // Glassmorphism styles } }); export default ComponentName; 
Calculator Template
import React, { useState, useCallback } from 'react'; import { View } from 'react-native'; import { useHistory } from '../hooks/useHistory'; import { GlassCard } from '../components/glassmorphism'; const CalculatorName = () => { const [inputs,setInputs] = useState({}); const [outputs, setOutputs] = useState({}); const { addCalculation } = useHistory(); const calculate = useCallback(() => { // Calculation logic // Save to history }, [inputs]); return ( <View> <GlassCard> {/* Input area */} </GlassCard> <GlassCard> {/* Output area */} </GlassCard> </View> ); }; export default CalculatorName; 
Testing Requirements
• Unit Tests: All calculation functions
• Integration Tests: Language switching, history persistence
• E2E Tests: Complete user worklows
• Performance Tests: Load times, animation smoothness