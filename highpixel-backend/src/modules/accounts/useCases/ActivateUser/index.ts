import { Controller } from "@core/infra/Controller";
import { PrismaNotificationsRepository } from "@modules/accounts/repositories/implementations/PrismaNotificationsRepository";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";
import { ActivateUser } from "@modules/accounts/useCases/ActivateUser/ActivateUser";
import { ActivateController } from "@modules/accounts/useCases/ActivateUser/ActivateUserController";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";

export function makeActivateUserController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const notificationRepo = new PrismaNotificationsRepository();
  const repository = new PrismaUserRepository(
    notificationRepo,
    null,
    tokensRepository
  );
  const useCase = new ActivateUser(repository, tokensRepository);
  const controller = new ActivateController(useCase);

  return controller;
}


