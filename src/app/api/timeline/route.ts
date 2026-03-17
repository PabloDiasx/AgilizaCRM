import { timelineEntries } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    items: timelineEntries
      .slice()
      .sort((left, right) => new Date(right.at).getTime() - new Date(left.at).getTime()),
    total: timelineEntries.length,
  });
}
