'use client';

import { useTheme } from '@/lib/useTheme';
import { ReactNode } from 'react';

/**
 * ThemeProvider - Client component that initializes dark mode
 * Wraps the application to apply theme on client side without blocking render
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize dark mode on client side
  useTheme();

  return <>{children}</>;
}
