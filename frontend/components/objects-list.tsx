'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { Loader2 } from 'lucide-react';
import { ObjectCard } from './object-card';
import { useSocket } from './socket-provider';
import { useI18n } from './i18n-context';

interface Object {
  id: string;
  title: string;
  description: string;
  imageData: string;
  createdAt: string;
}

interface ObjectsListProps {
  refreshTrigger: number;
  onDeleted: () => void;
  searchQuery?: string;
  sortBy?: 'newest' | 'oldest' | 'az';
}

export function ObjectsList({
  refreshTrigger,
  onDeleted,
  searchQuery = '',
  sortBy = 'newest',
}: ObjectsListProps) {
  const { t } = useI18n();
  const socket = useSocket();
  const [objects, setObjects] = useState<Object[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['objects', refreshTrigger],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/objects');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch objects:', error);
        return [];
      }
    },
  });

  useEffect(() => {
    if (data) {
      setObjects(data);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) {
      console.warn('Socket not connected yet');
      return;
    }

    const handleObjectCreated = (newObject: Object) => {
      setObjects((prev) => [newObject, ...prev]);
    };

    const handleObjectDeleted = ({ id }: { id: string }) => {
      setObjects((prev) => prev.filter((obj) => obj.id !== id));
    };

    socket.on('objectCreated', handleObjectCreated);
    socket.on('objectDeleted', handleObjectDeleted);

    return () => {
      socket.off('objectCreated', handleObjectCreated);
      socket.off('objectDeleted', handleObjectDeleted);
    };
  }, [socket]);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/objects/${id}`);
      onDeleted();
    } catch (error) {
      console.error('Failed to delete object:', error);
    }
  };

  const filteredAndSortedObjects = objects
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (objects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-gray-500 dark:text-gray-400">{t('objects.noObjects')}</p>
      </div>
    );
  }

  if (filteredAndSortedObjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-gray-500 dark:text-gray-400">{t('objects.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filteredAndSortedObjects.map((object) => (
          <ObjectCard
            key={object.id}
            object={object}
            onDelete={() => handleDelete(object.id)}
          />
        ))}
      </div>
    </div>
  );
}
