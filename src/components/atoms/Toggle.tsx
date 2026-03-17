import React from 'react';
import clsx from 'clsx';

/**
 * Toggle Component - Atom Level
 * Light/dark mode switch button
 */

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Checked state */
  checked?: boolean;

  /** Change handler */
  onChange?: (checked: boolean) => void;

  /** Icon for unchecked state */
  uncheckedIcon?: React.ReactNode;

  /** Icon for checked state */
  checkedIcon?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked = false,
      onChange,
      uncheckedIcon,
      checkedIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={clsx(
          'p-2 rounded-md transition-colors duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          className
        )}
        {...props}
      >
        {checked ? checkedIcon : uncheckedIcon}
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
