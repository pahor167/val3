import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useCompetitionStore } from '../store/competitionStore';
import { CompetitionCard } from '../components/competitions/CompetitionCard';
import { ActiveCompetition } from '../components/competitions/ActiveCompetition';
import { Play, Trophy } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { competitions, activeCompetition, startCompetition } = useCompetitionStore();

  const availableCompetitions = competitions.filter(
    (comp) => !comp.isCompleted && !comp.isActive
  );

  const completedCompetitions = competitions.filter(comp => comp.isCompleted);

  const handleStartCompetition = (competitionId: string) => {
    const competition = competitions.find(c => c.id === competitionId);
    if (competition && competition.participants.length >= 2) {
      startCompetition(competitionId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-16">
      {/* Welcome Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                Welcome back, {user?.username}!
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Points:</span>
                  <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                    {user?.points || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Age:</span>
                  <span className="text-white font-medium">{user?.age}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Hair:</span>
                  <span className="text-white font-medium capitalize">{user?.hairColor}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 font-semibold">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeCompetition && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            Live Competition
          </h2>
          <ActiveCompetition />
        </div>
      )}

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Trophy className="w-8 h-8 text-cyan-400 mr-3" />
          Available Competitions
        </h2>
        {availableCompetitions.length === 0 ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-3xl blur-xl"></div>
            <div className="relative text-center py-16 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl">
              <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 text-xl mb-2">No competitions available at the moment.</p>
              <p className="text-gray-500">Create a new competition to ignite the arena!</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableCompetitions.map((competition) => (
              <div key={competition.id} className="relative group">
                <CompetitionCard competition={competition} />
                {competition.participants.length >= 2 && (
                  <button
                    onClick={() => handleStartCompetition(competition.id)}
                    className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-emerald-500/25 z-10"
                    title="Launch Competition"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {completedCompetitions.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
            Recent Results
          </h2>
          <div className="space-y-6">
            {completedCompetitions.slice(-5).reverse().map((competition) => (
              <div key={competition.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-emerald-500/30 p-6 rounded-2xl hover:border-emerald-400/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{competition.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <span>Type: <span className="text-cyan-400">{competition.type === 'age' ? 'Age Group' : 'Hair Color'}</span></span>
                        <span>Criteria: <span className="text-purple-400">{competition.criteria}</span></span>
                        <span>Prize: <span className="text-yellow-400">{competition.prize} points</span></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 font-bold">Completed</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {competition.participants.length} participants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
