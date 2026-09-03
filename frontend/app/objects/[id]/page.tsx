'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrivateRoute } from '@/components/private-route';

interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ObjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [object, setObject] = useState<Object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await apiClient.get(`/objects/${params.id}`);
        setObject(response.data);
      } catch (err) {
        setError('Failed to load object');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchObject();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !object) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">{error || 'Object not found'}</p>
          <Button onClick={() => router.push('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(object.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Image */}
          <div className="flex items-center">
            <div className="w-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src={object.imageUrl}
                alt={object.title}
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {object.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created on {formattedDate}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {object.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-600 dark:text-blue-400 font-medium">Object ID</p>
                <p className="text-xs text-blue-500 dark:text-blue-300 font-mono break-all">
                  {object._id}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  Image URL
                </p>
                <a
                  href={object.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-500 dark:text-purple-300 hover:underline truncate"
                >
                  View in S3
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PrivateRoute>
  );
}
