import React from 'react';
import clsx from 'clsx';
import { LucideIcon, X } from 'lucide-react';
import { MenuItem } from '@/components/molecules/MenuItem';

/**
 * Sidebar Organism
 * Left navigation menu with menu items
 *
 * @component
 * @example
 * <Sidebar
 *   isOpen={isSidebarOpen}
 *   onClose={() => setIsSidebarOpen(false)}
 *   items={[
 *     { id: 'contacts', icon: Users, label: 'Contacts', badge: { label: '5' } },
 *     { id: 'deals', icon: TrendingUp, label: 'Deals' },
 *   ]}
 *   activeId="contacts"
 * />
 */

export interface SidebarItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  };
  onClick?: () => void;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether sidebar is open (mobile) */
  isOpen?: boolean;

  /** Callback when sidebar should close */
  onClose?: () => void;

  /** Menu items */
  items: SidebarItem[];

  /** Currently active item ID */
  activeId?: string;

  /** Show close button (mobile) */
  showCloseButton?: boolean;

  /** Sidebar width on desktop */
  width?: 'sm' | 'md';
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      isOpen = true,
      onClose,
      items,
      activeId,
      showCloseButton = true,
      width = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // Width mapping
    const widths = {
      sm: 'w-48',
      md: 'w-64',
    };

    // Handle backdrop click on mobile
    const handleBackdropClick = () => {
      onClose?.();
    };

    return (
      <>
        {/* Mobile Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={ref}
          className={clsx(
            'fixed md:static inset-y-16 left-0 z-40',
            'flex flex-col',
            'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
            'transition-transform duration-300 ease-in-out',
            widths[width],
            'md:translate-x-0',
            !isOpen && '-translate-x-full',
            className
          )}
          {...props}
        >
          {/* Header with Close Button (Mobile) */}
          {showCloseButton && (
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">Menu</h2>
              <button
                type="button"
                onClick={onClose}
                className={clsx(
                  'p-1 rounded-lg transition-colors',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'text-gray-500 dark:text-gray-400'
                )}
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul role="menubar" className="space-y-1">
              {items.map((item) => (
                <li key={item.id} role="none">
                  <MenuItem
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                    active={activeId === item.id}
                    onClick={() => {
                      item.onClick?.();
                      // Close sidebar on mobile after click
                      if (!isOpen || window.innerWidth < 768) {
                        onClose?.();
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              v1.0.0
            </p>
          </div>
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
