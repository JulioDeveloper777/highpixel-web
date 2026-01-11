import { Either, right } from '@core/logic/Either';
import TimelineSuggestion from '@modules/social/domain/suggestion/TimelineSuggestion';
import ITimelineSuggestionRepository from '@modules/social/repositories/ITimelineSuggestionRepository';

type Request = {
  name: string;
  username?: string;
  avatar?: string;
  subtitle?: string;
  badges?: string;
  userId?: string;
};

type Response = Either<null, TimelineSuggestion>;

export class CreateTimelineSuggestion {
  constructor(private repo: ITimelineSuggestionRepository) { }

  async execute({ name, username, avatar, subtitle, badges, userId }: Request): Promise<Response> {
    const create = TimelineSuggestion.create({ name, username, avatar, subtitle, badges, createdBy: userId });
    const sug = create.value as TimelineSuggestion;

    await this.repo.create(sug);

    return right(sug);
  }
}

export default CreateTimelineSuggestion;
