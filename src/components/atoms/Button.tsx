import React from 'react';
import clsx from 'clsx';

/**
 * Button Component - Atom Level
 *
 * @component
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 * <Button isLoading>Loading...</Button>
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';

  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  /** Loading state indicator */
  isLoading?: boolean;

  /** Full width button */
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles applied to all variants
    const baseStyles = clsx(
      'font-medium rounded-md transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      'dark:focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'inline-flex items-center justify-center gap-2',
      fullWidth && 'w-full'
    );

    // Variant styles
    const variants = {
      primary: clsx(
        'bg-blue-600 text-white',
        'hover:bg-blue-700 active:bg-blue-800',
        'dark:bg-blue-600 dark:hover:bg-blue-500'
      ),
      secondary: clsx(
        'bg-transparent border border-gray-300 text-gray-900',
        'hover:bg-gray-50 active:bg-gray-100',
        'dark:border-gray-600 dark:text-white dark:hover:bg-gray-800'
      ),
      destructive: clsx(
        'bg-error text-white',
        'hover:bg-red-600 active:bg-red-700',
        'dark:bg-red-600 dark:hover:bg-red-500'
      ),
      ghost: clsx(
        'bg-transparent text-primary-500',
        'hover:bg-primary-50 active:bg-primary-100',
        'dark:text-primary-400 dark:hover:bg-gray-800'
      ),
    };

    // Size styles
    const sizes = {
      sm: 'px-3 py-2 text-sm h-9 min-h-9',
      md: 'px-4 py-2 text-base h-10 min-h-10',
      lg: 'px-4 py-3 text-base h-11 min-h-11 min-w-44', // 44px = mobile touch target
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin inline-block">⏳</span>
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
