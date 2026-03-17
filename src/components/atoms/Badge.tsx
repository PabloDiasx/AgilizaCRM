import React from 'react';
import clsx from 'clsx';

/**
 * Badge Component - Atom Level
 * Status indicator for stages, tags, etc.
 */

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: BadgeVariant;

  /** Badge size */
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
  success:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  warning:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs font-medium rounded-sm',
  md: 'px-3 py-1 text-sm font-medium rounded-md',
  lg: 'px-4 py-2 text-base font-medium rounded-lg',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(
        'inline-flex items-center gap-1',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Badge.displayName = 'Badge';

export default Badge;
