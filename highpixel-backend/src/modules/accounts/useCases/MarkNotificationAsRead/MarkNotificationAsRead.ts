import { Either, left, right } from "@core/logic/Either";
import { INotificationsRepository } from "@modules/accounts/repositories/INotificationsRepository";
import { NotificationAlreadyRead } from "@modules/accounts/useCases/MarkNotificationAsRead/errors/NotificationAlreadyRead";
import { NotificationNotExists } from "@modules/accounts/useCases/MarkNotificationAsRead/errors/NotificationNotExists";

type MarkNotificationAsReadRequest = {
  id: string;
};

type MarkNotificationAsReadResponse = Either<
  NotificationNotExists | NotificationAlreadyRead,
  boolean
>;

export class MarkNotificationAsRead {
  constructor(private notificationsRepository: INotificationsRepository) { }

  async execute({
    id,
  }: MarkNotificationAsReadRequest): Promise<MarkNotificationAsReadResponse> {
    const exists = await this.notificationsRepository.exists(id);

    if (!exists) {
      return left(new NotificationNotExists());
    }

    const notification = await this.notificationsRepository.findById(id);

    if (notification.read) {
      return left(new NotificationAlreadyRead());
    }

    notification.markAsRead = true;
    await this.notificationsRepository.saveSingle(notification);

    return right(true);
  }
}