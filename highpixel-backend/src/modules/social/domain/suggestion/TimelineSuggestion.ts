import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

interface ITimelineSuggestionProps {
  name: string;
  username?: string;
  avatar?: string;
  subtitle?: string;
  badges?: string;
  createdBy?: string;
  createdAt?: Date;
}

export class TimelineSuggestion extends Entity<ITimelineSuggestionProps> {
  private constructor(props: ITimelineSuggestionProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }

  get avatar() {
    return this.props.avatar;
  }

  get subtitle() {
    return this.props.subtitle;
  }

  get badges() {
    return this.props.badges;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  static create(props: ITimelineSuggestionProps, id?: string): Either<null, TimelineSuggestion> {
    const sug = new TimelineSuggestion({ ...props, createdAt: props.createdAt ?? new Date() }, id);
    return right(sug);
  }
}

export default TimelineSuggestion;
