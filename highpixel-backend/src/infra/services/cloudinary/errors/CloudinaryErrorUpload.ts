import { DomainError } from '@core/domain/errors/DomainError';

export class CloudinaryErrorUpload extends Error implements DomainError {
  constructor() {
    super(`INFRA:SERVICE:CLOUDINARY:ERROS:CLOUDINARY_ERROR_UPLOAD`);
    this.name = 'CloudinaryErrorUpload';
  }
}