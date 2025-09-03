import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'win';
  message: string;
  isVisible: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (type: 'success' | 'error' | 'win', message: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (type, message) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, type, message, isVisible: true }]
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },
}));
