import { Controller } from "@core/infra/Controller";
import { PrismaConnectionsRepository } from "@modules/accounts/repositories/implementations/PrismaConnectionsRepository";
import { PrismaNotificationsRepository } from "@modules/accounts/repositories/implementations/PrismaNotificationsRepository";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaAnswersRepository } from "@modules/player/repositories/prisma/PrismaAnswerRepository";
import { PrismaWhitelistRepository } from "@modules/player/repositories/prisma/PrismaWhitelistRepository";
import { UpdateWhitelistController } from "@modules/staff/useCases/Whitelist/UpdateWhitelistController";
import { UpdateWhitelistDelete } from "@modules/staff/useCases/Whitelist/UpdateWhitelistDelete";
import { UpdateWhitelistStatus } from "@modules/staff/useCases/Whitelist/UpdateWhitelistStatus";

export function makeHighUpdateWhitelistStatusController(): Controller {
  const notificationRepo = new PrismaNotificationsRepository();
  const connectionsRepository = new PrismaConnectionsRepository();
  const answersRepository = new PrismaAnswersRepository();
  const whitelistRepository = new PrismaWhitelistRepository(answersRepository);
  const usersRepository = new PrismaUserRepository(notificationRepo);
  const useCase = new UpdateWhitelistStatus(
    whitelistRepository,
    connectionsRepository,
    usersRepository
  );
  const updateWhitelistDeleteUseCase = new UpdateWhitelistDelete(
    whitelistRepository
  );
  const controller = new UpdateWhitelistController(
    useCase,
    updateWhitelistDeleteUseCase
  );

  return controller;
}
