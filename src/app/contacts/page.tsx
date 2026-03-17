'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { TrendingUp, Users, Target, FileText } from 'lucide-react';
import { Header } from '@/components/organisms/Header';
import { Sidebar, SidebarItem } from '@/components/organisms/Sidebar';
import { DataTable, DataTableColumn, DataTableRow } from '@/components/organisms/DataTable';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

/**
 * Contacts Page
 * List of all contacts with search, filtering, and actions
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
  },
  {
    id: 'reports',
    icon: FileText,
    label: 'Relatórios',
  },
];

// Demo contacts data
const DEMO_CONTACTS: DataTableRow[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 98765-4321',
    stage: 'prospecting',
    company: 'Tech Solutions',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    phone: '(11) 91234-5678',
    stage: 'qualified',
    company: 'Inovação Digital',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@empresa.com',
    phone: '(21) 99876-5432',
    stage: 'proposal',
    company: 'Consultoria XYZ',
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@empresa.com',
    phone: '(31) 98765-1234',
    stage: 'negotiation',
    company: 'Serviços ABC',
  },
];

export default function ContactsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter contacts based on search
  const query = searchValue.toLowerCase();

  const filteredContacts = DEMO_CONTACTS.filter((contact) => {
    const name = String(contact.name ?? '').toLowerCase();
    const email = String(contact.email ?? '').toLowerCase();
    const company = String(contact.company ?? '').toLowerCase();

    return name.includes(query) || email.includes(query) || company.includes(query);
  });

  // Table columns
  const columns: DataTableColumn[] = [
    {
      id: 'name',
      label: 'Name',
      sortable: true,
      width: 'w-48',
    },
    {
      id: 'email',
      label: 'Email',
      sortable: true,
      width: 'w-64',
    },
    {
      id: 'phone',
      label: 'Phone',
      sortable: false,
      width: 'w-40',
    },
    {
      id: 'company',
      label: 'Company',
      sortable: true,
      width: 'w-48',
    },
    {
      id: 'stage',
      label: 'Stage',
      sortable: true,
      render: (value) => {
        const stageVariants: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
          prospecting: 'info',
          qualified: 'success',
          proposal: 'warning',
          negotiation: 'error',
        };

        const stage = String(value ?? '');

        return (
          <Badge
            variant={stageVariants[stage] || 'default'}
            size="sm"
          >
            {stage}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={SIDEBAR_ITEMS}
        activeId="contacts"
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
          onSearch={(value) => setSearchValue(value)}
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
                Contatos
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Gerencie todos os seus contatos e leads em um único lugar
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                  placeholder="Search by name, email, or company..."
                />
              </div>

              <Button
                variant="primary"
                onClick={() => {
                  // TODO: Open new contact form
                }}
              >
                + Novo Contato
              </Button>
            </div>

            {/* Selected count */}
            {selectedRows.length > 0 && (
              <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  {selectedRows.length} contato{selectedRows.length > 1 ? 's' : ''} selecionado{selectedRows.length > 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Data Table */}
            <div
              className={clsx(
                'rounded-lg bg-white dark:bg-gray-800 overflow-hidden',
                'border border-gray-200 dark:border-gray-700',
                'shadow-sm hover:shadow-md transition-shadow'
              )}
            >
              <DataTable
                columns={columns}
                rows={filteredContacts}
                selectedRows={selectedRows}
                onRowSelect={(rowId) => {
                  setSelectedRows((prev) =>
                    prev.includes(rowId)
                      ? prev.filter((id) => id !== rowId)
                      : [...prev, rowId]
                  );
                }}
                onRowClick={(row) => {
                  // TODO: Navigate to contact detail
                  console.log('Clicked:', row);
                }}
                showCheckbox={true}
                itemsPerPage={10}
                showPagination={true}
                emptyMessage="No contacts found. Create your first contact to get started!"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
