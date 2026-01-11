import { Controller } from '@core/infra/Controller';
import { PrismaNotificationsRepository } from '@modules/accounts/repositories/implementations/PrismaNotificationsRepository';
import { PrismaUserRepository } from '@modules/accounts/repositories/implementations/PrismaUsersRepository';
import { SocialGoogleAuthenticate } from '@modules/accounts/useCases/SocialAuthenticate/SocialGoogleAuthenticate';
import { SocialGoogleAuthenticateController } from '@modules/accounts/useCases/SocialAuthenticate/SocialGoogleAuthenticateController';

export function makeSocialGoogleAuthenticateController(): Controller {
  const notificationRepo = new PrismaNotificationsRepository();
  const repository = new PrismaUserRepository(notificationRepo);
  const useCase = new SocialGoogleAuthenticate(repository);
  const controller = new SocialGoogleAuthenticateController(useCase);

  return controller;
}