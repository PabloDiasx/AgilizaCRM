import React from 'react';
import clsx from 'clsx';

/**
 * Label Component - Atom Level
 * Used in forms to label inputs
 */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether field is required */
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={clsx(
        'block text-sm font-medium text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  )
);

Label.displayName = 'Label';

export default Label;
