import TrendingChannel from "@modules/social/domain/trending/TrendingChannel";
import { ITrendingChannelRepository } from "@modules/social/repositories/ITrendingChannelRepository";

export class ListTrendingChannels {
  constructor(private trendingRepository: ITrendingChannelRepository) { }

  async execute(): Promise<TrendingChannel[]> {
    return this.trendingRepository.findAll();
  }
}

export default ListTrendingChannels;
