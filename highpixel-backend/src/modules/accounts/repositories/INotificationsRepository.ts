import { Notification } from "@modules/accounts/domain/Notification";
import { Notifications } from "@modules/accounts/domain/Notifications";

export interface INotificationsRepository {
  exists(id: string): Promise<boolean>;
  findById(id: string): Promise<Notification>;
  save(notifications: Notifications): Promise<void>;
  create(notifications: Notifications): Promise<void>;
  saveSingle(notification: Notification): Promise<void>;
}