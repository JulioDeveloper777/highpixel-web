import { DomainError } from '@core/domain/errors/DomainError';

export class CreateCommentInvalidPostContentLength extends Error implements DomainError {
  constructor() {
    super(
      `CORE:SOCIAL:USECASES:CREATE_COMMENT:ERRORS:CREATE_COMMENT_INVALID_POST_CONTENT_LENGTH`
    );
    this.name = 'CreateCommentInvalidPostContentLength';
  }
}
