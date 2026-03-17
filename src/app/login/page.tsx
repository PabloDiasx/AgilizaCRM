'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { LoginForm } from '@/components/organisms/LoginForm';

/**
 * Login Page
 * Full page login interface with form and branding
 */

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Replace with actual authentication logic
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Image
              src="/assets/logoagilizasemfundo.png"
              alt="Logo AgilizaCRM"
              width={320}
              height={128}
              priority
              className="h-32 w-auto object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AgilizaCRM
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Plataforma de CRM para vendas e relacionamento
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className={clsx(
            'p-6 sm:p-8 rounded-2xl',
            'bg-white dark:bg-gray-800',
            'shadow-xl',
            'border border-gray-100 dark:border-gray-700'
          )}
        >
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
            showForgotPassword={true}
            showSignUp={true}
            onSignUp={() => {
              router.push('/signup');
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>© 2026 AgilizaCRM. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
