import { Controller } from '@core/infra/Controller';
import { PrismaTimelineSuggestionRepository } from '@modules/social/repositories/implementations/PrismaTimelineSuggestionRepository';
import { CreateTimelineSuggestion } from './CreateTimelineSuggestion';
import { CreateTimelineSuggestionController } from './CreateTimelineSuggestionController';

export function makeCreateTimelineSuggestionController(): Controller {
  const repo = new PrismaTimelineSuggestionRepository();
  const useCase = new CreateTimelineSuggestion(repo);
  return new CreateTimelineSuggestionController(useCase);
}

export { CreateTimelineSuggestion } from './CreateTimelineSuggestion';
export { CreateTimelineSuggestionController } from './CreateTimelineSuggestionController';

