import { getKanbanByPipeline, opportunities, pipelines, stalledOpportunities } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export function GET() {
  const selectedPipeline = pipelines[0];

  return NextResponse.json({
    pipeline: selectedPipeline,
    kanban: getKanbanByPipeline(selectedPipeline.id),
    opportunities,
    stalled: stalledOpportunities,
    total: opportunities.length,
  });
}
