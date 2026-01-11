import { Controller } from '@core/infra/Controller';
import { clientError, fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import { SocialGoogleAuthenticate } from '@modules/accounts/useCases/SocialAuthenticate/SocialGoogleAuthenticate';

type SocialGoogleAuthenticateRequest = {
  token: string;
};

export class SocialGoogleAuthenticateController implements Controller {
  constructor(private socialGoogleAuth: SocialGoogleAuthenticate) { }

  async handle({ token }): Promise<HttpResponse> {
    try {
      const result = await this.socialGoogleAuth.execute({ token });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case SocialGoogleAuthenticate:
            return clientError(result.value);
          default:
            return clientError(result.value);
        }
      } else {
        return ok(result.value);
      }
    } catch (error) {
      return fail(error);
    }
  }
}