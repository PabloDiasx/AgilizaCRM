import { companies, contacts } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    contacts,
    companies,
    totals: {
      contacts: contacts.length,
      companies: companies.length,
    },
  });
}
