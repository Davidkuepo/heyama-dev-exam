'use client';


'use client';

import { useState } from 'react';
import { Sparkles, Clock, Type } from 'lucide-react';
import { ObjectsList } from '@/components/objects-list';
import { CreateObjectDialog } from '@/components/create-object-dialog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PrivateRoute } from '@/components/private-route';
import { useI18n } from '@/components/i18n-context';

export default function Home() {
  const { t } = useI18n();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az'>('newest');

  const handleObjectCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleObjectDeleted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
        <Header onSearch={handleSearch} />

        <main className="flex-1 w-full">
          {/* Controls Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {[
                    { value: 'newest' as const, icon: Sparkles, label: t('objects.sort.latest') },
                    { value: 'oldest' as const, icon: Clock, label: t('objects.sort.oldest') },
                    { value: 'az' as const, icon: Type, label: t('objects.sort.az') },
                  ].map((option) => {
                    const IconComponent = option.icon;
                    const isActive = sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          isActive
                            ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                            : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button */}
              <CreateObjectDialog onSuccess={handleObjectCreated} />
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ObjectsList
              refreshTrigger={refreshTrigger}
              onDeleted={handleObjectDeleted}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </div>
        </main>

        <Footer />
      </div>
    </PrivateRoute>
  );
}
