import { DomainError } from '@core/domain/errors/DomainError';

export class ContentBannerError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:CONTENT:CONTENT_BANNER:CONTENT_BANNER_ERROR`);
    this.name = 'ContentBannerError';
  }
}
