'use client';

import { useState } from 'react';
import { ObjectsList } from '@/components/objects-list';
import { CreateObjectDialog } from '@/components/create-object-dialog';
import { Header } from '@/components/header';
import { PrivateRoute } from '@/components/private-route';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleObjectCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleObjectDeleted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Object Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Create, manage, and showcase your objects with beautiful imagery
            </p>
          </div>

          <div className="flex justify-center">
            <CreateObjectDialog onSuccess={handleObjectCreated} />
          </div>

          <ObjectsList
            refreshTrigger={refreshTrigger}
            onDeleted={handleObjectDeleted}
          />
        </div>
      </main>
    </div>
    </PrivateRoute>
  );
}
