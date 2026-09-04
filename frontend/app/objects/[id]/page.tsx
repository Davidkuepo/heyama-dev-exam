'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, AlertCircle, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useI18n } from '@/components/i18n-context';

interface Object {
  id: string;
  title: string;
  description: string;
  imageData: string;
  createdAt: string;
}

export default function ObjectDetailPage() {
  const { t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const [object, setObject] = useState<Object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await apiClient.get(`/objects/${params.id}`);
        setObject(response.data);
      } catch (err) {
        setError(t('errors.somethingWentWrong'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchObject();
    }
  }, [params.id, t]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/objects/${params.id}`);
      toast.success(t('objects.deleteSuccess'));
      router.push('/');
    } catch (err) {
      toast.error(t('errors.somethingWentWrong'));
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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
          <p className="text-gray-600 dark:text-gray-400">{error || t('objects.noObjects')}</p>
          <Button onClick={() => router.push('/')}>{t('common.back')}</Button>
        </div>
      </div>
    );
  }

  const locale = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';
  const formattedDate = new Date(object.createdAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(object.createdAt).toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 max-w-5xl py-8">
          {/* Back Button */}
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="gap-2 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={object.imageData}
                    alt={object.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Title and Description */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
                  {object.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {object.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-900 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        {t('objects.created')}
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        {formattedDate} {t('common.at')} {formattedTime}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-blue-200 dark:border-blue-900 pt-4">
                    <p className="text-xs font-mono text-blue-600 dark:text-blue-400 break-all">
                      {t('objects.id')}: {object.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                variant="destructive"
                className="w-full gap-2 h-11"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('objects.deleting')}
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    {t('objects.delete')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>

        <Footer />

        <ConfirmDialog
          open={showDeleteConfirm}
          title={t('errors.deleteTitle')}
          description={t('objects.deleteDetailConfirm')}
          confirmText={t('objects.delete')}
          cancelText={t('common.cancel')}
          variant="destructive"
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
    );
  }
