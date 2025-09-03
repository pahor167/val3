import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { LoginFormData, HairColor } from '../../types/user';

const HAIR_COLORS: HairColor[] = ['black', 'brown', 'blonde', 'red', 'gray', 'other'];

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    age: 0,
    hairColor: 'brown',
  });
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.trim() && formData.age > 0) {
      login(formData);
    }
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      
      {/* Form container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Enter the Arena
          </h2>
          <p className="text-gray-300">Connect your identity to start competing</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter your gaming identity"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Age
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 backdrop-blur-sm"
              placeholder="Your age"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Hair Color
            </label>
            <select
              value={formData.hairColor}
              onChange={(e) => setFormData({ ...formData, hairColor: e.target.value as HairColor })}
              className="w-full px-4 py-4 bg-black/50 border border-white/20 rounded-xl text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 backdrop-blur-sm"
            >
              {HAIR_COLORS.map((color) => (
                <option key={color} value={color} className="bg-slate-800 text-white">
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 group"
          >
            <span className="relative z-10">Launch Into Arena</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  );
};
