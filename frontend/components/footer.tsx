'use client';

import { Heart } from 'lucide-react';
import { useI18n } from './i18n-context';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Heyama
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.docs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{t('footer.info')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
