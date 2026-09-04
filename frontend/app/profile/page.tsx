'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useI18n } from '@/components/i18n-context';

export default function ProfilePage() {
  const { t } = useI18n();
  const router = useRouter();

  return (
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

          <p className="text-gray-600 dark:text-gray-400">
            No profile available (authentication disabled)
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
