import { activities, dailyExecution } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    items: activities,
    summary: {
      overdue: dailyExecution.followUpsOverdue.length,
      openTasks: dailyExecution.openTasks.length,
      meetingsToday: dailyExecution.meetingsToday.length,
    },
    total: activities.length,
  });
}
