import { ITrendingChannelRepository } from "@modules/social/repositories/ITrendingChannelRepository";

type Request = {
  id: string;
};

export class DeleteTrendingChannel {
  constructor(private trendingRepository: ITrendingChannelRepository) { }

  async execute({ id }: Request): Promise<void> {
    const channel = await this.trendingRepository.findOne(id);
    if (!channel) return;

    await this.trendingRepository.delete(channel);
  }
}

export default DeleteTrendingChannel;
