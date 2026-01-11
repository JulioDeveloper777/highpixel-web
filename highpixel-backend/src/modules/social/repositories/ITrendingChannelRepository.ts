import TrendingChannel from "@modules/social/domain/trending/TrendingChannel";

export interface ITrendingChannelRepository {
  create(channel: TrendingChannel): Promise<void>;
  save(channel: TrendingChannel): Promise<void>;
  delete(channel: TrendingChannel): Promise<void>;
  findAll(): Promise<TrendingChannel[]>;
  findOne(id: string): Promise<TrendingChannel | null>;
}

export default ITrendingChannelRepository;
