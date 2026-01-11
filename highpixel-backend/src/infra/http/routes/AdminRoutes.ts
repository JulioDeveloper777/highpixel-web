import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeAdminMiddleware } from '@infra/http/factories/makeAdminMiddleware';
import { makeAuthenticationMiddleware } from '@infra/http/factories/makeAuthenticationMiddleware';
import { makeCreateTimelineSuggestionController } from '@modules/social/useCases/CreateTimelineSuggestion';
import { makeCreateTrendingChannelController } from '@modules/social/useCases/CreateTrendingChannel';
import { makeDeleteTimelineSuggestionController } from '@modules/social/useCases/DeleteTimelineSuggestion';
import { makeDeleteTrendingChannelController } from '@modules/social/useCases/DeleteTrendingChannel';
import { makeListTimelineSuggestionsController } from '@modules/social/useCases/ListTimelineSuggestions';
import { makeListTrendingChannelsController } from '@modules/social/useCases/ListTrendingChannels';
import express from 'express';

const Admin = express.Router();

Admin.use(adaptMiddleware(makeAuthenticationMiddleware()));
Admin.use(adaptMiddleware(makeAdminMiddleware()));

Admin.get('/trending', adaptRoute(makeListTrendingChannelsController()));
Admin.post('/trending', adaptRoute(makeCreateTrendingChannelController()));
Admin.delete('/trending/:id', adaptRoute(makeDeleteTrendingChannelController()));

Admin.get('/suggestions', adaptRoute(makeListTimelineSuggestionsController()));
Admin.post('/suggestions', adaptRoute(makeCreateTimelineSuggestionController()));
Admin.delete('/suggestions/:id', adaptRoute(makeDeleteTimelineSuggestionController()));

export { Admin };
