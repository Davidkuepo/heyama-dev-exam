export const dynamic = 'force-dynamic';

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PrivateRoute } from '@/components/private-route';
import { useAuth } from '@/components/auth-context';
import { useI18n } from '@/components/i18n-context';

export default function ProfilePage() {
  const { t } = useI18n();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 max-w-2xl py-8">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="gap-2 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('nav.profile')}
            </h1>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.name')}
                </label>
                <p className="mt-2 text-lg text-gray-900 dark:text-white">
                  {user?.name}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.email')}
                </label>
                <p className="mt-2 text-lg text-gray-900 dark:text-white">
                  {user?.email}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.userId')}
                </label>
                <p className="mt-2 text-sm font-mono text-gray-600 dark:text-gray-400 break-all">
                  {user?.id}
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PrivateRoute>
  );
}
