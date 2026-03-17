import React from 'react';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

/**
 * KanbanBoard Organism
 * Kanban board for managing tasks, opportunities, or deals
 * Note: This is a basic version without drag-drop. Use with a library like react-beautiful-dnd for production.
 *
 * @component
 * @example
 * <KanbanBoard
 *   columns={[
 *     { id: 'todo', title: 'To Do', items: [...] },
 *     { id: 'doing', title: 'Doing', items: [...] },
 *     { id: 'done', title: 'Done', items: [...] },
 *   ]}
 *   onAddItem={(columnId) => {}}
 * />
 */

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  owner?: string;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color?: string;
}

interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kanban columns */
  columns: KanbanColumn[];

  /** Callback when item is clicked */
  onItemClick?: (item: KanbanItem, columnId: string) => void;

  /** Callback when add button is clicked */
  onAddItem?: (columnId: string) => void;

  /** Show add button */
  showAddButton?: boolean;
}

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onItemClick,
      onAddItem,
      showAddButton = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('w-full overflow-x-auto', className)}
        {...props}
      >
        <div className="min-w-max flex gap-6 pb-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 flex flex-col"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {column.items.length} item{column.items.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {showAddButton && (
                  <button
                    type="button"
                    onClick={() => onAddItem?.(column.id)}
                    className={clsx(
                      'p-2 rounded-lg transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      'text-gray-600 dark:text-gray-400'
                    )}
                    aria-label={`Add item to ${column.title}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Column Content */}
              <div
                className={clsx(
                  'flex-1 space-y-3 p-4 rounded-lg',
                  'bg-gray-50 dark:bg-gray-900/50',
                  'border-2 border-dashed border-gray-200 dark:border-gray-700'
                )}
              >
                {column.items.length > 0 ? (
                  column.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onItemClick?.(item, column.id)}
                      className={clsx(
                        'w-full p-4 rounded-lg text-left',
                        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                        'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
                        'transition-all duration-200 cursor-pointer',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500'
                      )}
                    >
                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {item.title}
                      </h4>

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Tags and Priority */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {item.priority && (
                          <Badge
                            variant={
                              item.priority === 'high'
                                ? 'error'
                                : item.priority === 'medium'
                                  ? 'warning'
                                  : 'info'
                            }
                            size="sm"
                          >
                            {item.priority}
                          </Badge>
                        )}

                        {item.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={clsx(
                              'px-2 py-1 rounded text-xs font-medium',
                              'bg-gray-100 dark:bg-gray-700',
                              'text-gray-700 dark:text-gray-300'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      {item.owner && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.owner}
                          </p>
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No items yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;
