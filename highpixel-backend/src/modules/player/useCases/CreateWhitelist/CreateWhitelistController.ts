import {
  conflict,
  fail,
  forbidden,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { Controller } from '@core/infra/Controller';
import { CreateWhitelist } from '@modules/player/useCases/CreateWhitelist/CreateWhitelist';
import { PlayerAccountDoesNotExist } from '@modules/player/useCases/CreateWhitelist/errors/PlayerAccountDoesNotExist';
import { PlayerAccountIsTimeouted } from '@modules/player/useCases/CreateWhitelist/errors/PlayerAccountIsTimeouted';
import { PlayerAlreadyHaveWhitelist } from '@modules/player/useCases/CreateWhitelist/errors/PlayerAlreadyHaveWhitelist';

type AnswerRequest = {
  id: number;
  question: string;
  answer: string;
};

type CreateWhitelistControllerRequest = {
  user: { id: string };
  exam: AnswerRequest[];
};

export class CreateWhitelistController implements Controller {
  constructor(private createWhitelist: CreateWhitelist) {}

  async handle({
    exam,
    user,
  }: CreateWhitelistControllerRequest): Promise<HttpResponse> {
    const result = await this.createWhitelist.execute({ exam, user });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case PlayerAccountDoesNotExist:
          return notFound(error);
        case PlayerAlreadyHaveWhitelist:
          return conflict(error);
        case PlayerAccountIsTimeouted:
          return forbidden(error);
        default:
          return fail(error);
      }
    }

    return ok();
  }
}
