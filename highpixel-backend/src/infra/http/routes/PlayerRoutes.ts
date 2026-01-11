import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeCreateAppointmentController } from '@modules/player/useCases/CreateAppointment';
import { makeCreateWhitelistController } from '@modules/player/useCases/CreateWhitelist';
import express from 'express';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { makeAuthenticationMiddleware } from '@infra/http/factories/makeAuthenticationMiddleware';
import { makeFeatureFlagsMiddleware } from '@infra/http/factories/makeFeatureFlagsMiddleware';
import { makeRateLimitMiddleware } from '@infra/http/factories/makeRateLimitMiddleware';


const Player = express.Router();

Player.use(adaptMiddleware(makeAuthenticationMiddleware()));

Player.post(
  '/exams/create-whitelist',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 2,
    })
  ),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateWhitelistController())
);

Player.post(
  '/exams/create-appointment',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 2,
    })
  ),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateAppointmentController())
);

export { Player };
