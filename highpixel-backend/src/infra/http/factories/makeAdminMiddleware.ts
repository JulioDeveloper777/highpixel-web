import { Middleware } from '@core/infra/Middleware';
import { EnsureAdminMiddleware } from '@infra/http/middlewares/EnsureAdminMiddleware';

export function makeAdminMiddleware(): Middleware {
  return new EnsureAdminMiddleware();
}
