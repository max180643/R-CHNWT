import type { NotificationItem } from '../store/notification';
import { NotificationState } from '../store/notification';
import { getRecoil, setRecoil } from 'recoil-nexus';

let clearNotificationTimeout: ReturnType<typeof setTimeout>;

const getNotificationItems = () => {
  const notificationItems = getRecoil(NotificationState);
  return notificationItems;
};
const setNotificationItems = (item: NotificationItem[]) => {
  setRecoil(NotificationState, item);
};

const addNotificationItem = (item: NotificationItem) => {
  const notificationItems = getNotificationItems();
  setNotificationItems([...notificationItems, item]);
  clearTimeout(clearNotificationTimeout);
  clearNotificationTimeout = setTimeout(() => {
    setNotificationItems([]);
  }, 5000);
};

const notificationItem = (
  type: 'Error' | 'Success' | 'Copied',
  msg?: string
) => {
  const notificationItems = getNotificationItems();
  const item: NotificationItem = {
    id: `Notification-${notificationItems.length + 1}`,
    type: type,
    msg: `${type === 'Copied' ? 'Copied to clipboard !' : msg}`,
  };
  return item;
};

export {addNotificationItem, notificationItem,}