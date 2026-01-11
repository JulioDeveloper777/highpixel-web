import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { MarkNotificationAsRead } from '@modules/accounts/useCases/MarkNotificationAsRead/MarkNotificationAsRead';
import { NotificationAlreadyRead } from '@modules/accounts/useCases/MarkNotificationAsRead/errors/NotificationAlreadyRead';
import { NotificationNotExists } from '@modules/accounts/useCases/MarkNotificationAsRead/errors/NotificationNotExists';

type MarkNotificationAsReadRequestController = {
  id: string;
};

export class MarkNotificationAsReadController implements Controller {
  constructor(private markNotificationAsRead: MarkNotificationAsRead) { }

  async handle({
    id,
  }: MarkNotificationAsReadRequestController): Promise<HttpResponse> {
    const result = await this.markNotificationAsRead.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case NotificationNotExists:
          return notFound(error);
        case NotificationAlreadyRead:
          return conflict(error);
        default:
          return clientError(error);
      }
    } else {
      return ok();
    }
  }
}