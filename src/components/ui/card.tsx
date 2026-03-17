import type { ReactNode } from 'react';

export function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
