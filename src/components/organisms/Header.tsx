import React from 'react';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Avatar } from '@/components/atoms/Avatar';
import { Dropdown } from '@/components/molecules/Dropdown';

/**
 * Header Organism
 * Top navigation bar with search, logo, and user menu
 *
 * @component
 * @example
 * <Header
 *   userName="João Silva"
 *   onSearch={(value) => {}}
 *   onLogout={() => {}}
 *   onMenuToggle={() => {}}
 * />
 */

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** User name for avatar display */
  userName: string;

  /** User avatar URL */
  userAvatar?: string;

  /** Logo or app name */
  appName?: string;

  /** Show menu toggle button for mobile */
  showMenuToggle?: boolean;

  /** Callback when menu toggle is clicked */
  onMenuToggle?: () => void;

  /** Callback when search input changes */
  onSearch?: (value: string) => void;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Callback when logout is clicked */
  onLogout?: () => void;

  /** Additional menu items */
  menuItems?: Array<{
    id: string;
    label: string;
    onClick: () => void;
  }>;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      userName,
      userAvatar,
      appName = 'AgilizaCRM',
      showMenuToggle = true,
      onMenuToggle,
      onSearch,
      searchPlaceholder = 'Search contacts, deals...',
      onLogout,
      menuItems = [],
      className,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState('');

    return (
      <header
        ref={ref}
        className={clsx(
          'sticky top-0 z-40',
          'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
          'shadow-sm',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Menu Toggle + Logo */}
            <div className="flex items-center gap-4">
              {showMenuToggle && (
                <button
                  type="button"
                  onClick={onMenuToggle}
                  className={clsx(
                    'p-2 rounded-lg transition-colors md:hidden',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'text-gray-600 dark:text-gray-400'
                  )}
                  aria-label="Toggle menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {/* Logo / App Name */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h1 className="hidden sm:block text-lg font-bold text-gray-900 dark:text-white">
                  {appName}
                </h1>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <SearchBar
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearch?.(e.target.value);
                }}
                onClear={() => {
                  setSearchValue('');
                  onSearch?.('');
                }}
                placeholder={searchPlaceholder}
              />
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center gap-4">
              {/* User Avatar + Dropdown Menu */}
              <Dropdown
                label=""
                variant="ghost"
                size="lg"
                showChevron={false}
                className="p-0 w-auto h-auto hover:bg-transparent"
                items={[
                  ...menuItems,
                  {
                    id: 'settings',
                    label: 'Configurações',
                    onClick: () => {},
                  },
                  {
                    id: 'divider',
                    label: '',
                    onClick: () => {},
                    divider: true,
                  },
                  {
                    id: 'logout',
                    label: 'Sair',
                    onClick: onLogout || (() => {}),
                    variant: 'destructive',
                  },
                ]}
              >
                <Avatar name={userName} src={userAvatar} size="md" />
              </Dropdown>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch?.(e.target.value);
              }}
              onClear={() => {
                setSearchValue('');
                onSearch?.('');
              }}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
