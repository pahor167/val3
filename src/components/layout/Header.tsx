import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Trophy, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <header className="relative bg-black/20 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-lg opacity-50"></div>
              <Trophy className="relative w-10 h-10 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Gaming Arena
            </h1>
          </div>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === 'dashboard' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/25' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <span className="relative z-10">Dashboard</span>
                {currentPage === 'dashboard' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-sm"></div>
                )}
              </button>
              <button
                onClick={() => onNavigate('create')}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === 'create' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/25' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <span className="relative z-10">Create Competition</span>
                {currentPage === 'create' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                )}
              </button>
            </nav>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold text-white">{user.username}</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  <span className="font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                    {user.points} pts
                  </span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all duration-300 p-3 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-6 flex space-x-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === 'dashboard' 
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'text-gray-300 hover:text-white bg-black/30 border border-white/20'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === 'create' 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                : 'text-gray-300 hover:text-white bg-black/30 border border-white/20'
            }`}
          >
            Create
          </button>
        </div>
      </nav>
    </header>
  );
};
