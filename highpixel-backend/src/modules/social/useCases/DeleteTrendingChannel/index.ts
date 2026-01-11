import { Controller } from '@core/infra/Controller';
import { PrismaTrendingChannelRepository } from '@modules/social/repositories/implementations/PrismaTrendingChannelRepository';
import { DeleteTrendingChannel } from './DeleteTrendingChannel';
import { DeleteTrendingChannelController } from './DeleteTrendingChannelController';

export function makeDeleteTrendingChannelController(): Controller {
  const repo = new PrismaTrendingChannelRepository();
  const useCase = new DeleteTrendingChannel(repo);
  const controller = new DeleteTrendingChannelController(useCase);
  return controller;
}

export { DeleteTrendingChannel } from './DeleteTrendingChannel';
export { DeleteTrendingChannelController } from './DeleteTrendingChannelController';

