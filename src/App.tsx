import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useNotificationStore } from './store/notificationStore';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SetupPage } from './pages/SetupPage';
import { Header } from './components/layout/Header';
import { Notification } from './components/ui/Notification';
import { initializeSampleCompetitions } from './utils/initData';

function App() {
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'create'>('dashboard');
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    // Initialize sample competitions on app load
    initializeSampleCompetitions();
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'dashboard' || page === 'create') {
      setCurrentPage(page);
    }
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        
        <main className="flex-1 py-8 pb-16">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'create' && <SetupPage />}
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            isVisible={notification.isVisible}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
