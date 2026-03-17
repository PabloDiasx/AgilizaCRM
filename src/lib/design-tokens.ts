/**
 * Design Tokens — AgilizaCRM
 * Centralized design system values (colors, spacing, typography, shadows)
 * Source: outputs/ux-research/agilizacrm/design-visual-spec.md
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary (Blue - Professional, calm, trustworthy)
  primary: {
    50: '#f0f7ff',
    100: '#e0eeff',
    200: '#bae0ff',
    300: '#7cc4ff',
    400: '#36a6ff',
    500: '#1e5a96', // Base primary
    600: '#165080',
    700: '#0f3d5c',
    800: '#0a2847',
    900: '#051830',
  },

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Backgrounds
  bg: {
    light: '#ffffff',
    dark: '#0f172a',
  },

  // Surfaces (Cards, panels)
  surface: {
    light: '#f8f9fb',
    dark: '#1e293b',
  },

  // Text
  text: {
    light: '#1a1a1a',
    dark: '#f1f5f9',
  },
  'text-muted': {
    light: '#6b7280',
    dark: '#94a3b8',
  },

  // Borders
  border: {
    light: '#e5e7eb',
    dark: '#334155',
  },

  // Grays (for secondary elements)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// ============================================================================
// SPACING (Base Unit: 4px)
// ============================================================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Family
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  // Font Sizes
  fontSize: {
    h1: { size: '32px', lineHeight: '1.2', weight: 700 },
    h2: { size: '24px', lineHeight: '1.3', weight: 600 },
    h3: { size: '18px', lineHeight: '1.3', weight: 600 },
    body: { size: '14px', lineHeight: '1.5', weight: 400 },
    'body-emphasis': { size: '14px', lineHeight: '1.5', weight: 500 },
    small: { size: '12px', lineHeight: '1.4', weight: 400 },
    tiny: { size: '11px', lineHeight: '1.3', weight: 400 },
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },
};

// ============================================================================
// SPACING (Component-Level)
// ============================================================================

export const componentSpacing = {
  // Button padding
  button: {
    sm: { padding: '8px 12px', height: '36px' },
    md: { padding: '10px 16px', height: '40px' },
    lg: { padding: '12px 16px', height: '44px' }, // Mobile touch target
  },

  // Input padding
  input: {
    mobile: { padding: '12px 16px', height: '44px' }, // Touch target
    desktop: { padding: '10px 16px', height: '40px' },
  },

  // Card padding
  card: {
    mobile: { padding: '12px' },
    desktop: { padding: '16px' },
  },

  // Page margins
  pageMargin: {
    mobile: '12px',
    tablet: '16px',
    desktop: '20px',
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: '0px', // < 640px
  tablet: '640px', // 640px - 1024px
  desktop: '1024px', // > 1024px
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  transition: {
    fast: '100ms',
    base: '200ms',
    slow: '300ms',
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
};

// ============================================================================
// THEME VARIANTS (Light/Dark Mode)
// ============================================================================

export const themes = {
  light: {
    bg: colors.bg.light,
    surface: colors.surface.light,
    text: colors.text.light,
    textMuted: colors['text-muted'].light,
    border: colors.border.light,
  },
  dark: {
    bg: colors.bg.dark,
    surface: colors.surface.dark,
    text: colors.text.dark,
    textMuted: colors['text-muted'].dark,
    border: colors.border.dark,
  },
};

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Get spacing value by token name
 * @param size 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
 */
export const getSpacing = (size: keyof typeof spacing): string => {
  return spacing[size];
};

/**
 * Get color value by path (e.g., 'primary.500', 'success')
 */
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: unknown = colors;

  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return '';
    }
  }

  return typeof value === 'string' ? value : '';
};

/**
 * CSS custom properties for themes (for CSS-in-JS or CSS variables)
 */
export const getCSSVariables = (theme: 'light' | 'dark' = 'light') => {
  const themeColors = themes[theme];
  return {
    '--color-bg': themeColors.bg,
    '--color-surface': themeColors.surface,
    '--color-text': themeColors.text,
    '--color-text-muted': themeColors.textMuted,
    '--color-border': themeColors.border,
    '--color-primary': colors.primary[500],
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-error': colors.error,
    '--color-info': colors.info,
  };
};

const designTokens = {
  colors,
  spacing,
  typography,
  componentSpacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  animations,
  themes,
};

export default designTokens;
