import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'win';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ type, message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'win':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      default:
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'success':
        return 'from-emerald-500/20 to-green-500/20';
      case 'error':
        return 'from-red-500/20 to-pink-500/20';
      case 'win':
        return 'from-yellow-500/20 to-orange-500/20';
      default:
        return 'from-emerald-500/20 to-green-500/20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30';
      case 'error':
        return 'border-red-500/30';
      case 'win':
        return 'border-yellow-500/30';
      default:
        return 'border-emerald-500/30';
    }
  };

  return (
    <div className="animate-in slide-in-from-right-1 duration-300">
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r ${getGradient()} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
        <div className={`relative bg-black/60 backdrop-blur-xl border ${getBorderColor()} p-4 rounded-2xl shadow-2xl max-w-sm`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-1">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium leading-relaxed">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
