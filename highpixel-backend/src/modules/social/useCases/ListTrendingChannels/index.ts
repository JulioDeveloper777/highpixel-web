import { Controller } from '@core/infra/Controller';
import { PrismaTrendingChannelRepository } from '@modules/social/repositories/implementations/PrismaTrendingChannelRepository';
import { ListTrendingChannels } from './ListTrendingChannels';
import { ListTrendingChannelsController } from './ListTrendingChannelsController';

export function makeListTrendingChannelsController(): Controller {
  const repo = new PrismaTrendingChannelRepository();
  const useCase = new ListTrendingChannels(repo);
  const controller = new ListTrendingChannelsController(useCase);
  return controller;
}

export { ListTrendingChannels } from './ListTrendingChannels';
export { ListTrendingChannelsController } from './ListTrendingChannelsController';

