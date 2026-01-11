import { Controller } from "@core/infra/Controller";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaAnswersRepository } from "@modules/player/repositories/prisma/PrismaAnswerRepository";
import { PrismaWhitelistRepository } from "@modules/player/repositories/prisma/PrismaWhitelistRepository";
import { CreateWhitelist } from "@modules/player/useCases/CreateWhitelist/CreateWhitelist";
import { CreateWhitelistController } from "@modules/player/useCases/CreateWhitelist/CreateWhitelistController";

export function makeCreateWhitelistController(): Controller {
  const repository1nd = new PrismaAnswersRepository();
  const usersRepository = new PrismaUserRepository();
  const repository = new PrismaWhitelistRepository(repository1nd);
  const useCase = new CreateWhitelist(
    repository,
    repository1nd,
    usersRepository
  );
  const controller = new CreateWhitelistController(useCase);

  return controller;
}