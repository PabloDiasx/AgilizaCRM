import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/atoms/Input';

/**
 * ComboBox Molecule
 * Searchable dropdown input with filtering
 *
 * @component
 * @example
 * <ComboBox
 *   options={[
 *     { id: '1', label: 'Option 1' },
 *     { id: '2', label: 'Option 2' },
 *   ]}
 *   value={selected}
 *   onChange={(option) => setSelected(option)}
 *   placeholder="Select an option"
 * />
 */

interface ComboBoxOption {
  id: string;
  label: string;
}

export interface ComboBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** List of options */
  options: ComboBoxOption[];

  /** Selected option */
  value?: ComboBoxOption | null;

  /** Callback when option is selected */
  onChange?: (option: ComboBoxOption | null) => void;

  /** Show option count */
  showCount?: boolean;

  /** Maximum dropdown height */
  maxHeight?: string;
}

export const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      options,
      value,
      onChange,
      showCount = true,
      maxHeight = 'max-h-60',
      placeholder = 'Select or search...',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter options based on search input
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Handle outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle option selection
    const handleSelect = (option: ComboBoxOption) => {
      onChange?.(option);
      setSearchInput('');
      setIsOpen(false);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setSearchInput('');
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Input Field */}
        <div className="relative">
          <Input
            ref={ref}
            type="text"
            value={value ? value.label : searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className={clsx('pr-10', className)}
            {...props}
          />

          {/* Clear/Chevron buttons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-auto">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <ChevronDown
              className={clsx('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={clsx(
              'absolute z-50 top-full left-0 right-0 mt-2 rounded-lg',
              'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
              'shadow-lg',
              maxHeight,
              'overflow-y-auto'
            )}
          >
            {filtered.length > 0 ? (
              <ul className="py-1" role="listbox">
                {filtered.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        'w-full px-4 py-2 text-left text-sm',
                        'transition-colors duration-200',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        value?.id === option.id && 'bg-primary-50 dark:bg-primary-900/20',
                        value?.id === option.id && 'text-primary-700 dark:text-primary-300'
                      )}
                      role="option"
                      aria-selected={value?.id === option.id}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No options found
              </div>
            )}

            {/* Option count footer */}
            {showCount && (
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                {filtered.length} de {options.length} opções
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

ComboBox.displayName = 'ComboBox';

export default ComboBox;
