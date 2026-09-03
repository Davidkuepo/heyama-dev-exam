'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { UserDropdown } from './user-dropdown';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { useI18n } from './i18n-context';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGallery = pathname === '/';

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Heyama
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm hidden sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 px-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isGallery
                  ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-1'
                  : 'text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('nav.gallery')}
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.about')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          {/* Language Switcher & User Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher />
            <div className="border-l border-gray-200 dark:border-gray-800 pl-2">
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
            <div className="px-4 py-3 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.gallery')}
              </Link>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t('nav.docs')}
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t('nav.about')}
              </a>

              {/* Mobile Search */}
              <div className="pt-2 pb-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('nav.search')}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
