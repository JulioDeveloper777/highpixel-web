import { Controller } from "@core/infra/Controller";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";
import { RecoveryPassword } from "@modules/accounts/useCases/RecoveryUser/RecoveryUser";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { RecoveryPasswordController } from "@modules/accounts/useCases/RecoveryUser/RecoveryUserController";

export function makeRecoveryPasswordController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new RecoveryPassword(repository, tokensRepository);
  const controller = new RecoveryPasswordController(useCase);

  return controller;
}