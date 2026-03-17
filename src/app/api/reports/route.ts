import { dashboardMetrics, reportHighlights } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    highlights: reportHighlights,
    metrics: dashboardMetrics,
    total: reportHighlights.length,
  });
}
