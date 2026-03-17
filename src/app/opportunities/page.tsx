'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { TrendingUp, Users, Target, FileText } from 'lucide-react';
import { Header } from '@/components/organisms/Header';
import { Sidebar, SidebarItem } from '@/components/organisms/Sidebar';
import { KanbanBoard, KanbanColumn, KanbanItem } from '@/components/organisms/KanbanBoard';
import { Button } from '@/components/atoms/Button';

/**
 * Opportunities Page
 * Kanban board for managing sales opportunities by stage
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

// Demo kanban columns with opportunities
const DEMO_COLUMNS: KanbanColumn[] = [
  {
    id: 'prospecting',
    title: 'Prospecting',
    color: 'blue',
    items: [
      {
        id: '1',
        title: 'Tech Solutions - Website Redesign',
        description: 'Website redesign for Tech Solutions Inc.',
        priority: 'high',
        owner: 'João Silva',
        tags: ['Web Design', 'Frontend'],
      },
      {
        id: '2',
        title: 'Local Startup - Mobile App',
        description: 'Mobile app development for local startup.',
        priority: 'medium',
        owner: 'Maria Santos',
        tags: ['Mobile', 'React Native'],
      },
    ],
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'green',
    items: [
      {
        id: '3',
        title: 'Enterprise Corp - API Integration',
        description: 'API integration for Enterprise Corp.',
        priority: 'high',
        owner: 'Pedro Costa',
        tags: ['API', 'Integration'],
      },
    ],
  },
  {
    id: 'proposal',
    title: 'Proposal',
    color: 'orange',
    items: [
      {
        id: '4',
        title: 'Big Client - Full Stack Development',
        description: 'Full stack development for Big Client Inc.',
        priority: 'high',
        owner: 'Ana Oliveira',
        tags: ['Full Stack', 'MERN'],
      },
      {
        id: '5',
        title: 'Mid-Size Company - Consulting',
        description: 'Technical consulting for Mid-Size Company.',
        priority: 'medium',
        owner: 'João Silva',
        tags: ['Consulting', 'Strategy'],
      },
    ],
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'red',
    items: [
      {
        id: '6',
        title: 'Fortune 500 - System Overhaul',
        description: 'Complete system overhaul for Fortune 500 company.',
        priority: 'high',
        owner: 'Pedro Costa',
        tags: ['Enterprise', 'Legacy'],
      },
    ],
  },
];

export default function OpportunitiesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [columns] = useState<KanbanColumn[]>(DEMO_COLUMNS);

  const handleAddItem = (columnId: string) => {
    // TODO: Open modal to create new item
    console.log('Add item to:', columnId);
  };

  const handleItemClick = (item: KanbanItem, columnId: string) => {
    // TODO: Open item detail view
    console.log('Item clicked:', item, 'in column:', columnId);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={SIDEBAR_ITEMS}
        activeId="opportunities"
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
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Oportunidades
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Gerencie todas as suas oportunidades de venda
                  </p>
                </div>

                <Button
                  variant="primary"
                  onClick={() => handleAddItem('prospecting')}
                >
                  + Nova Oportunidade
                </Button>
              </div>
            </div>

            {/* Kanban Board */}
            <KanbanBoard
              columns={columns}
              onItemClick={handleItemClick}
              onAddItem={handleAddItem}
              showAddButton={true}
            />

            {/* Summary Footer */}
            <div className={clsx(
              'mt-6 p-4 rounded-lg',
              'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            )}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {columns.reduce((sum, col) => sum + col.items.length, 0)}
                  </p>
                </div>

                {columns.map((column) => (
                  <div key={column.id}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {column.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {column.items.length}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
