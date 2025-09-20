// Finexar Typography System
export const fonts = {
  // Font Families
  primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  secondary: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
  mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  
  // Font Weights
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  
  // Font Sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Typography Styles
export const typography = {
  // Headings
  h1: {
    fontFamily: fonts.primary,
    fontSize: fonts['5xl'],
    fontWeight: fonts.bold,
    lineHeight: fonts.lineHeight.tight,
    letterSpacing: fonts.letterSpacing.tight,
  },
  h2: {
    fontFamily: fonts.primary,
    fontSize: fonts['4xl'],
    fontWeight: fonts.bold,
    lineHeight: fonts.lineHeight.tight,
    letterSpacing: fonts.letterSpacing.tight,
  },
  h3: {
    fontFamily: fonts.primary,
    fontSize: fonts['3xl'],
    fontWeight: fonts.semibold,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  h4: {
    fontFamily: fonts.primary,
    fontSize: fonts['2xl'],
    fontWeight: fonts.semibold,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  h5: {
    fontFamily: fonts.primary,
    fontSize: fonts.xl,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  h6: {
    fontFamily: fonts.primary,
    fontSize: fonts.lg,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  
  // Body Text
  body: {
    fontFamily: fonts.primary,
    fontSize: fonts.base,
    fontWeight: fonts.regular,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  bodyLarge: {
    fontFamily: fonts.primary,
    fontSize: fonts.lg,
    fontWeight: fonts.regular,
    lineHeight: fonts.lineHeight.relaxed,
    letterSpacing: fonts.letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fonts.primary,
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  
  // Labels and Captions
  label: {
    fontFamily: fonts.primary,
    fontSize: fonts.sm,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.wide,
  },
  caption: {
    fontFamily: fonts.primary,
    fontSize: fonts.xs,
    fontWeight: fonts.regular,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
  
  // Buttons
  button: {
    fontFamily: fonts.primary,
    fontSize: fonts.base,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.tight,
    letterSpacing: fonts.letterSpacing.wide,
  },
  buttonLarge: {
    fontFamily: fonts.primary,
    fontSize: fonts.lg,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.tight,
    letterSpacing: fonts.letterSpacing.wide,
  },
  buttonSmall: {
    fontFamily: fonts.primary,
    fontSize: fonts.sm,
    fontWeight: fonts.medium,
    lineHeight: fonts.lineHeight.tight,
    letterSpacing: fonts.letterSpacing.wide,
  },
  
  // Code and Monospace
  code: {
    fontFamily: fonts.mono,
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    lineHeight: fonts.lineHeight.normal,
    letterSpacing: fonts.letterSpacing.normal,
  },
};

export default fonts;
