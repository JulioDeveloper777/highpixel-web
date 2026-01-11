import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

interface ITrendingChannelProps {
  name: string;
  subtitle?: string;
  thumbnail?: string;
  badge?: string;
  createdBy?: string;
  createdAt?: Date;
}

export class TrendingChannel extends Entity<ITrendingChannelProps> {
  private constructor(props: ITrendingChannelProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get subtitle() {
    return this.props.subtitle;
  }

  get thumbnail() {
    return this.props.thumbnail;
  }

  get badge() {
    return this.props.badge;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  static create(props: ITrendingChannelProps, id?: string): Either<null, TrendingChannel> {
    const channel = new TrendingChannel({ ...props, createdAt: props.createdAt ?? new Date() }, id);
    return right(channel);
  }
}

export default TrendingChannel;
