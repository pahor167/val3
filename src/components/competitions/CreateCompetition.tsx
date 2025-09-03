import React, { useState } from 'react';
import { useCompetitionStore } from '../../store/competitionStore';
import { useNotificationStore } from '../../store/notificationStore';
import type { CreateCompetitionData } from '../../types/competition';
import type { HairColor } from '../../types/user';
import { generateAgeRanges } from '../../utils/gameLogic';

const HAIR_COLORS: HairColor[] = ['black', 'brown', 'blonde', 'red', 'gray', 'other'];

export const CreateCompetition: React.FC = () => {
  const [formData, setFormData] = useState<CreateCompetitionData>({
    name: '',
    type: 'age',
    criteria: '18-25',
    maxParticipants: 10,
    duration: 5,
    prize: 100,
  });

  const createCompetition = useCompetitionStore((state) => state.createCompetition);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      createCompetition(formData);
      addNotification('success', `Competition "${formData.name}" created successfully!`);
      setFormData({
        name: '',
        type: 'age',
        criteria: '18-25',
        maxParticipants: 10,
        duration: 5,
        prize: 100,
      });
    }
  };

  const criteriaOptions = formData.type === 'age' ? generateAgeRanges() : HAIR_COLORS;

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      
      {/* Form container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Create Competition
          </h2>
          <p className="text-gray-300">Design your ultimate gaming arena</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Competition Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter an epic competition name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Competition Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as 'age' | 'hairColor',
                criteria: e.target.value === 'age' ? '18-25' : 'brown'
              })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
            >
              <option value="age" className="bg-slate-800 text-white">Age Group</option>
              <option value="hairColor" className="bg-slate-800 text-white">Hair Color</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Criteria
            </label>
            <select
              value={formData.criteria}
              onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 backdrop-blur-sm"
            >
              {criteriaOptions.map((option) => (
                <option key={option} value={option} className="bg-slate-800 text-white">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Max Participants
              </label>
              <input
                type="number"
                min="2"
                max="50"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 10 })}
                className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 5 })}
                className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Prize Points
            </label>
            <input
              type="number"
              min="10"
              max="1000"
              value={formData.prize}
              onChange={(e) => setFormData({ ...formData, prize: parseInt(e.target.value) || 100 })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300 backdrop-blur-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>⚡</span>
              <span>Launch Competition</span>
              <span>🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  );
};
