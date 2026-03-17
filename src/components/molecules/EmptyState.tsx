import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

/**
 * EmptyState Molecule
 * Displays empty state with icon, title, description, and optional CTA button
 *
 * @component
 * @example
 * <EmptyState
 *   icon={Users}
 *   title="No contacts yet"
 *   description="Start by adding your first contact to get organized"
 *   actionLabel="Add Contact"
 *   onAction={() => {}}
 * />
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon component */
  icon: LucideIcon;

  /** Empty state title */
  title: string;

  /** Empty state description */
  description?: string;

  /** Optional CTA button label */
  actionLabel?: string;

  /** Callback when action button is clicked */
  onAction?: () => void;

  /** Icon size */
  iconSize?: 'md' | 'lg' | 'xl';
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon: IconComponent,
      title,
      description,
      actionLabel,
      onAction,
      iconSize = 'lg',
      className,
      ...props
    },
    ref
  ) => {
    const iconSizes = {
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
    };

    return (
      <div
        ref={ref}
        className={clsx('flex flex-col items-center justify-center py-12 px-4', className)}
        {...props}
      >
        {/* Icon */}
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <IconComponent className={clsx(iconSizes[iconSize])} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-6">
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
