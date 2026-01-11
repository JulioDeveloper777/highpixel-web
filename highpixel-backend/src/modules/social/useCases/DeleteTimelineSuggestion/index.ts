import { Controller } from '@core/infra/Controller';
import { PrismaTimelineSuggestionRepository } from '@modules/social/repositories/implementations/PrismaTimelineSuggestionRepository';
import { DeleteTimelineSuggestion } from './DeleteTimelineSuggestion';
import { DeleteTimelineSuggestionController } from './DeleteTimelineSuggestionController';

export function makeDeleteTimelineSuggestionController(): Controller {
  const repo = new PrismaTimelineSuggestionRepository();
  const useCase = new DeleteTimelineSuggestion(repo);
  return new DeleteTimelineSuggestionController(useCase);
}

export { DeleteTimelineSuggestion } from './DeleteTimelineSuggestion';
export { DeleteTimelineSuggestionController } from './DeleteTimelineSuggestionController';

