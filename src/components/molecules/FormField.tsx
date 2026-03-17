import React from 'react';
import clsx from 'clsx';
import { Label } from '@/components/atoms/Label';
import { Input } from '@/components/atoms/Input';

/**
 * FormField Molecule - Combines Label, Input, and validation
 *
 * @component
 * @example
 * <FormField
 *   label="Email"
 *   name="email"
 *   type="email"
 *   required
 *   placeholder="your@email.com"
 * />
 *
 * <FormField
 *   label="Password"
 *   name="password"
 *   type="password"
 *   error="Password is required"
 * />
 */

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label */
  label: string;

  /** Field name */
  name: string;

  /** Error message */
  error?: string;

  /** Helper text shown below field (only if no error) */
  helperText?: string;

  /** Whether field is required */
  required?: boolean;

  /** Icon element to show inside input */
  icon?: React.ReactNode;

  /** Container className for additional styling */
  containerClassName?: string;

  /** Show password toggle for password fields */
  showPasswordToggle?: boolean;
}

/**
 * FormField component that combines Label, Input, and validation feedback
 */
export const FormField = React.forwardRef<
  HTMLInputElement,
  FormFieldProps
>(
  (
    {
      label,
      name,
      error,
      helperText,
      required,
      icon,
      containerClassName,
      className,
      type = 'text',
      showPasswordToggle,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx('w-full', containerClassName)}>
        {/* Label */}
        <Label htmlFor={name} required={required} className="mb-2 block">
          {label}
        </Label>

        {/* Input */}
        <Input
          ref={ref}
          id={name}
          name={name}
          type={type}
          error={error}
          helperText={helperText}
          icon={icon}
          className={className}
          showPasswordToggle={showPasswordToggle}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${name}-error`
              : helperText
                ? `${name}-hint`
                : undefined
          }
          {...props}
        />

        {/* Error message (alternative display location) */}
        {error && (
          <p
            id={`${name}-error`}
            className="mt-1 text-xs text-error dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text (alternative display location) */}
        {helperText && !error && (
          <p
            id={`${name}-hint`}
            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
