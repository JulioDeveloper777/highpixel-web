import express from 'express';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeChangeAppointmentStatusController } from '@modules/staff/useCases/ChangeAppointmentStatus';
import { makeChangeStaffInterviewController } from '@modules/staff/useCases/ChangeStaffInterview';
import { makeHighAuthenticationController } from '@modules/staff/useCases/ControlAuthenticate';
import { makeHighCreateWeekTimesController } from '@modules/staff/useCases/CreateWeekTimes';
import { makeGetStaffAppointmentsController } from '@modules/staff/useCases/GetStaffAppointments';
import { makeHighGetWeekTimes } from '@modules/staff/useCases/GetWeekTimes';
import { makeHighGetWhitelistDetailsController } from '@modules/staff/useCases/GetWhitelistDetails';
import { makeHighSearchWhitelistController } from '@modules/staff/useCases/SearchWhitelist';
import { makeHighUpdateWhitelistStatusController } from '@modules/staff/useCases/Whitelist';
import { makeAnonymousUserMiddleware } from '@infra/http/factories/makeAnonymousUserMiddleware';
import { makeAuthenticationMiddleware } from '@infra/http/factories/makeAuthenticationMiddleware';
import { makeFeatureFlagsMiddleware } from '@infra/http/factories/makeFeatureFlagsMiddleware';
import { makeRateLimitMiddleware } from '@infra/http/factories/makeRateLimitMiddleware';

const High = express.Router();

High.get(
  '/authenticate',
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:session')),
  adaptRoute(makeHighAuthenticationController())
);

High.get(
  '/player/whitelist/search',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist:list')),
  adaptRoute(makeHighSearchWhitelistController())
);

High.get(
  '/player/whitelist/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist')),
  adaptRoute(makeHighGetWhitelistDetailsController())
);

High.post(
  '/staff/appointment/week-times',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 5,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('update:week-times')),
  adaptRoute(makeHighCreateWeekTimesController())
);

High.patch(
  '/player/whitelist/update',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 5,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('update:whitelist')),
  adaptRoute(makeHighUpdateWhitelistStatusController())
);

High.get('/appointment/week-times', adaptRoute(makeHighGetWeekTimes()));

High.post(
  '/player/appointment/change-status',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeChangeAppointmentStatusController())
);

High.get(
  '/player/appointments/search',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist:list')),
  adaptRoute(makeGetStaffAppointmentsController())
);

High.put(
  '/player/appointments/:appointmentId/:tokenId',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 2,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeChangeStaffInterviewController())
);

export { High };
