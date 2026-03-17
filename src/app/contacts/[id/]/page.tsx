'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { TrendingUp, Users, Target, FileText, ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { Header } from '@/components/organisms/Header';
import { Sidebar, SidebarItem } from '@/components/organisms/Sidebar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Avatar } from '@/components/atoms/Avatar';
import { Divider } from '@/components/atoms/Divider';
import { Modal } from '@/components/molecules/Modal';

/**
 * Contact Detail Page
 * View and edit a single contact's information
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

// Demo contact data
const DEMO_CONTACT = {
  id: '1',
  name: 'João Silva',
  email: 'joao@empresa.com',
  phone: '(11) 98765-4321',
  stage: 'prospecting',
  company: 'Tech Solutions',
  createdAt: '2026-01-15',
  lastInteraction: '2026-03-10',
  notes: 'Contato promissor, marcado para reunião na próxima semana.',
  tags: ['Tech', 'Enterprise'],
};

export default function ContactDetailPage() {
  useParams();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // TODO: Implement actual delete
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to contacts list
      router.push('/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={SIDEBAR_ITEMS}
        activeId="contacts"
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className={clsx(
                'flex items-center gap-2 text-primary-600 dark:text-primary-400',
                'hover:text-primary-700 dark:hover:text-primary-300 transition-colors',
                'mb-6'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to contacts
            </button>

            {/* Page Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <Avatar
                  name={DEMO_CONTACT.name}
                  size="xl"
                />

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {DEMO_CONTACT.name}
                  </h1>

                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {DEMO_CONTACT.company}
                  </p>

                  <Badge
                    variant="info"
                    size="sm"
                    className="mt-2"
                  >
                    {DEMO_CONTACT.stage}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    // TODO: Open edit form
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="md"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>

            <Divider spacing="md" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                {/* Contact Information */}
                <section className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <a
                        href={`mailto:${DEMO_CONTACT.email}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {DEMO_CONTACT.email}
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <a
                        href={`tel:${DEMO_CONTACT.phone}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {DEMO_CONTACT.phone}
                      </a>
                    </div>

                    <Divider spacing="sm" />

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                      <p className="text-gray-900 dark:text-white">{DEMO_CONTACT.company}</p>
                    </div>
                  </div>
                </section>

                {/* Notes */}
                <section className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Notes
                  </h2>

                  <p className="text-gray-700 dark:text-gray-300">
                    {DEMO_CONTACT.notes}
                  </p>
                </section>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Status Card */}
                <section className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status</h3>

                  <dl className="space-y-3">
                    <div>
                      <dt className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Stage
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {DEMO_CONTACT.stage}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Created
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(DEMO_CONTACT.createdAt).toLocaleDateString('pt-BR')}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Last Interaction
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(DEMO_CONTACT.lastInteraction).toLocaleDateString('pt-BR')}
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* Tags */}
                <section className={clsx(
                  'p-6 rounded-lg',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>

                  <div className="flex flex-wrap gap-2">
                    {DEMO_CONTACT.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        size="sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Contact"
        onClose={() => setIsDeleteModalOpen(false)}
        actions={[
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: () => setIsDeleteModalOpen(false),
          },
          {
            label: 'Delete',
            variant: 'destructive',
            onClick: handleDelete,
            disabled: isDeleting,
          },
        ]}
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete {DEMO_CONTACT.name}? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
