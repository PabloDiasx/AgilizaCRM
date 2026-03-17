import React from 'react';
import clsx from 'clsx';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/atoms/Input';

/**
 * SearchBar Molecule
 * Combines Input with search icon and clear button
 *
 * @component
 * @example
 * <SearchBar
 *   placeholder="Search contacts..."
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   onClear={() => setSearch('')}
 * />
 */

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Callback when clear button is clicked */
  onClear?: () => void;

  /** Show clear button only when input has value */
  showClearButton?: boolean;

  /** Container className for additional styling */
  containerClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value = '',
      onClear,
      showClearButton = true,
      placeholder = 'Search...',
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const hasValue = value && String(value).length > 0;

    return (
      <div className={clsx('relative w-full', containerClassName)}>
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <Input
          ref={ref}
          type="search"
          value={value}
          placeholder={placeholder}
          className={clsx('pl-10', showClearButton && hasValue && 'pr-10', className)}
          {...props}
        />

        {/* Clear Button */}
        {showClearButton && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className={clsx(
              'absolute right-3 top-1/2 transform -translate-y-1/2',
              'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400',
              'transition-colors duration-200 p-1'
            )}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
