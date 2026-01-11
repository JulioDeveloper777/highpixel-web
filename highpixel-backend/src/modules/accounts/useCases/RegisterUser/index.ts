import { Controller } from "@core/infra/Controller";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { RegisterUser } from "@modules/accounts/useCases/RegisterUser/RegisterUser";
import { RegisterUserController } from "@modules/accounts/useCases/RegisterUser/RegisterUserController";

export function makeRegisterController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new RegisterUser(repository);
  const controller = new RegisterUserController(useCase);

  return controller;
}