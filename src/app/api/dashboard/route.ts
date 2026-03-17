import { dashboardMetrics, dailyExecution, opportunities } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    metrics: dashboardMetrics,
    execution: dailyExecution,
    topOpportunities: opportunities
      .filter((item) => item.status === 'Aberta')
      .sort((left, right) => right.value - left.value)
      .slice(0, 5),
  });
}
