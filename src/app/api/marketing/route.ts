import { marketingCampaigns } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ items: marketingCampaigns, total: marketingCampaigns.length });
}
