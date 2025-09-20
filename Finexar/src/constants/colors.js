// Finexar Color Palette - Dark Theme Only
export const colors = {
  // Primary Colors
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  primaryLight: '#6BA3E8',
  
  // Secondary Colors
  secondary: '#7B68EE',
  secondaryDark: '#5A4FCF',
  secondaryLight: '#9B8FF0',
  
  // Background Colors
  background: '#0F1419',
  backgroundSecondary: '#1A1F2E',
  backgroundTertiary: '#252B3D',
  
  // Surface Colors (for glassmorphism)
  surface: 'rgba(255, 255, 255, 0.1)',
  surfaceSecondary: 'rgba(255, 255, 255, 0.05)',
  surfaceTertiary: 'rgba(255, 255, 255, 0.15)',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#B8C5D1',
  textTertiary: '#8A9BA8',
  textDisabled: '#5A6B78',
  
  // Accent Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Border Colors
  border: 'rgba(255, 255, 255, 0.2)',
  borderSecondary: 'rgba(255, 255, 255, 0.1)',
  borderFocus: 'rgba(74, 144, 226, 0.5)',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.5)',
  
  // Glassmorphism Colors
  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  glassShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  
  // Gradient Colors
  gradientPrimary: ['#4A90E2', '#7B68EE'],
  gradientSecondary: ['#1A1F2E', '#252B3D'],
  gradientBackground: ['#0F1419', '#1A1F2E', '#252B3D'],
};

// Glassmorphism Style Object (as specified in CLAUDE.md)
export const glassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

export default colors;
