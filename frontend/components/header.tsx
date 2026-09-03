'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { LogOut } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Heyama
            </div>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Gallery
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Docs
              </a>
            </nav>

            {user && (
              <div className="flex items-center gap-4 pl-6 border-l border-gray-200 dark:border-gray-800">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
