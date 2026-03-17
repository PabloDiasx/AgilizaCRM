'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Home Page - Redirect to login or dashboard
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        <p className="text-gray-600 dark:text-gray-400">Redirecionando para login</p>
      </div>
    </div>
  );
}
