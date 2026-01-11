import TrendingChannel from "@modules/social/domain/trending/TrendingChannel";

export class TrendingChannelMapper {
  static toPersistence(domain: TrendingChannel) {
    return {
      id: domain.id,
      name: domain.name,
      subtitle: domain.subtitle,
      thumbnail: domain.thumbnail,
      badge: domain.badge,
      createdBy: domain.createdBy,
      createdAt: domain.props.createdAt,
    };
  }

  static toDomain(raw: any): TrendingChannel {
    const props = {
      name: raw.name,
      subtitle: raw.subtitle,
      thumbnail: raw.thumbnail,
      badge: raw.badge,
      createdBy: raw.createdBy,
      createdAt: raw.createdAt,
    };

    return TrendingChannel.create(props, raw.id).value as TrendingChannel;
  }
}

export default TrendingChannelMapper;
