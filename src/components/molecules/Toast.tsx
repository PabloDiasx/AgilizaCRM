import React from 'react';
import clsx from 'clsx';
import { LucideIcon, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Toast Molecule
 * Notification message with optional icon and close button
 *
 * @component
 * @example
 * <Toast
 *   variant="success"
 *   message="Contact saved successfully!"
 *   onClose={() => {}}
 * />
 *
 * <Toast
 *   variant="error"
 *   title="Error"
 *   message="Failed to save contact"
 *   onClose={() => {}}
 * />
 */

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Toast type/variant */
  variant?: 'success' | 'error' | 'warning' | 'info';

  /** Optional title */
  title?: string;

  /** Toast message content */
  message: string;

  /** Callback when close button is clicked */
  onClose?: () => void;

  /** Show close button */
  showClose?: boolean;

  /** Custom icon (overrides variant icon) */
  icon?: LucideIcon;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      onClose,
      showClose = true,
      icon: CustomIcon,
      className,
      ...props
    },
    ref
  ) => {
    // Default icons for each variant
    const variantIcons = {
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };

    // Variant styles
    const variantStyles = {
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        title: 'text-green-900 dark:text-green-100',
        message: 'text-green-800 dark:text-green-200',
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        icon: 'text-red-600 dark:text-red-400',
        title: 'text-red-900 dark:text-red-100',
        message: 'text-red-800 dark:text-red-200',
      },
      warning: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600 dark:text-orange-400',
        title: 'text-orange-900 dark:text-orange-100',
        message: 'text-orange-800 dark:text-orange-200',
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        title: 'text-blue-900 dark:text-blue-100',
        message: 'text-blue-800 dark:text-blue-200',
      },
    };

    const styles = variantStyles[variant];
    const Icon = CustomIcon || variantIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={clsx(
          'flex gap-3 p-4 rounded-lg border',
          'animate-in fade-in slide-in-from-top-4 duration-300',
          styles.bg,
          styles.border,
          className
        )}
        {...props}
      >
        {/* Icon */}
        <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} aria-hidden="true" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <h3 className={clsx('font-semibold text-sm mb-1', styles.title)}>{title}</h3>}

          <p className={clsx('text-sm leading-relaxed', styles.message)}>{message}</p>
        </div>

        {/* Close Button */}
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              'flex-shrink-0 p-1 rounded-md',
              'transition-colors duration-200',
              'hover:bg-current hover:bg-opacity-10',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              styles.icon
            )}
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
