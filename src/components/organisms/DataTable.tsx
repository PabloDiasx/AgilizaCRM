import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

/**
 * DataTable Organism
 * Table component with sorting, pagination, and responsive design
 *
 * @component
 * @example
 * <DataTable
 *   columns={[
 *     { id: 'name', label: 'Name', sortable: true },
 *     { id: 'email', label: 'Email' },
 *   ]}
 *   rows={[
 *     { id: '1', name: 'John', email: 'john@example.com' },
 *   ]}
 * />
 */

export interface DataTableRow {
  id: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface DataTableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: DataTableRow[keyof DataTableRow], row: DataTableRow) => React.ReactNode;
}

type SortOrder = 'asc' | 'desc' | null;

interface DataTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Table columns definition */
  columns: DataTableColumn[];

  /** Table rows data */
  rows: DataTableRow[];

  /** Currently selected rows */
  selectedRows?: string[];

  /** Callback when row is selected */
  onRowSelect?: (rowId: string) => void;

  /** Callback when row is clicked */
  onRowClick?: (row: DataTableRow) => void;

  /** Show checkbox column for row selection */
  showCheckbox?: boolean;

  /** Items per page for pagination */
  itemsPerPage?: number;

  /** Show pagination controls */
  showPagination?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Dense mode (compact rows) */
  dense?: boolean;
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      columns,
      rows,
      selectedRows = [],
      onRowSelect,
      onRowClick,
      showCheckbox = false,
      itemsPerPage = 10,
      showPagination = true,
      emptyMessage = 'No items to display',
      isLoading = false,
      dense = false,
      className,
      ...props
    },
    ref
  ) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Handle sort
    const handleSort = (columnId: string) => {
      if (sortColumn === columnId) {
        if (sortOrder === 'asc') {
          setSortOrder('desc');
        } else if (sortOrder === 'desc') {
          setSortOrder(null);
          setSortColumn(null);
        }
      } else {
        setSortColumn(columnId);
        setSortOrder('asc');
      }
      setCurrentPage(1);
    };

    // Sort rows
    const sortedRows = React.useMemo(() => {
      if (!sortColumn || !sortOrder) return rows;

      const sorted = [...rows].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (typeof aVal === 'string' || typeof bVal === 'string') {
          const left = String(aVal ?? '');
          const right = String(bVal ?? '');

          return sortOrder === 'asc'
            ? left.localeCompare(right)
            : right.localeCompare(left);
        }

        const left = Number(aVal ?? 0);
        const right = Number(bVal ?? 0);

        return sortOrder === 'asc'
          ? left === right
            ? 0
            : left > right
              ? 1
              : -1
          : left === right
            ? 0
            : left < right
              ? 1
              : -1;
      });

      return sorted;
    }, [rows, sortColumn, sortOrder]);

    // Paginate rows
    const totalPages = Math.ceil(sortedRows.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRows = sortedRows.slice(startIndex, startIndex + itemsPerPage);

    // Get sort icon
    const getSortIcon = (columnId: string) => {
      if (sortColumn !== columnId) {
        return <ChevronsUpDown className="w-4 h-4 opacity-30" />;
      }
      return sortOrder === 'asc' ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      );
    };

    return (
      <div className="w-full flex flex-col">
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table
            ref={ref}
            className={clsx(
              'w-full',
              'border-collapse',
              className
            )}
            {...props}
          >
            {/* Header */}
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                {showCheckbox && (
                  <th className={clsx('px-4', dense ? 'py-2' : 'py-3', 'text-left w-12')}>
                    <input
                      type="checkbox"
                      className="rounded"
                      onChange={(e) => {
                        // Select all on page
                        paginatedRows.forEach((row) => {
                          if (e.target.checked && !selectedRows.includes(row.id)) {
                            onRowSelect?.(row.id);
                          } else if (!e.target.checked && selectedRows.includes(row.id)) {
                            onRowSelect?.(row.id);
                          }
                        });
                      }}
                    />
                  </th>
                )}

                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={clsx(
                      'px-4',
                      dense ? 'py-2' : 'py-3',
                      'text-left font-semibold text-gray-900 dark:text-white',
                      'whitespace-nowrap',
                      column.width
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column.id)}
                        className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        {column.label}
                        {getSortIcon(column.id)}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (showCheckbox ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={clsx(
                      'border-b border-gray-200 dark:border-gray-700',
                      'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                      'cursor-pointer'
                    )}
                  >
                    {showCheckbox && (
                      <td className={clsx('px-4', dense ? 'py-2' : 'py-3', 'w-12')}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            onRowSelect?.(row.id);
                          }}
                          className="rounded"
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={clsx(
                          'px-4',
                          dense ? 'py-2' : 'py-3',
                          'text-gray-900 dark:text-white',
                          'text-sm'
                        )}
                      >
                        {column.render ? column.render(row[column.id], row) : row[column.id]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (showCheckbox ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages} • {sortedRows.length} total
            </p>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>

              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable;
