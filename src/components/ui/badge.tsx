import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: BadgeVariant }) {
  return <span className={`badge ${variant}`}>{children}</span>;
}
