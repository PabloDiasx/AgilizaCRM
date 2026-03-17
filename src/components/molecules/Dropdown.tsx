import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { Button, ButtonProps } from '@/components/atoms/Button';

/**
 * Dropdown Molecule
 * Button with menu items dropdown
 *
 * @component
 * @example
 * <Dropdown
 *   label="Actions"
 *   items={[
 *     { id: '1', label: 'Edit', onClick: () => {} },
 *     { id: '2', label: 'Delete', onClick: () => {}, variant: 'destructive' },
 *   ]}
 * />
 */

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps extends Omit<ButtonProps, 'children'> {
  /** Dropdown button label */
  label?: string;

  /** Optional custom trigger content */
  children?: React.ReactNode;

  /** Menu items */
  items: DropdownItem[];

  /** Show chevron icon */
  showChevron?: boolean;

  /** Close menu on item click */
  closeOnItemClick?: boolean;

  /** Align dropdown menu */
  align?: 'left' | 'right';
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      label,
      children,
      items,
      showChevron = true,
      closeOnItemClick = true,
      align = 'left',
      className,
      ...buttonProps
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Handle item click
    const handleItemClick = (onClick: () => void) => {
      onClick();
      if (closeOnItemClick) {
        setIsOpen(false);
      }
    };

    return (
      <div ref={containerRef} className="relative inline-block">
        {/* Trigger Button */}
        <Button
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={clsx('gap-2', className)}
          {...buttonProps}
        >
          {children ?? label}
          {showChevron && (
            <ChevronDown
              className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
              aria-hidden="true"
            />
          )}
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={clsx(
              'absolute top-full z-50 mt-1 rounded-lg',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'shadow-lg overflow-hidden',
              'min-w-max',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <ul className="py-1" role="menu">
              {items.map((item) => (
                <li key={item.id} role="none">
                  {/* Divider */}
                  {item.divider && (
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
                  )}

                  {/* Menu Item */}
                  <button
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => handleItemClick(item.onClick)}
                    className={clsx(
                      'w-full px-4 py-2 text-left text-sm',
                      'transition-colors duration-200',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
                      item.variant === 'destructive' && !item.disabled && 'text-red-600 dark:text-red-400',
                      item.variant === 'destructive' &&
                        !item.disabled &&
                        'hover:bg-red-50 dark:hover:bg-red-900/20'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
