'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { useI18n } from './i18n-context';

interface ImageUploadProps {
  onChange: (file: File) => void;
  preview?: File;
}

export function ImageUpload({ onChange, preview }: ImageUploadProps) {
  const { t } = useI18n();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    maxFiles: 1,
  });

  const previewUrl = preview ? URL.createObjectURL(preview) : null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t('objects.image')}</label>

      {previewUrl ? (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange(null as any)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
              : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {isDragActive ? (
              <ImageIcon className="w-8 h-8 text-blue-500" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t('imageUpload.dragAndDrop')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('imageUpload.selectImage')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
