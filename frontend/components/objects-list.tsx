'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { ObjectCard } from './object-card';
import { useSocket } from './socket-provider';

interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface ObjectsListProps {
  refreshTrigger: number;
  onDeleted: () => void;
}

export function ObjectsList({ refreshTrigger, onDeleted }: ObjectsListProps) {
  const socket = useSocket();
  const [objects, setObjects] = useState<Object[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['objects', refreshTrigger],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:3000/objects');
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
      setObjects((prev) => prev.filter((obj) => obj._id !== id));
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
      await axios.delete(`http://localhost:3000/objects/${id}`);
      onDeleted();
    } catch (error) {
      console.error('Failed to delete object:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (objects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No objects yet. Create your first one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {objects.map((object) => (
        <ObjectCard
          key={object._id}
          object={object}
          onDelete={() => handleDelete(object._id)}
        />
      ))}
    </div>
  );
}
