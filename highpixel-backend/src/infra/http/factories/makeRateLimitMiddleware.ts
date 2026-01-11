import { Middleware } from '@core/infra/Middleware';
import { EnsureRateLimitMiddleware } from '@infra/http/middlewares/EnsureRateLimitMiddleware';
import { Options } from '@infra/http/middlewares/EnsureRateLimitMiddleware';

export function makeRateLimitMiddleware(options: Options): Middleware {
  const middleware = new EnsureRateLimitMiddleware(options);
  return middleware;
}