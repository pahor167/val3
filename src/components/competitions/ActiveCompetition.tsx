import React, { useEffect } from 'react';
import { useCompetitionStore } from '../../store/competitionStore';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useGameTimer } from '../../hooks/useGameTimer';
import { Timer } from '../game/Timer';
import { selectRandomWinner } from '../../utils/gameLogic';

export const ActiveCompetition: React.FC = () => {
  const activeCompetition = useCompetitionStore((state) => state.activeCompetition);
  const endCompetition = useCompetitionStore((state) => state.endCompetition);
  const updatePoints = useAuthStore((state) => state.updatePoints);
  const user = useAuthStore((state) => state.user);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleTimeUp = () => {
    if (activeCompetition) {
      const winner = selectRandomWinner(activeCompetition.participants);
      if (winner) {
        endCompetition(activeCompetition.id, winner);
        if (user && user.id === winner) {
          updatePoints(activeCompetition.prize);
          addNotification('win', `🎉 Congratulations! You won ${activeCompetition.prize} points!`);
        } else {
          addNotification('success', `Competition "${activeCompetition.name}" has ended. Better luck next time!`);
        }
      }
    }
  };

  const { isActive, start, formatTime } = useGameTimer(
    activeCompetition?.duration || 5,
    handleTimeUp
  );

  useEffect(() => {
    if (activeCompetition && !isActive) {
      start();
    }
  }, [activeCompetition, isActive, start]);

  if (!activeCompetition) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-3xl blur-xl"></div>
        <div className="relative text-center py-16 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⏸️</span>
          </div>
          <p className="text-gray-300 text-xl">No active competition</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Animated glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-3xl blur-2xl animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-ping"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-ping"></div>
      
      {/* Main card */}
      <div className="relative bg-black/50 backdrop-blur-xl border border-red-500/30 p-10 rounded-3xl text-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-orange-900/10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {activeCompetition.name}
            </h2>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Timer */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-black/60 backdrop-blur-sm border border-red-500/50 rounded-2xl p-6">
              <Timer timeLeft={formatTime} isActive={isActive} />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">{activeCompetition.participants.length}</div>
              <div className="text-gray-300">Competitors</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  {activeCompetition.prize}
                </div>
              </div>
              <div className="text-gray-300">Prize Points</div>
            </div>
          </div>
          
          {/* Status message */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
            <p className="text-blue-300 text-xl font-semibold mb-2">🎮 Competition in Progress</p>
            <p className="text-gray-300">
              Winner will be selected randomly when the timer reaches zero!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
