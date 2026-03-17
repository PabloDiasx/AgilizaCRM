'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { TrendingUp, Users, Target, FileText, BarChart3, PieChart, LineChart } from 'lucide-react';
import { Header } from '@/components/organisms/Header';
import { Sidebar, SidebarItem } from '@/components/organisms/Sidebar';
import { Dashboard, DashboardCard } from '@/components/organisms/Dashboard';
import { Button } from '@/components/atoms/Button';

/**
 * Reports Page
 * Analytics and reporting dashboard
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
  },
  {
    id: 'opportunities',
    icon: Target,
    label: 'Oportunidades',
  },
  {
    id: 'reports',
    icon: FileText,
    label: 'Relatórios',
  },
];

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'year'

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={SIDEBAR_ITEMS}
        activeId="reports"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="João Silva"
          appName="AgilizaCRM"
          showMenuToggle={true}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={() => {
            // TODO: Implement logout
          }}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Relatórios
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Visualize métricas e análises do seu CRM
              </p>
            </div>

            {/* Filter Bar */}
            <div className="mb-6 flex gap-2">
              <Button
                variant={dateRange === 'week' ? 'primary' : 'secondary'}
                onClick={() => setDateRange('week')}
              >
                This Week
              </Button>

              <Button
                variant={dateRange === 'month' ? 'primary' : 'secondary'}
                onClick={() => setDateRange('month')}
              >
                This Month
              </Button>

              <Button
                variant={dateRange === 'year' ? 'primary' : 'secondary'}
                onClick={() => setDateRange('year')}
              >
                This Year
              </Button>
            </div>

            {/* Summary Cards */}
            <Dashboard
              columns={4}
              gap="md"
            >
              <DashboardCard
                title="Total Conversions"
                value="142"
                trend="+8% vs period"
                trendUp={true}
                icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
              />

              <DashboardCard
                title="Average Deal Size"
                value="$45.2K"
                trend="+$8.5K vs period"
                trendUp={true}
                icon={<LineChart className="w-6 h-6 text-green-500" />}
              />

              <DashboardCard
                title="Win Rate"
                value="42%"
                trend="+5% vs period"
                trendUp={true}
                icon={<PieChart className="w-6 h-6 text-purple-500" />}
              />

              <DashboardCard
                title="Avg Sales Cycle"
                value="28 days"
                trend="-3 days vs period"
                trendUp={true}
                icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
              />
            </Dashboard>

            {/* Charts Section */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales by Stage */}
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Opportunities by Stage
                </h3>

                <div className="space-y-3">
                  {[
                    { label: 'Prospecting', value: 34, color: 'bg-blue-500' },
                    { label: 'Qualified', value: 28, color: 'bg-green-500' },
                    { label: 'Proposal', value: 22, color: 'bg-orange-500' },
                    { label: 'Negotiation', value: 16, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.value}
                        </span>
                      </div>

                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={clsx(item.color, 'h-full')}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Trend */}
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Revenue Trend
                </h3>

                <div className="h-48 flex items-end justify-between gap-2">
                  {[
                    { label: 'Mon', value: 65 },
                    { label: 'Tue', value: 78 },
                    { label: 'Wed', value: 55 },
                    { label: 'Thu', value: 88 },
                    { label: 'Fri', value: 92 },
                    { label: 'Sat', value: 45 },
                    { label: 'Sun', value: 72 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center flex-1 gap-2"
                    >
                      <div
                        className={clsx(
                          'w-full bg-primary-500 rounded-t-lg transition-all duration-200 hover:bg-primary-600',
                          'cursor-pointer'
                        )}
                        style={{ height: `${item.value * 2}px` }}
                      />

                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Salespeople */}
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Top Performers
                </h3>

                <div className="space-y-3">
                  {[
                    { name: 'Ana Oliveira', deals: 12, amount: '$487K' },
                    { name: 'Pedro Costa', deals: 10, amount: '$421K' },
                    { name: 'Maria Santos', deals: 8, amount: '$356K' },
                  ].map((person, index) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-bold text-primary-600 dark:text-primary-400 w-6 text-center">
                          #{index + 1}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {person.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {person.deals} deals
                          </p>
                        </div>
                      </div>

                      <p className="font-medium text-gray-900 dark:text-white">
                        {person.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div
                className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>

                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        Deal closed with ABC Corp
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        15 new contacts imported
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        New opportunity from João Silva
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
