import TimelineSuggestion from '@modules/social/domain/suggestion/TimelineSuggestion';

export class TimelineSuggestionMapper {
  static toPersistence(domain: TimelineSuggestion) {
    return {
      id: domain.id,
      name: domain.name,
      username: domain.username,
      avatar: domain.avatar,
      subtitle: domain.subtitle,
      badges: domain.badges,
      createdBy: domain.createdBy,
      createdAt: domain.props.createdAt,
    };
  }

  static toDomain(raw: any): TimelineSuggestion {
    const props = {
      name: raw.name,
      username: raw.username,
      avatar: raw.avatar,
      subtitle: raw.subtitle,
      badges: raw.badges,
      createdBy: raw.createdBy,
      createdAt: raw.createdAt,
    };

    return TimelineSuggestion.create(props, raw.id).value as TimelineSuggestion;
  }
}

export default TimelineSuggestionMapper;
