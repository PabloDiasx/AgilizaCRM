import React from 'react';
import clsx from 'clsx';

/**
 * Dashboard Organism
 * Main dashboard layout container with grid system
 *
 * @component
 * @example
 * <Dashboard>
 *   <DashboardCard title="Contacts" value={127} trend="+12%" />
 *   <DashboardCard title="Deals" value="$500K" trend="+5.2%" />
 * </Dashboard>
 */

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dashboard title */
  title?: string;

  /** Dashboard subtitle/description */
  subtitle?: string;

  /** Show dashboard in full width */
  fullWidth?: boolean;

  /** Grid columns */
  columns?: 2 | 3 | 4;

  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
}

export const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  (
    {
      title,
      subtitle,
      fullWidth = false,
      columns = 4,
      gap = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Grid configuration
    const gridClasses = {
      2: 'grid-cols-1 lg:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClasses = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'w-full',
          !fullWidth && 'max-w-7xl mx-auto',
          'px-4 sm:px-6 lg:px-8 py-6'
        )}
        {...props}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div
          className={clsx('grid', gridClasses[columns], gapClasses[gap], className)}
        >
          {children}
        </div>
      </div>
    );
  }
);

Dashboard.displayName = 'Dashboard';

// Export Dashboard Card component for convenience
export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  (
    {
      title,
      value,
      trend,
      trendUp = true,
      icon,
      action,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'p-4 sm:p-6 rounded-lg',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          'hover:shadow-lg transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </p>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>

          {icon && (
            <div className="text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
        </div>

        {/* Footer */}
        {(trend || action) && (
          <div className="flex items-center justify-between text-xs sm:text-sm">
            {trend && (
              <span
                className={clsx(
                  trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend}
              </span>
            )}

            {action && (
              <div className="ml-auto">
                {action}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

DashboardCard.displayName = 'DashboardCard';

export default Dashboard;
