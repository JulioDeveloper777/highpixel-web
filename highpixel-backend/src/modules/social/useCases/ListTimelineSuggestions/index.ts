import { Controller } from '@core/infra/Controller';
import { PrismaTimelineSuggestionRepository } from '@modules/social/repositories/implementations/PrismaTimelineSuggestionRepository';
import { ListTimelineSuggestions } from './ListTimelineSuggestions';
import { ListTimelineSuggestionsController } from './ListTimelineSuggestionsController';

export function makeListTimelineSuggestionsController(): Controller {
  const repo = new PrismaTimelineSuggestionRepository();
  const useCase = new ListTimelineSuggestions(repo);
  return new ListTimelineSuggestionsController(useCase);
}

export { ListTimelineSuggestions } from './ListTimelineSuggestions';
export { ListTimelineSuggestionsController } from './ListTimelineSuggestionsController';

