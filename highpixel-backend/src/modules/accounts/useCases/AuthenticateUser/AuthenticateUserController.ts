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
import { AuthenticateUser } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUser';
import { AccountDoesNotExist } from '@modules/accounts/useCases/AuthenticateUser/errors/AccountDoesNotExist';
import { AccountInvalidPassword } from '@modules/accounts/useCases/AuthenticateUser/errors/AccountInvalidPassword';

type AuthenticateUserRequest = {
  authorization: string;
};

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle({
    authorization,
  }: AuthenticateUserRequest): Promise<HttpResponse> {
    try {
      // TODO: Add validation
      const result = await this.authenticateUser.execute({
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