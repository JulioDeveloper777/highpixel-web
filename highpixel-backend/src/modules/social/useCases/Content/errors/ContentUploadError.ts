import { DomainError } from '@core/domain/errors/DomainError';

export class ContentUploadError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:CONTENT:CONTENT:CONTENT_UPLOAD_ERROR`);
    this.name = 'ContentUploadError';
  }
}
