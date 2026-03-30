import { useSyncExternalStore } from "react";
import { notificationStore } from "@/stores/notificationStore";

export const useNotifications = () => {
  const notifications = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getNotifications
  );
  const unreadCount = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getUnreadCount
  );

  return {
    notifications,
    unreadCount,
    addNotification: notificationStore.addNotification,
    markAsRead: notificationStore.markAsRead,
    markAllAsRead: notificationStore.markAllAsRead,
  };
};
