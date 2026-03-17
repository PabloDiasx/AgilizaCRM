'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { SignupForm, SignupData } from '@/components/organisms/SignupForm';

/**
 * Signup Page
 * Full page signup interface with company and personal information
 */

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Replace with actual signup API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          companyName: data.companyName,
          fullName: data.fullName,
          cpfCnpj: data.cpfCnpj,
          address: data.address,
          city: data.city,
          state: data.state,
          acceptedTerms: data.acceptedTerms,
          acceptedPrivacy: data.acceptedPrivacy,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Signup failed');
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        'min-h-screen w-full',
        'bg-gradient-to-br from-white to-gray-50',
        'dark:from-gray-900 dark:to-gray-800',
        'flex items-center justify-center p-4'
      )}
    >
      {/* Background decoration - subtle */}
      <div
        className={clsx(
          'absolute inset-0 overflow-hidden pointer-events-none',
          'opacity-15 dark:opacity-5'
        )}
      >
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-gray-300 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/logoagilizasemfundo.png"
              alt="Logo AgilizaCRM"
              width={240}
              height={96}
              priority
              className="h-20 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bem-vindo ao AgilizaCRM
          </h1>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Comece seu período de teste de 7 dias
          </p>
        </div>

        {/* Signup Form Card */}
        <div
          className={clsx(
            'p-6 rounded-2xl',
            'bg-white dark:bg-gray-800',
            'shadow-xl',
            'border border-gray-100 dark:border-gray-700'
          )}
        >
          <SignupForm
            onSubmit={handleSignup}
            isLoading={isLoading}
            error={error}
            onBackToLogin={() => router.push('/login')}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>© 2026 AgilizaCRM. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
