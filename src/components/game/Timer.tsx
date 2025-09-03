import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: string;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, isActive }) => {
  return (
    <div className={`flex items-center space-x-4 text-4xl font-black transition-all duration-300 ${
      isActive ? 'text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text' : 'text-gray-500'
    }`}>
      <div className="relative">
        <Clock className={`w-10 h-10 transition-all duration-300 ${
          isActive ? 'text-red-400 animate-pulse' : 'text-gray-500'
        }`} />
        {isActive && (
          <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 animate-ping"></div>
        )}
      </div>
      <span className="font-mono tracking-wider">{timeLeft}</span>
      {isActive && (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};
