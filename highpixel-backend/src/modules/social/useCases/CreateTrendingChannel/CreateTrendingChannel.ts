import { Either, right } from "@core/logic/Either";
import TrendingChannel from "@modules/social/domain/trending/TrendingChannel";
import { ITrendingChannelRepository } from "@modules/social/repositories/ITrendingChannelRepository";

type Request = {
  name: string;
  subtitle?: string;
  thumbnail?: string;
  badge?: string;
  userId?: string;
};

type Response = Either<null, TrendingChannel>;

export class CreateTrendingChannel {
  constructor(private trendingRepository: ITrendingChannelRepository) { }

  async execute({ name, subtitle, thumbnail, badge, userId }: Request): Promise<Response> {
    const create = TrendingChannel.create({ name, subtitle, thumbnail, badge, createdBy: userId });
    const channel = create.value as TrendingChannel;

    await this.trendingRepository.create(channel);

    return right(channel);
  }
}

export default CreateTrendingChannel;
