import React from 'react';
import { CreateCompetition } from '../components/competitions/CreateCompetition';
import { useCompetitionStore } from '../store/competitionStore';
import { useCompetitionCountdown } from '../hooks/useCompetitionCountdown';
import { Trash2, Clock } from 'lucide-react';

export const SetupPage: React.FC = () => {
  const competitions = useCompetitionStore((state) => state.competitions);
  
  // Component to display countdown for individual competition
  const CompetitionCountdown: React.FC<{ competition: any }> = ({ competition }) => {
    const { timeRemaining } = useCompetitionCountdown(competition);
    
    if (!competition.isActive || !timeRemaining) return null;
    
    return (
      <div className="flex items-center space-x-1 mt-2">
        <Clock className="w-3 h-3 text-red-400 animate-pulse" />
        <span className="text-red-300 font-mono text-xs">{timeRemaining}</span>
        <span className="text-red-400 text-xs">left</span>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Create Competition Form */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="mr-3">🛠️</span>
            Competition Forge
          </h2>
          <CreateCompetition />
        </div>

        {/* Competition List */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="mr-3">📊</span>
            Arena Status
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-h-96 overflow-y-auto">
              {competitions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="text-gray-300 text-lg">No competitions forged yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Create your first arena to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {competitions.map((competition) => (
                    <div key={competition.id} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-black/50 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:border-purple-400/50 transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-3">{competition.name}</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Type:</span>
                                  <span className="text-cyan-300">{competition.type === 'age' ? 'Age Group' : 'Hair Color'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Criteria:</span>
                                  <span className="text-purple-300">{competition.criteria}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Max Players:</span>
                                  <span className="text-emerald-300">{competition.maxParticipants}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Duration:</span>
                                  <span className="text-blue-300">{competition.duration}m</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Prize:</span>
                                  <span className="text-yellow-300">{competition.prize} pts</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Players:</span>
                                  <span className="text-pink-300">{competition.participants.length}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex space-x-2">
                              {competition.isCompleted && (
                                <span className="inline-flex items-center space-x-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                  <span>Completed</span>
                                </span>
                              )}
                              {competition.isActive && (
                                <div>
                                  <span className="inline-flex items-center space-x-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                    <span>Live</span>
                                  </span>
                                  <CompetitionCountdown competition={competition} />
                                </div>
                              )}
                              {!competition.isActive && !competition.isCompleted && (
                                <span className="inline-flex items-center space-x-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                  <span>Recruiting</span>
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            className="ml-4 p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-red-500/30"
                            title="Archive Competition"
                            onClick={() => {
                              // In a real app, you'd implement delete functionality
                              console.log('Archive competition:', competition.id);
                            }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
