import { Controller } from "@core/infra/Controller";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { AuthenticateUser } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUser";
import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

export function makeAuthenticateController(): Controller {
  const userRepository = new PrismaUserRepository();
  const authenticateUser = new AuthenticateUser(userRepository);
  const controller = new AuthenticateUserController(authenticateUser);

  return controller;
}