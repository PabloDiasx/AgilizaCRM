import React, { useEffect } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

/**
 * Modal Molecule
 * Dialog overlay with header, body, and footer actions
 *
 * @component
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   title="Confirm Action"
 *   onClose={() => setIsOpen(false)}
 *   actions={[
 *     { label: 'Cancel', onClick: onClose },
 *     { label: 'Confirm', variant: 'primary', onClick: onConfirm },
 *   ]}
 * >
 *   <p>Are you sure?</p>
 * </Modal>
 */

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  disabled?: boolean;
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether modal is visible */
  isOpen: boolean;

  /** Modal title */
  title: string;

  /** Callback when modal should close */
  onClose: () => void;

  /** Modal content (children) */
  children: React.ReactNode;

  /** Optional footer actions */
  actions?: ModalAction[];

  /** Show close button in header */
  showCloseButton?: boolean;

  /** Modal width */
  width?: 'sm' | 'md' | 'lg' | 'xl';

  /** Close modal on backdrop click */
  closeOnBackdropClick?: boolean;

  /** Disable close on Escape key */
  disableEscapeClose?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      title,
      onClose,
      children,
      actions,
      showCloseButton = true,
      width = 'md',
      closeOnBackdropClick = true,
      disableEscapeClose = false,
      className,
      ...props
    },
    ref
  ) => {
    // Handle Escape key
    useEffect(() => {
      if (!isOpen || disableEscapeClose) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, disableEscapeClose, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    // Width mapping
    const widths = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return (
      <>
        {/* Backdrop */}
        <div
          className={clsx(
            'fixed inset-0 z-40 bg-black bg-opacity-50',
            'animate-in fade-in duration-200'
          )}
          onClick={() => closeOnBackdropClick && onClose()}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={clsx(
            'fixed inset-0 z-50 flex items-center justify-center p-4',
            'animate-in fade-in zoom-in-95 duration-200'
          )}
          {...props}
        >
          <div
            className={clsx(
              'relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl',
              'max-h-[90vh] overflow-y-auto',
              widths[width],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={clsx(
                    'p-1 rounded-md transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'text-gray-500 dark:text-gray-400'
                  )}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">{children}</div>

            {/* Footer Actions */}
            {actions && actions.length > 0 && (
              <div
                className={clsx(
                  'flex gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700',
                  'justify-end'
                )}
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'secondary'}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
