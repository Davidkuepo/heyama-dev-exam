'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface ObjectCardProps {
  object: Object;
  onDelete: () => void;
}

export function ObjectCard({ object, onDelete }: ObjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const formattedDate = new Date(object.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={object.imageUrl}
          alt={object.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {object.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formattedDate}
          </p>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {object.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 group/btn"
            asChild
          >
            <Link href={`/objects/${object._id}`}>
              View
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition" />
            </Link>
          </Button>

          {!showConfirm ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs"
              >
                {isDeleting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
