import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

/**
 * Icon Component - Atom Level
 * Wrapper for lucide-react icons with consistent sizing and colors
 *
 * @component
 * @example
 * <Icon icon={Search} size="md" />
 * <Icon icon={Check} color="success" size="lg" />
 */

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon component */
  icon: LucideIcon;

  /** Icon size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Icon color - semantic or hex */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'currentColor';

  /** Alternative text for accessibility */
  alt?: string;

  /** Whether icon should be animated */
  animated?: boolean;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      icon: IconComponent,
      size = 'md',
      color = 'currentColor',
      alt,
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    // Size mapping
    const sizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };

    // Color mapping
    const colors = {
      primary: 'text-primary-500 dark:text-primary-400',
      secondary: 'text-gray-600 dark:text-gray-400',
      success: 'text-green-500 dark:text-green-400',
      warning: 'text-orange-500 dark:text-orange-400',
      error: 'text-red-500 dark:text-red-400',
      info: 'text-blue-500 dark:text-blue-400',
      currentColor: 'text-current',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center',
          'flex-shrink-0',
          animated && 'animate-spin',
          className
        )}
        role="img"
        aria-label={alt}
        {...props}
      >
        <IconComponent
          className={clsx(sizes[size], colors[color])}
          strokeWidth={2}
          aria-hidden={!alt}
        />
      </span>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
