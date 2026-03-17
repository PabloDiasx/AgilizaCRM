import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

/**
 * MenuItem Molecule
 * Navigation menu item with icon, label, optional badge, and active state
 *
 * @component
 * @example
 * <MenuItem
 *   icon={Users}
 *   label="Contacts"
 *   active={true}
 *   onClick={() => {}}
 * />
 *
 * <MenuItem
 *   icon={MessageSquare}
 *   label="Messages"
 *   badge={{ label: '3', variant: 'error' }}
 *   onClick={() => {}}
 * />
 */

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon component */
  icon: LucideIcon;

  /** Menu item label */
  label: string;

  /** Whether item is currently active */
  active?: boolean;

  /** Optional badge to display */
  badge?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  };

  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg';

  /** Whether to show chevron for nested menu */
  showChevron?: boolean;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      icon: IconComponent,
      label,
      active = false,
      badge,
      iconSize = 'md',
      showChevron = false,
      className,
      ...props
    },
    ref
  ) => {
    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'w-full px-4 py-3 text-left',
          'flex items-center gap-3 justify-between',
          'rounded-md transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'dark:focus:ring-offset-transparent',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          active && 'bg-primary-50 dark:bg-primary-900/20',
          active && 'text-primary-700 dark:text-primary-300',
          !active && 'text-gray-700 dark:text-gray-300',
          className
        )}
        {...props}
      >
        {/* Left side: icon + label */}
        <div className="flex items-center gap-3 min-w-0">
          <IconComponent className={clsx(iconSizes[iconSize], 'flex-shrink-0')} />

          <span className="font-medium truncate">{label}</span>
        </div>

        {/* Right side: badge + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {badge && <Badge variant={badge.variant} size="sm">{badge.label}</Badge>}

          {showChevron && (
            <svg
              className="w-4 h-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
