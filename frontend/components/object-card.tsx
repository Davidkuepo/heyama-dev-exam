'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './confirm-dialog';
import { useI18n } from './i18n-context';

interface Object {
  _id: string;
  title: string;
  description: string;
  imageData: string;
  createdAt: string;
}

interface ObjectCardProps {
  object: Object;
  onDelete: () => void;
}

export function ObjectCard({ object, onDelete }: ObjectCardProps) {
  const { t } = useI18n();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      toast.success(t('objects.deleteSuccess'));
      setShowConfirm(false);
    } catch (error) {
      toast.error(t('errors.somethingWentWrong'));
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(object.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-900">
          <img
            src={object.imageData}
            alt={object.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">
              {object.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {formattedDate}
            </p>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {object.description}
          </p>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              asChild
            >
              <Link href={`/objects/${object._id}`}>
                {t('common.view')}
                <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              {isDeleting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Trash2 className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title={t('errors.deleteTitle')}
        description={t('errors.deleteConfirm')}
        confirmText={t('objects.delete')}
        cancelText={t('common.cancel')}
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
