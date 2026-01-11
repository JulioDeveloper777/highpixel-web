import TimelineSuggestion from '@modules/social/domain/suggestion/TimelineSuggestion';

export interface ITimelineSuggestionRepository {
  create(s: TimelineSuggestion): Promise<void>;
  save(s: TimelineSuggestion): Promise<void>;
  delete(s: TimelineSuggestion): Promise<void>;
  findAll(): Promise<TimelineSuggestion[]>;
  findOne(id: string): Promise<TimelineSuggestion | null>;
}

export default ITimelineSuggestionRepository;
