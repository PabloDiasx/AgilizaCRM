import { supportQueues } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ items: supportQueues, total: supportQueues.length });
}
