// Simple in-memory notification store
export interface Notification {
  id: string;
  message: string;
  linkText?: string;
  linkTo?: string;
  read: boolean;
  createdAt: Date;
}

let notifications: Notification[] = [];
let listeners: Array<() => void> = [];

const notify = () => listeners.forEach((l) => l());

export const notificationStore = {
  getNotifications: () => notifications,
  getUnreadCount: () => notifications.filter((n) => !n.read).length,
  
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => {
    notifications = [
      { ...n, id: crypto.randomUUID(), read: false, createdAt: new Date() },
      ...notifications,
    ];
    notify();
  },

  markAsRead: (id: string) => {
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    notify();
  },

  markAllAsRead: () => {
    notifications = notifications.map((n) => ({ ...n, read: true }));
    notify();
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
