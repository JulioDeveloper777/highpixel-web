import TimelineSuggestion from '@modules/social/domain/suggestion/TimelineSuggestion';
import ITimelineSuggestionRepository from '@modules/social/repositories/ITimelineSuggestionRepository';

export class ListTimelineSuggestions {
  constructor(private repo: ITimelineSuggestionRepository) { }

  async execute(): Promise<TimelineSuggestion[]> {
    return this.repo.findAll();
  }
}

export default ListTimelineSuggestions;
