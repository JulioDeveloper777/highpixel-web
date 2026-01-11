import ITimelineSuggestionRepository from '@modules/social/repositories/ITimelineSuggestionRepository';

type Request = { id: string };

export class DeleteTimelineSuggestion {
  constructor(private repo: ITimelineSuggestionRepository) { }

  async execute({ id }: Request): Promise<void> {
    const s = await this.repo.findOne(id);
    if (!s) return;
    await this.repo.delete(s);
  }
}

export default DeleteTimelineSuggestion;
