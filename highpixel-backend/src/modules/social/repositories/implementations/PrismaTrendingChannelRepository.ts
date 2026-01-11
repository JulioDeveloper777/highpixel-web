import { prisma } from "@infra/prisma/prisma-client";
import TrendingChannel from "@modules/social/domain/trending/TrendingChannel";
import TrendingChannelMapper from "@modules/social/mappers/TrendingChannelMapper";
import ITrendingChannelRepository from "@modules/social/repositories/ITrendingChannelRepository";

export class PrismaTrendingChannelRepository implements ITrendingChannelRepository {
  async create(channel: TrendingChannel): Promise<void> {
    const data = TrendingChannelMapper.toPersistence(channel);
    await prisma.trendingChannel.create({ data });
  }

  async save(channel: TrendingChannel): Promise<void> {
    const data = TrendingChannelMapper.toPersistence(channel);
    await prisma.trendingChannel.update({ where: { id: channel.id }, data });
  }

  async delete(channel: TrendingChannel): Promise<void> {
    await prisma.trendingChannel.delete({ where: { id: channel.id } });
  }

  async findAll(): Promise<TrendingChannel[]> {
    const rows = await prisma.trendingChannel.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(r => TrendingChannelMapper.toDomain(r));
  }

  async findOne(id: string): Promise<TrendingChannel | null> {
    const row = await prisma.trendingChannel.findUnique({ where: { id } });
    if (!row) return null;
    return TrendingChannelMapper.toDomain(row);
  }
}

export default PrismaTrendingChannelRepository;
