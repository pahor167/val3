import React from 'react';
import type { Competition } from '../../types/competition';
import { useAuthStore } from '../../store/authStore';
import { useCompetitionStore } from '../../store/competitionStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useCompetitionCountdown } from '../../hooks/useCompetitionCountdown';
import { Clock } from 'lucide-react';

interface CompetitionCardProps {
  competition: Competition;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  const user = useAuthStore((state) => state.user);
  const joinCompetition = useCompetitionStore((state) => state.joinCompetition);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { timeRemaining, isExpired } = useCompetitionCountdown(competition);
  
  const canJoin = () => {
    if (!user || competition.isActive || competition.isCompleted) return false;
    if (competition.participants.includes(user.id)) return false;
    if (competition.participants.length >= competition.maxParticipants) return false;
    
    // Check criteria
    if (competition.type === 'age') {
      const [minAge, maxAge] = competition.criteria.toString().split('-').map(Number);
      return user.age >= minAge && user.age <= maxAge;
    } else {
      return user.hairColor === competition.criteria;
    }
  };

  const isUserJoined = user?.id && competition.participants.includes(user.id);

  const handleJoin = () => {
    if (!user) {
      addNotification('error', 'Please log in to join competitions');
      return;
    }
    
    if (!canJoin()) {
      addNotification('error', 'Cannot join this competition');
      return;
    }
    
    if (competition.participants.includes(user.id)) {
      addNotification('success', 'You have already joined this competition');
      return;
    }
    
    joinCompetition(competition.id, user.id);
    addNotification('success', `Successfully joined "${competition.name}"!`);
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      
      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-8 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-white">{competition.name}</h3>
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-3 py-1">
            <span className="text-cyan-300 text-sm font-semibold">
              {competition.type === 'age' ? 'Age Group' : 'Hair Color'}
            </span>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Criteria</span>
            <span className="text-purple-300 font-semibold">{competition.criteria}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Duration</span>
            <span className="text-cyan-300 font-semibold">{competition.duration} minutes</span>
          </div>
          
          {/* Countdown Timer for Active Competitions */}
          {competition.isActive && timeRemaining && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Time Remaining</span>
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${isExpired ? 'text-red-400' : 'text-orange-400'} animate-pulse`} />
                <span className={`font-mono font-bold ${isExpired ? 'text-red-400' : 'text-orange-300'}`}>
                  {timeRemaining}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Prize</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-300 font-bold">{competition.prize} points</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Participants</span>
            <span className="text-emerald-300 font-semibold">
              {competition.participants.length}/{competition.maxParticipants}
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="bg-black/50 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500"
              style={{ width: `${(competition.participants.length / competition.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="mb-6">
          {competition.isCompleted && (
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-300 font-semibold">Competition Completed</span>
            </div>
          )}
          
          {competition.isActive && (
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-300 font-semibold">Live Competition</span>
              </div>
              {timeRemaining && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                    <span className="text-red-300 font-mono font-bold text-lg">{timeRemaining}</span>
                    <span className="text-red-300 text-sm">remaining</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Action button */}
        {!competition.isActive && !competition.isCompleted && (
          <button
            onClick={handleJoin}
            disabled={!canJoin()}
            className={`w-full relative overflow-hidden font-bold py-4 px-8 rounded-xl transition-all duration-300 transform ${
              canJoin()
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 group'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            <span className="relative z-10">
              {isUserJoined ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Joined Arena</span>
                </span>
              ) : (
                'Enter Competition'
              )}
            </span>
            {canJoin() && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
