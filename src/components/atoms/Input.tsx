import React, { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Input Component - Atom Level
 *
 * @component
 * @example
 * <Input type="email" placeholder="Enter email" />
 * <Input error="Email is required" />
 * <Input icon={<SearchIcon />} />
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below input */
  error?: string;

  /** Icon to display inside input (right side) */
  icon?: React.ReactNode;

  /** Helper text below input */
  helperText?: string;

  /** Show password toggle for password fields */
  showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      icon,
      helperText,
      className,
      type = 'text',
      disabled,
      showPasswordToggle = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    const baseStyles = clsx(
      'w-full px-4 py-3 h-11 rounded-md',
      'border-2 border-gray-300 dark:border-gray-600',
      'bg-white dark:bg-gray-800',
      'text-gray-900 dark:text-white',
      'placeholder:text-gray-500 dark:placeholder:text-gray-400',
      'focus:outline-none focus:border-blue-600 dark:focus:border-blue-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-colors duration-200',
      error && 'border-red-500 focus:border-red-500 dark:border-red-400',
      (icon || (isPasswordField && showPasswordToggle)) && 'pr-12',
      className
    );

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={baseStyles}
            {...props}
          />

          {/* Password visibility toggle */}
          {isPasswordField && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          )}

          {/* Icon display (right side) - only if not password toggle */}
          {icon && !(isPasswordField && showPasswordToggle) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none flex items-center">
              {icon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-error dark:text-red-400">{error}</p>
        )}

        {/* Helper text (only if no error) */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
