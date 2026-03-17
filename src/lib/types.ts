export type UserRole = 'admin' | 'gestor' | 'vendedor' | 'operacao';

export type CRMUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: string;
};

export type LeadStatus = 'Novo' | 'Tentativa de contato' | 'Qualificado' | 'Desqualificado' | 'Convertido';
export type AccountStatus = 'Cliente' | 'Prospect' | 'Parceiro';
export type OpportunityStatus = 'Aberta' | 'Ganha' | 'Perdida' | 'Cancelada';
export type ActivityType = 'Ligacao' | 'Reuniao' | 'Email' | 'Mensagem' | 'Tarefa' | 'Compromisso';
export type ActivityStatus = 'Pendente' | 'Atrasada' | 'Concluida' | 'Adiada' | 'Cancelada';
export type ActivityPriority = 'Alta' | 'Media' | 'Baixa';
export type TimelineEventType =
  | 'Nota'
  | 'Ligacao'
  | 'Reuniao'
  | 'Email'
  | 'Mensagem'
  | 'Mudanca de etapa'
  | 'Mudanca de responsavel'
  | 'Atualizacao de status';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  ownerId: string;
  ownerName: string;
  tags: string[];
  createdAt: string;
  firstContactAt?: string;
  nextActionAt?: string;
  companyId?: string;
  notes?: string;
};

export type Company = {
  id: string;
  name: string;
  segment: string;
  status: AccountStatus;
  ownerId: string;
  ownerName: string;
  city: string;
  createdAt: string;
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  companyId?: string;
  companyName?: string;
  ownerId: string;
  ownerName: string;
  tags: string[];
  notes?: string;
  createdAt: string;
};

export type PipelineStage = {
  id: string;
  pipelineId: string;
  name: string;
  order: number;
  winProbability: number;
};

export type Pipeline = {
  id: string;
  name: string;
  team: string;
  stages: PipelineStage[];
};

export type Opportunity = {
  id: string;
  title: string;
  companyId?: string;
  companyName: string;
  contactId?: string;
  contactName?: string;
  source: string;
  ownerId: string;
  ownerName: string;
  value: number;
  pipelineId: string;
  pipelineName: string;
  stageId: string;
  stageName: string;
  probability: number;
  status: OpportunityStatus;
  expectedCloseDate: string;
  lastActivityAt: string;
  nextActionAt?: string;
  winReason?: string;
  lossReason?: string;
  createdAt: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  relatedTo: {
    leadId?: string;
    opportunityId?: string;
    contactId?: string;
    companyId?: string;
  };
  dueAt: string;
  ownerId: string;
  ownerName: string;
  priority: ActivityPriority;
  status: ActivityStatus;
  createdAt: string;
};

export type TimelineEntry = {
  id: string;
  companyName?: string;
  contactName?: string;
  leadName?: string;
  opportunityTitle?: string;
  actorName: string;
  type: TimelineEventType;
  message: string;
  at: string;
};

export type DashboardMetrics = {
  pipelineValue: number;
  wonThisMonth: number;
  overdueFollowUps: number;
  newLeads: number;
  stalledOpportunities: number;
  openTasks: number;
  conversionRate: number;
};
