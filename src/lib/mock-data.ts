import {
  Activity,
  Company,
  Contact,
  CRMUser,
  DashboardMetrics,
  Lead,
  Opportunity,
  Pipeline,
  TimelineEntry,
} from '@/lib/types';

const NOW = new Date('2026-03-17T09:00:00-03:00');

function parseDate(value: string) {
  return new Date(value);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function daysBetween(oldest: Date, newest: Date) {
  const diff = newest.getTime() - oldest.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export const users: CRMUser[] = [
  {
    id: 'usr_admin',
    name: 'Administrador Agiliza',
    email: 'admin@agilizacrm.local',
    role: 'admin',
    team: 'Gestao',
  },
  {
    id: 'usr_ana',
    name: 'Ana Vendas',
    email: 'ana@agilizacrm.local',
    role: 'vendedor',
    team: 'Inside Sales',
  },
  {
    id: 'usr_pedro',
    name: 'Pedro SDR',
    email: 'pedro@agilizacrm.local',
    role: 'vendedor',
    team: 'SDR',
  },
  {
    id: 'usr_luiza',
    name: 'Luiza Gestora',
    email: 'luiza@agilizacrm.local',
    role: 'gestor',
    team: 'Gestao',
  },
];

export const demoUser: CRMUser = users[0];

export const leadStatuses = ['Novo', 'Tentativa de contato', 'Qualificado', 'Desqualificado', 'Convertido'];
export const lossReasons = ['Preco', 'Sem prioridade', 'Sem fit', 'Sem retorno', 'Concorrente'];
export const tags = ['Inbound', 'Outbound', 'WhatsApp', 'Enterprise', 'PME', 'Urgente'];

export const pipelines: Pipeline[] = [
  {
    id: 'pl_default',
    name: 'Vendas consultivas',
    team: 'Inside Sales',
    stages: [
      { id: 'st_discovery', pipelineId: 'pl_default', name: 'Descoberta', order: 1, winProbability: 20 },
      { id: 'st_diagnosis', pipelineId: 'pl_default', name: 'Diagnostico', order: 2, winProbability: 40 },
      { id: 'st_proposal', pipelineId: 'pl_default', name: 'Proposta', order: 3, winProbability: 65 },
      { id: 'st_negotiation', pipelineId: 'pl_default', name: 'Negociacao', order: 4, winProbability: 80 },
    ],
  },
  {
    id: 'pl_expansion',
    name: 'Expansao de carteira',
    team: 'CS + Vendas',
    stages: [
      { id: 'st_map', pipelineId: 'pl_expansion', name: 'Mapeamento', order: 1, winProbability: 25 },
      { id: 'st_plan', pipelineId: 'pl_expansion', name: 'Plano', order: 2, winProbability: 50 },
      { id: 'st_offer', pipelineId: 'pl_expansion', name: 'Oferta', order: 3, winProbability: 70 },
      { id: 'st_closing', pipelineId: 'pl_expansion', name: 'Fechamento', order: 4, winProbability: 85 },
    ],
  },
];

export const companies: Company[] = [
  {
    id: 'co_alfa',
    name: 'Grupo Alfa',
    segment: 'Tecnologia',
    status: 'Prospect',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    city: 'Sao Paulo',
    createdAt: '2026-02-10T10:00:00-03:00',
  },
  {
    id: 'co_construtech',
    name: 'Construtech',
    segment: 'Construcao',
    status: 'Cliente',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    city: 'Campinas',
    createdAt: '2025-11-07T11:00:00-03:00',
  },
  {
    id: 'co_lojamix',
    name: 'Loja Mix',
    segment: 'Varejo',
    status: 'Prospect',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    city: 'Ribeirao Preto',
    createdAt: '2026-03-01T09:30:00-03:00',
  },
  {
    id: 'co_dataplus',
    name: 'DataPlus',
    segment: 'Servicos B2B',
    status: 'Parceiro',
    ownerId: 'usr_admin',
    ownerName: 'Administrador Agiliza',
    city: 'Curitiba',
    createdAt: '2025-12-17T15:00:00-03:00',
  },
  {
    id: 'co_hospital',
    name: 'Hospital Central',
    segment: 'Saude',
    status: 'Prospect',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    city: 'Belo Horizonte',
    createdAt: '2026-03-05T10:00:00-03:00',
  },
];

export const contacts: Contact[] = [
  {
    id: 'ct_mariana',
    name: 'Mariana Costa',
    role: 'Head Comercial',
    email: 'mariana@grupoalfa.com',
    phone: '11988881111',
    companyId: 'co_alfa',
    companyName: 'Grupo Alfa',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    tags: ['Inbound', 'Enterprise'],
    notes: 'Prefere reunioes pela manha.',
    createdAt: '2026-02-15T08:00:00-03:00',
  },
  {
    id: 'ct_rafael',
    name: 'Rafael Lima',
    role: 'Diretor Operacional',
    email: 'rafael@construtech.com',
    phone: '19977772222',
    companyId: 'co_construtech',
    companyName: 'Construtech',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    tags: ['Cliente', 'PME'],
    createdAt: '2025-11-08T10:00:00-03:00',
  },
  {
    id: 'ct_bruna',
    name: 'Bruna Nunes',
    role: 'Fundadora',
    email: 'bruna@lojamix.com',
    phone: '16966663333',
    companyId: 'co_lojamix',
    companyName: 'Loja Mix',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    tags: ['WhatsApp'],
    createdAt: '2026-03-01T09:45:00-03:00',
  },
  {
    id: 'ct_gustavo',
    name: 'Gustavo Prado',
    role: 'Coordenador TI',
    email: 'gustavo@dataplus.com',
    phone: '41995554444',
    companyId: 'co_dataplus',
    companyName: 'DataPlus',
    ownerId: 'usr_admin',
    ownerName: 'Administrador Agiliza',
    tags: ['Parceiro'],
    createdAt: '2025-12-18T08:20:00-03:00',
  },
  {
    id: 'ct_juliana',
    name: 'Juliana Mota',
    role: 'Gerente Financeira',
    email: 'juliana@hospitalcentral.com',
    phone: '31994445555',
    companyId: 'co_hospital',
    companyName: 'Hospital Central',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    tags: ['Inbound'],
    createdAt: '2026-03-07T14:20:00-03:00',
  },
];

export const leads: Lead[] = [
  {
    id: 'ld_001',
    name: 'Carlos Freitas',
    email: 'carlos@grupofreitas.com',
    phone: '11991110001',
    source: 'Formulario do site',
    status: 'Novo',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    tags: ['Inbound'],
    createdAt: '2026-03-16T09:00:00-03:00',
    notes: 'Pediu retorno por WhatsApp.',
  },
  {
    id: 'ld_002',
    name: 'Paula Ramos',
    email: 'paula@startupnova.com',
    phone: '21992220002',
    source: 'API',
    status: 'Tentativa de contato',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    tags: ['Outbound'],
    createdAt: '2026-03-14T10:30:00-03:00',
    firstContactAt: '2026-03-14T14:00:00-03:00',
    nextActionAt: '2026-03-17T15:00:00-03:00',
  },
  {
    id: 'ld_003',
    name: 'Bruna Nunes',
    email: 'bruna@lojamix.com',
    phone: '16966663333',
    source: 'WhatsApp',
    status: 'Convertido',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    tags: ['WhatsApp', 'PME'],
    createdAt: '2026-03-01T08:00:00-03:00',
    firstContactAt: '2026-03-01T09:00:00-03:00',
    companyId: 'co_lojamix',
  },
  {
    id: 'ld_004',
    name: 'Marcelo Brito',
    email: 'marcelo@facilpay.com',
    phone: '31993330004',
    source: 'Webhook',
    status: 'Qualificado',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    tags: ['Enterprise', 'Urgente'],
    createdAt: '2026-03-10T13:00:00-03:00',
    firstContactAt: '2026-03-10T16:00:00-03:00',
    nextActionAt: '2026-03-18T09:00:00-03:00',
  },
  {
    id: 'ld_005',
    name: 'Rafael Lima',
    email: 'rafael@construtech.com',
    phone: '19977772222',
    source: 'Indicacao',
    status: 'Convertido',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    tags: ['Cliente'],
    createdAt: '2025-11-05T11:00:00-03:00',
    firstContactAt: '2025-11-05T13:00:00-03:00',
    companyId: 'co_construtech',
  },
  {
    id: 'ld_006',
    name: 'Vanessa Lima',
    email: 'vanessa@alphamedia.com',
    phone: '11993330006',
    source: 'Formulario do site',
    status: 'Novo',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    tags: ['Inbound'],
    createdAt: '2026-03-17T07:50:00-03:00',
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'op_001',
    title: 'Plano Growth',
    companyId: 'co_alfa',
    companyName: 'Grupo Alfa',
    contactId: 'ct_mariana',
    contactName: 'Mariana Costa',
    source: 'Inbound',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    value: 48000,
    pipelineId: 'pl_default',
    pipelineName: 'Vendas consultivas',
    stageId: 'st_diagnosis',
    stageName: 'Diagnostico',
    probability: 40,
    status: 'Aberta',
    expectedCloseDate: '2026-03-28T00:00:00-03:00',
    lastActivityAt: '2026-03-15T10:00:00-03:00',
    nextActionAt: '2026-03-17T16:00:00-03:00',
    createdAt: '2026-02-15T09:00:00-03:00',
  },
  {
    id: 'op_002',
    title: 'Implantacao CRM',
    companyId: 'co_construtech',
    companyName: 'Construtech',
    contactId: 'ct_rafael',
    contactName: 'Rafael Lima',
    source: 'Indicacao',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    value: 120000,
    pipelineId: 'pl_default',
    pipelineName: 'Vendas consultivas',
    stageId: 'st_negotiation',
    stageName: 'Negociacao',
    probability: 80,
    status: 'Aberta',
    expectedCloseDate: '2026-03-22T00:00:00-03:00',
    lastActivityAt: '2026-03-08T09:00:00-03:00',
    nextActionAt: '2026-03-16T09:00:00-03:00',
    createdAt: '2026-01-25T13:00:00-03:00',
  },
  {
    id: 'op_003',
    title: 'Renovacao anual',
    companyId: 'co_lojamix',
    companyName: 'Loja Mix',
    contactId: 'ct_bruna',
    contactName: 'Bruna Nunes',
    source: 'WhatsApp',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    value: 18000,
    pipelineId: 'pl_expansion',
    pipelineName: 'Expansao de carteira',
    stageId: 'st_offer',
    stageName: 'Oferta',
    probability: 70,
    status: 'Aberta',
    expectedCloseDate: '2026-03-19T00:00:00-03:00',
    lastActivityAt: '2026-03-17T08:20:00-03:00',
    nextActionAt: '2026-03-17T14:30:00-03:00',
    createdAt: '2026-03-03T11:00:00-03:00',
  },
  {
    id: 'op_004',
    title: 'Expansao filial',
    companyName: 'DataFlex',
    source: 'Outbound',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    value: 162000,
    pipelineId: 'pl_default',
    pipelineName: 'Vendas consultivas',
    stageId: 'st_discovery',
    stageName: 'Descoberta',
    probability: 20,
    status: 'Aberta',
    expectedCloseDate: '2026-04-05T00:00:00-03:00',
    lastActivityAt: '2026-03-01T10:00:00-03:00',
    createdAt: '2026-02-23T09:00:00-03:00',
  },
  {
    id: 'op_005',
    title: 'Projeto Hospital',
    companyId: 'co_hospital',
    companyName: 'Hospital Central',
    contactId: 'ct_juliana',
    contactName: 'Juliana Mota',
    source: 'Formulario do site',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    value: 97000,
    pipelineId: 'pl_default',
    pipelineName: 'Vendas consultivas',
    stageId: 'st_proposal',
    stageName: 'Proposta',
    probability: 65,
    status: 'Perdida',
    expectedCloseDate: '2026-03-06T00:00:00-03:00',
    lastActivityAt: '2026-03-05T16:00:00-03:00',
    lossReason: 'Sem fit',
    createdAt: '2026-02-09T09:00:00-03:00',
  },
  {
    id: 'op_006',
    title: 'Pacote onboarding',
    companyName: 'Nova Construcoes',
    source: 'API',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    value: 34000,
    pipelineId: 'pl_default',
    pipelineName: 'Vendas consultivas',
    stageId: 'st_negotiation',
    stageName: 'Negociacao',
    probability: 85,
    status: 'Ganha',
    expectedCloseDate: '2026-03-04T00:00:00-03:00',
    lastActivityAt: '2026-03-04T12:00:00-03:00',
    winReason: 'Urgencia de implantacao',
    createdAt: '2026-02-20T09:00:00-03:00',
  },
];

export const activities: Activity[] = [
  {
    id: 'act_001',
    type: 'Tarefa',
    title: 'Cobrar proposta da Construtech',
    relatedTo: { opportunityId: 'op_002', companyId: 'co_construtech', contactId: 'ct_rafael' },
    dueAt: '2026-03-16T10:00:00-03:00',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    priority: 'Alta',
    status: 'Atrasada',
    createdAt: '2026-03-14T11:00:00-03:00',
  },
  {
    id: 'act_002',
    type: 'Ligacao',
    title: 'Primeiro contato com Carlos Freitas',
    relatedTo: { leadId: 'ld_001' },
    dueAt: '2026-03-17T11:30:00-03:00',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    priority: 'Alta',
    status: 'Pendente',
    createdAt: '2026-03-16T09:10:00-03:00',
  },
  {
    id: 'act_003',
    type: 'Reuniao',
    title: 'Demo com Grupo Alfa',
    relatedTo: { opportunityId: 'op_001', contactId: 'ct_mariana', companyId: 'co_alfa' },
    dueAt: '2026-03-17T15:00:00-03:00',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    priority: 'Alta',
    status: 'Pendente',
    createdAt: '2026-03-15T13:00:00-03:00',
  },
  {
    id: 'act_004',
    type: 'Email',
    title: 'Enviar proposta revisada para Hospital Central',
    relatedTo: { opportunityId: 'op_005', companyId: 'co_hospital' },
    dueAt: '2026-03-05T17:00:00-03:00',
    ownerId: 'usr_ana',
    ownerName: 'Ana Vendas',
    priority: 'Media',
    status: 'Concluida',
    createdAt: '2026-03-04T12:00:00-03:00',
  },
  {
    id: 'act_005',
    type: 'Compromisso',
    title: 'Revisar carteira da semana com gestor',
    relatedTo: {},
    dueAt: '2026-03-17T17:30:00-03:00',
    ownerId: 'usr_luiza',
    ownerName: 'Luiza Gestora',
    priority: 'Media',
    status: 'Pendente',
    createdAt: '2026-03-16T18:00:00-03:00',
  },
  {
    id: 'act_006',
    type: 'Tarefa',
    title: 'Classificar lead Vanessa Lima',
    relatedTo: { leadId: 'ld_006' },
    dueAt: '2026-03-17T12:30:00-03:00',
    ownerId: 'usr_pedro',
    ownerName: 'Pedro SDR',
    priority: 'Baixa',
    status: 'Pendente',
    createdAt: '2026-03-17T08:00:00-03:00',
  },
];

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'tl_001',
    companyName: 'Construtech',
    contactName: 'Rafael Lima',
    opportunityTitle: 'Implantacao CRM',
    actorName: 'Luiza Gestora',
    type: 'Mudanca de etapa',
    message: 'Negocio movido de Proposta para Negociacao.',
    at: '2026-03-08T09:00:00-03:00',
  },
  {
    id: 'tl_002',
    leadName: 'Carlos Freitas',
    actorName: 'Pedro SDR',
    type: 'Nota',
    message: 'Lead pediu contato por WhatsApp em horario comercial.',
    at: '2026-03-16T09:05:00-03:00',
  },
  {
    id: 'tl_003',
    companyName: 'Grupo Alfa',
    contactName: 'Mariana Costa',
    opportunityTitle: 'Plano Growth',
    actorName: 'Ana Vendas',
    type: 'Reuniao',
    message: 'Reuniao de diagnostico agendada para hoje.',
    at: '2026-03-15T13:00:00-03:00',
  },
  {
    id: 'tl_004',
    companyName: 'Hospital Central',
    opportunityTitle: 'Projeto Hospital',
    actorName: 'Ana Vendas',
    type: 'Atualizacao de status',
    message: 'Oportunidade marcada como perdida por falta de fit.',
    at: '2026-03-06T10:00:00-03:00',
  },
  {
    id: 'tl_005',
    companyName: 'Loja Mix',
    leadName: 'Bruna Nunes',
    actorName: 'Pedro SDR',
    type: 'Mudanca de responsavel',
    message: 'Lead transferido de SDR para closer.',
    at: '2026-03-02T11:00:00-03:00',
  },
];

function isOpenOpportunity(opportunity: Opportunity) {
  return opportunity.status === 'Aberta';
}

function isTaskOpen(activity: Activity) {
  return activity.status === 'Pendente' || activity.status === 'Atrasada';
}

function isOverdueActivity(activity: Activity) {
  if (activity.status === 'Atrasada') {
    return true;
  }

  return activity.status === 'Pendente' && parseDate(activity.dueAt) < NOW;
}

export function getStalledOpportunities(daysWithoutActivity = 7) {
  return opportunities.filter((opportunity) => {
    if (!isOpenOpportunity(opportunity)) {
      return false;
    }

    const age = daysBetween(parseDate(opportunity.lastActivityAt), NOW);
    return age >= daysWithoutActivity;
  });
}

export function getDailyExecutionView() {
  const followUpsOverdue = activities.filter(isOverdueActivity);

  const newLeadsWithoutContact = leads.filter(
    (lead) => !lead.firstContactAt && daysBetween(parseDate(lead.createdAt), NOW) <= 7,
  );

  const stalledDeals = getStalledOpportunities();

  const meetingsToday = activities.filter(
    (activity) => activity.type === 'Reuniao' && isSameDay(parseDate(activity.dueAt), NOW),
  );

  const openTasks = activities.filter(
    (activity) => isTaskOpen(activity) && (activity.type === 'Tarefa' || activity.type === 'Compromisso'),
  );

  return {
    followUpsOverdue,
    newLeadsWithoutContact,
    stalledDeals,
    meetingsToday,
    openTasks,
  };
}

export function getDashboardMetrics(): DashboardMetrics {
  const pipelineValue = opportunities.filter(isOpenOpportunity).reduce((total, item) => total + item.value, 0);

  const wonThisMonth = opportunities
    .filter((opportunity) => {
      const closeDate = parseDate(opportunity.expectedCloseDate);
      return (
        opportunity.status === 'Ganha' &&
        closeDate.getFullYear() === NOW.getFullYear() &&
        closeDate.getMonth() === NOW.getMonth()
      );
    })
    .reduce((total, item) => total + item.value, 0);

  const overdueFollowUps = activities.filter(isOverdueActivity).length;
  const newLeads = leads.filter((lead) => daysBetween(parseDate(lead.createdAt), NOW) <= 7).length;
  const stalledOpportunities = getStalledOpportunities().length;
  const openTasks = activities.filter(isTaskOpen).length;

  const convertedLeads = leads.filter((lead) => lead.status === 'Convertido').length;
  const conversionRate = leads.length === 0 ? 0 : (convertedLeads / leads.length) * 100;

  return {
    pipelineValue,
    wonThisMonth,
    overdueFollowUps,
    newLeads,
    stalledOpportunities,
    openTasks,
    conversionRate,
  };
}

export function getKanbanByPipeline(pipelineId = pipelines[0].id) {
  const pipeline = pipelines.find((item) => item.id === pipelineId) ?? pipelines[0];
  const openItems = opportunities.filter(
    (opportunity) => opportunity.pipelineId === pipeline.id && isOpenOpportunity(opportunity),
  );

  return pipeline.stages
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((stage) => {
      const items = openItems.filter((opportunity) => opportunity.stageId === stage.id);
      const totalValue = items.reduce((total, item) => total + item.value, 0);

      return {
        stage,
        items,
        totalValue,
      };
    });
}

export type DedupSuggestion = {
  leadId: string;
  leadName: string;
  matchedContactId: string;
  matchedContactName: string;
  reason: 'email' | 'phone';
};

export function getDedupSuggestions(): DedupSuggestion[] {
  const suggestions: DedupSuggestion[] = [];

  for (const lead of leads) {
    const emailMatch = contacts.find(
      (contact) => contact.email.toLowerCase() === lead.email.toLowerCase() && lead.email.length > 0,
    );

    if (emailMatch) {
      suggestions.push({
        leadId: lead.id,
        leadName: lead.name,
        matchedContactId: emailMatch.id,
        matchedContactName: emailMatch.name,
        reason: 'email',
      });
      continue;
    }

    const phoneMatch = contacts.find((contact) => contact.phone === lead.phone && lead.phone.length > 0);

    if (phoneMatch) {
      suggestions.push({
        leadId: lead.id,
        leadName: lead.name,
        matchedContactId: phoneMatch.id,
        matchedContactName: phoneMatch.name,
        reason: 'phone',
      });
    }
  }

  return suggestions;
}

export function globalSearch(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return {
      leads: [],
      contacts: [],
      companies: [],
      opportunities: [],
    };
  }

  const byText = (value: string | undefined) => (value ?? '').toLowerCase().includes(normalized);

  return {
    leads: leads.filter((lead) => byText(lead.name) || byText(lead.email) || byText(lead.phone) || byText(lead.source)),
    contacts: contacts.filter(
      (contact) =>
        byText(contact.name) || byText(contact.email) || byText(contact.phone) || byText(contact.companyName),
    ),
    companies: companies.filter((company) => byText(company.name) || byText(company.segment) || byText(company.city)),
    opportunities: opportunities.filter(
      (opportunity) =>
        byText(opportunity.title) || byText(opportunity.companyName) || byText(opportunity.contactName) || byText(opportunity.ownerName),
    ),
  };
}

export const dashboardMetrics = getDashboardMetrics();
export const dailyExecution = getDailyExecutionView();
export const stalledOpportunities = getStalledOpportunities();

export const marketingCampaigns = [
  { id: 'm1', name: 'Inbound Marco', channel: 'Meta Ads', status: 'Ativa', budget: 12000, leads: 84 },
  { id: 'm2', name: 'ABM Construcao', channel: 'LinkedIn', status: 'Ativa', budget: 8500, leads: 21 },
];

export const supportQueues = [
  { id: 's1', queue: 'Onboarding', pending: 4, sla: '1h', owner: 'CS Team' },
  { id: 's2', queue: 'Tickets financeiro', pending: 2, sla: '4h', owner: 'Backoffice' },
];

export const reportHighlights = [
  {
    id: 'r1',
    title: 'Conversao de leads',
    value: `${dashboardMetrics.conversionRate.toFixed(1)}%`,
    description: 'Percentual de leads convertidos para contatos e oportunidades.',
  },
  {
    id: 'r2',
    title: 'Negocios parados',
    value: String(dashboardMetrics.stalledOpportunities),
    description: 'Oportunidades abertas sem atividade recente ha 7 dias ou mais.',
  },
  {
    id: 'r3',
    title: 'Follow-ups vencidos',
    value: String(dashboardMetrics.overdueFollowUps),
    description: 'Itens operacionais atrasados que pedem acao imediata.',
  },
];

export const csvTemplates = {
  leads: ['nome', 'email', 'telefone', 'origem', 'status', 'responsavel', 'tags'],
  contacts: ['nome', 'cargo', 'email', 'telefone', 'empresa', 'responsavel', 'tags'],
  companies: ['empresa', 'segmento', 'status', 'cidade', 'responsavel'],
  opportunities: ['titulo', 'empresa', 'contato', 'valor', 'pipeline', 'etapa', 'status', 'fechamento_previsto'],
};
