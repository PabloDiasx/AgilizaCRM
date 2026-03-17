import { globalSearch } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';

  return NextResponse.json({
    query,
    ...globalSearch(query),
  });
}
