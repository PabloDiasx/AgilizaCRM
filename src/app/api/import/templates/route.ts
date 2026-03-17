import { csvTemplates } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ templates: csvTemplates });
}
