import { Controller } from '@core/infra/Controller';
import { SubscribeVisitor } from '@modules/social/useCases/SubscribeVisitor/SubscribeVisitor';
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { SubscribeVisitorProfileDoesNotExist } from '@modules/social/useCases/SubscribeVisitor/errors/SubscribeVisitorProfileDoesNotExist';
import { SubscribeVisitorAlreadySubscribed } from '@modules/social/useCases/SubscribeVisitor/errors/SubscribeVisitorAlreadySubscribed';
import { SubscribeVisitorDoesNotExist } from '@modules/social/useCases/SubscribeVisitor/errors/SubscribeVisitorDoesNotExist';

type SubscribeVisitorRequest = {
  visitors_id: string;
  visitor_id: string;
};

export class SubscribeVisitorController implements Controller {
  constructor(private updateProfile: SubscribeVisitor) {}

  async handle(data: SubscribeVisitorRequest): Promise<HttpResponse> {
    const result = await this.updateProfile.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case SubscribeVisitorProfileDoesNotExist:
          return notFound(error);
        case SubscribeVisitorAlreadySubscribed:
          return conflict(error);
        case SubscribeVisitorDoesNotExist:
          return notFound(error);
        default:
          return clientError(error);
      }
    } else {
      return ok();
    }
  }
}
