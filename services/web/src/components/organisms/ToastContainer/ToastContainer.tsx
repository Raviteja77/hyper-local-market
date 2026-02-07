// services/web/src/components/organisms/ToastContainer/ToastContainer.tsx
'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore, Toast } from '@/store';
import { Typography } from '../../atoms';

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    info: <Info size={20} className="text-blue-600" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${bgColors[toast.type]} animate-slide-in`}
    >
      {icons[toast.type]}
      <Typography variant="body" className="flex-1">
        {toast.message}
      </Typography>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
