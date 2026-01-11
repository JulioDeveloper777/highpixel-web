import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidPasswordError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_PASSWORD`);
    this.name = 'InvalidPasswordLengthError';
  }
}