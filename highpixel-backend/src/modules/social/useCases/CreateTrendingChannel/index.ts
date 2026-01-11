import { Controller } from '@core/infra/Controller';
import { PrismaTrendingChannelRepository } from '@modules/social/repositories/implementations/PrismaTrendingChannelRepository';
import { CreateTrendingChannel } from './CreateTrendingChannel';
import { CreateTrendingChannelController } from './CreateTrendingChannelController';

export function makeCreateTrendingChannelController(): Controller {
  const repo = new PrismaTrendingChannelRepository();
  const useCase = new CreateTrendingChannel(repo);
  const controller = new CreateTrendingChannelController(useCase);
  return controller;
}

export { CreateTrendingChannel } from './CreateTrendingChannel';
export { CreateTrendingChannelController } from './CreateTrendingChannelController';

