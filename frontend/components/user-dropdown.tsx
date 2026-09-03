'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { useI18n } from './i18n-context';
import { LogOut, Settings, User } from 'lucide-react';

export function UserDropdown() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!user) return null;

  const initial = user.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
          {initial}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
          {user.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          <button
            onClick={() => {
              router.push('/profile');
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <User className="w-4 h-4" />
            {t('nav.profile')}
          </button>

          <button
            onClick={() => {
              router.push('/settings');
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Settings className="w-4 h-4" />
            {t('nav.settings')}
          </button>

          <div className="border-t border-gray-200 dark:border-gray-800 py-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
