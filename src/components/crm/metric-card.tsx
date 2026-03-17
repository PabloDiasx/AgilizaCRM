import { Card } from '@/components/ui/card';

export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card title={label} subtitle={hint}>
      <div className="metric-value">{value}</div>
    </Card>
  );
}
