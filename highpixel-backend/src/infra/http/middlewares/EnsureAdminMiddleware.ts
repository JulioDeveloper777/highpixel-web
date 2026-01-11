import { HttpResponse, fail, forbidden, ok } from '@core/infra/HttpResponse';
import { Middleware } from '@core/infra/Middleware';
import { AccessDenied } from '@infra/http/errors/AccessDenied';
import { EnsureAuthenticatedMiddleware } from './EnsureAuthenticatedMiddleware';

type Request = {
  accessToken?: string;
};

export class EnsureAdminMiddleware implements Middleware {
  constructor() { }

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const auth = new EnsureAuthenticatedMiddleware();
      const res = await auth.handle({ accessToken: request.accessToken });

      if (res.statusCode !== 200) return res;

      const user = (res.body as any).user;

      if (!user || user.role !== 'ADMIN') {
        return forbidden(new AccessDenied());
      }

      return ok({ user });
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export default EnsureAdminMiddleware;
