'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { TrendingUp, Users, Target, FileText } from 'lucide-react';
import { Header } from '@/components/organisms/Header';
import { Sidebar, SidebarItem } from '@/components/organisms/Sidebar';
import { Dashboard, DashboardCard } from '@/components/organisms/Dashboard';

/**
 * Dashboard Page
 * Main dashboard with metrics, recent activity, and navigation
 */

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: TrendingUp,
    label: 'Dashboard',
  },
  {
    id: 'contacts',
    icon: Users,
    label: 'Contatos',
    badge: { label: '127', variant: 'info' },
  },
  {
    id: 'opportunities',
    icon: Target,
    label: 'Oportunidades',
    badge: { label: '23', variant: 'warning' },
  },
  {
    id: 'reports',
    icon: FileText,
    label: 'Relatórios',
  },
];

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarId] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={SIDEBAR_ITEMS}
        activeId={activeSidebarId}
        width="md"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="João Silva"
          appName="AgilizaCRM"
          showMenuToggle={true}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onSearch={(value) => {
            console.log('Search:', value);
          }}
          onLogout={() => {
            // TODO: Implement logout
          }}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Dashboard
            title="Dashboard"
            subtitle="Visão geral das métricas e performance do seu CRM"
            columns={4}
          >
            {/* Cards - this is a demo with hardcoded metrics */}
            <DashboardCard
              title="Total de Contatos"
              value="1,234"
              trend="+12% vs mês anterior"
              trendUp={true}
              icon={<Users className="w-6 h-6 text-blue-500" />}
            />

            <DashboardCard
              title="Oportunidades Ativas"
              value="23"
              trend="+5 novos"
              trendUp={true}
              icon={<Target className="w-6 h-6 text-orange-500" />}
            />

            <DashboardCard
              title="Valor Total em Pipeline"
              value="$2.3M"
              trend="+$400k vs mês anterior"
              trendUp={true}
              icon={<TrendingUp className="w-6 h-6 text-green-500" />}
            />

            <DashboardCard
              title="Taxa de Conversão"
              value="34.2%"
              trend="+2.1% vs período anterior"
              trendUp={true}
              icon={<FileText className="w-6 h-6 text-purple-500" />}
            />

            {/* Activity Cards */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                  'hover:shadow-lg transition-shadow'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Atividades Recentes
                </h3>

                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-white">
                        Nova oportunidade adicionada por João
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">há 2 horas</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-white">
                        Deal fechado com ABC Empresa
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">há 5 horas</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-white">
                        10 novos contatos importados
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">há 1 dia</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                  'hover:shadow-lg transition-shadow'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ações Rápidas
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium',
                      'bg-primary-500 text-white hover:bg-primary-600',
                      'transition-colors'
                    )}
                  >
                    + Novo Contato
                  </button>

                  <button
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium',
                      'bg-orange-500 text-white hover:bg-orange-600',
                      'transition-colors'
                    )}
                  >
                    + Oportunidade
                  </button>

                  <button
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium',
                      'border border-gray-300 dark:border-gray-600',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      'transition-colors'
                    )}
                  >
                    📧 Email
                  </button>

                  <button
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium',
                      'border border-gray-300 dark:border-gray-600',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      'transition-colors'
                    )}
                  >
                    📅 Agenda
                  </button>
                </div>
              </div>
            </div>
          </Dashboard>
        </main>
      </div>
    </div>
  );
}
