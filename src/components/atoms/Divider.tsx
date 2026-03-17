import React from 'react';
import clsx from 'clsx';

/**
 * Divider Component - Atom Level
 * Horizontal separator element
 */

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Spacing above/below divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      spacing = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const orientationStyles = {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    };

    const spacingStyles = {
      none: '',
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'bg-gray-200 dark:bg-gray-700',
          orientationStyles[orientation],
          spacingStyles[spacing],
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
