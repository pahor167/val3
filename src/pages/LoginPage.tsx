import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Users, Hexagon, Zap, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center pt-16 pb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Hexagon className="w-16 h-16 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text" />
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-30"></div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Self.xyz Arena
            </h1>
          </div>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-2xl text-gray-300 font-light leading-relaxed mb-4">
              A <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">Web3 demonstration</span> of decentralized identity gaming
            </p>
            <p className="text-lg text-gray-400 mb-4">
              Experience the future of identity-based competitions on the blockchain
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <a 
                href="https://self.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 hover:border-blue-400/50 transition-all duration-300"
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-medium">Powered by Self.xyz</span>
              </a>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-medium">Demo App</span>
              </div>
            </div>
          </div>
        </header>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mb-6 mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Self-Sovereign Identity</h3>
                <p className="text-gray-300 text-center leading-relaxed">Decentralized identity verification using self.xyz protocols</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mb-6 mx-auto">
                  <Hexagon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Web3 Gaming</h3>
                <p className="text-gray-300 text-center leading-relaxed">Blockchain-based competitions with provable fairness</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Instant Rewards</h3>
                <p className="text-gray-300 text-center leading-relaxed">Immediate token distribution through smart contracts</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Community Driven</h3>
                <p className="text-gray-300 text-center leading-relaxed">Decentralized governance and community-created events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Web3 Demo Notice */}
        <div className="max-w-2xl mx-auto px-4 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-blue-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Hexagon className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-300">Web3 Demonstration</h3>
              </div>
              <p className="text-gray-300 text-center leading-relaxed mb-4">
                This application showcases how <strong className="text-cyan-400">self.xyz</strong> can enable 
                identity-based gaming experiences in a decentralized ecosystem.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">Decentralized Identity</span>
                  </div>
                  <p className="text-gray-400">Self-sovereign user profiles</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 font-medium">Smart Contracts</span>
                  </div>
                  <p className="text-gray-400">Automated fair gameplay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto px-4 pb-16">
          <LoginForm />
        </div>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-lg">&copy; 2025 Self.xyz Arena</p>
                <span className="text-gray-600">•</span>
                <a 
                  href="https://self.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
                >
                  Visit Self.xyz
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <p className="text-gray-500">A fun Web3 demonstration of decentralized identity gaming</p>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-300 text-sm font-medium">Demo Environment</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
