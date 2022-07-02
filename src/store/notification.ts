import { atom } from "recoil";

export interface NotificationItem {
  id: string;
  type: 'Error' | 'Success' | 'Copied';
  msg: string;
}

export const NotificationState = atom({
  key: "notificationItems",
  default: [] as NotificationItem[],
});