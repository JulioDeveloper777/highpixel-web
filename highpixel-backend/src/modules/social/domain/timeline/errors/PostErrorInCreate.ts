import { DomainError } from '@core/domain/errors/DomainError';
import { ValidationError } from '@infra/http/errors';

export class PostErrorInCreate extends Error implements DomainError {
  constructor() {
    super(`CORE:SOCIAL:DOMAIN:TIMELINE:ERROS:POST_ERROR_IN_CREATE`);
    this.name = 'PostErrorInCreate';
  }
}
