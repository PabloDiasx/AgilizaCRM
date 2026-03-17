import { getDedupSuggestions, leads } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    items: leads,
    dedupSuggestions: getDedupSuggestions(),
    total: leads.length,
  });
}
