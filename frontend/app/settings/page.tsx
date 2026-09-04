'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useI18n } from '@/components/i18n-context';

export default function SettingsPage() {
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
              {t('nav.settings')}
            </h1>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {t('settings.comingSoon')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('settings.preferences')}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>• {t('settings.themePreferences')}</p>
                    <p>• {t('settings.notificationSettings')}</p>
                    <p>• {t('settings.privacyControls')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
