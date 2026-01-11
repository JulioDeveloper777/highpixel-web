import { Controller } from '@core/infra/Controller';
import { PermissionDenied } from '@infra/http/errors/PermissionDenied';
import {
  HttpResponse,
  ok,
  fail,
  notFound,
  clientError,
  forbidden,
  unauthorized,
} from '@core/infra/HttpResponse';

import { HighAuthenticate } from '@modules/staff/useCases/ControlAuthenticate/HighAuthenticate';
import { AccountDoesNotExist } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountDoesNotExist';
import { AccountInvalidPassword } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountInvalidPassword';
import { AccountDoesNotHavePermission } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountDoesNotHavePermission';

type HighAuthenticateRequest = {
  authorization: string;
};

export class AuthenticateUserController implements Controller {
  constructor(private HighAuthenticate: HighAuthenticate) {}

  async handle({
    authorization,
  }: HighAuthenticateRequest): Promise<HttpResponse> {
    try {
      // TODO: Add validation
      const result = await this.HighAuthenticate.execute({
        buffer: authorization,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AccountInvalidPassword:
            return unauthorized(error);
          case AccountDoesNotExist:
            return notFound(error);
          case PermissionDenied:
            return forbidden(error);
          case AccountDoesNotHavePermission:
            return forbidden(error);
          default:
            return clientError(error);
        }
      } else {
        const { token } = result.value;

        return ok({
          token,
        });
      }
    } catch (err) {
      return fail(err);
    }
  }
}
