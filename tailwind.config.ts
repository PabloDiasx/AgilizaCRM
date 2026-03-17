import type { Config } from 'tailwindcss';
import designTokens from './src/lib/design-tokens';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: designTokens.colors.primary[50],
          100: designTokens.colors.primary[100],
          200: designTokens.colors.primary[200],
          300: designTokens.colors.primary[300],
          400: designTokens.colors.primary[400],
          500: designTokens.colors.primary[500],
          600: designTokens.colors.primary[600],
          700: designTokens.colors.primary[700],
          800: designTokens.colors.primary[800],
          900: designTokens.colors.primary[900],
        },
        success: designTokens.colors.success,
        warning: designTokens.colors.warning,
        error: designTokens.colors.error,
        info: designTokens.colors.info,
        gray: designTokens.colors.gray,
      },
      spacing: {
        xs: designTokens.spacing.xs,
        sm: designTokens.spacing.sm,
        md: designTokens.spacing.md,
        lg: designTokens.spacing.lg,
        xl: designTokens.spacing.xl,
        '2xl': designTokens.spacing['2xl'],
        '3xl': designTokens.spacing['3xl'],
        '4xl': designTokens.spacing['4xl'],
        '5xl': designTokens.spacing['5xl'],
      },
      borderRadius: {
        sm: designTokens.borderRadius.sm,
        md: designTokens.borderRadius.md,
        lg: designTokens.borderRadius.lg,
        xl: designTokens.borderRadius.xl,
        full: designTokens.borderRadius.full,
      },
      boxShadow: {
        sm: designTokens.shadows.sm,
        md: designTokens.shadows.md,
        lg: designTokens.shadows.lg,
        xl: designTokens.shadows.xl,
        '2xl': designTokens.shadows['2xl'],
      },
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans,
        mono: designTokens.typography.fontFamily.mono,
      },
    },
  },
  plugins: [],
};

export default config;
