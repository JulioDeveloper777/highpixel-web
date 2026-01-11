import { Controller } from '@core/infra/Controller';
import {
  fail,
  HttpResponse,
  notFound,
  ok
} from '@core/infra/HttpResponse';
import { GetAccountData } from '@modules/accounts/useCases/GetAccountData/GetAccountData';
import { NotificationMapper } from '@modules/accounts/mappers/NotificationMapper';
import { GetAccountDataUserNotExists } from '@modules/accounts/useCases/GetAccountData/errors/GetAccountDataUserNotExists';

export class GetAccountDataController implements Controller {
  constructor(private getAccountData: GetAccountData) { }

  async handle({ user }): Promise<HttpResponse> {
    const result = await this.getAccountData.execute({ user });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case GetAccountDataUserNotExists:
          return notFound(error);
        default:
          return fail(error);
      }
    } else {
      const Parse = result.value;

      return ok({
        _id: Parse.id,
        username: Parse.username.value,
        email: Parse.email.value,
        features: Parse.features,
        isPremium: Parse.isPremium,
        isEarlySupporter: Parse.isEarlySupporter,
        appointment: Parse.appointment,
        isVerified: Parse.isVerified,
        staff: Parse.staff,
        connections: Parse.connections.getItems().map(item => item.plataform),
        notifications: Parse.notifications
          .getItems()
          .map(notify => NotificationMapper.toPersistence(notify)),
        whitelist: Parse.status,
        timeout: Parse.timeout,
        ...Parse.Profile,
      });
    }
  }
}