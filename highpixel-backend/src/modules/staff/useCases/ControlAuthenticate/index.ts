import { Controller } from "@core/infra/Controller";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { HighAuthenticate } from "@modules/staff/useCases/ControlAuthenticate/HighAuthenticate";
import { AuthenticateUserController } from "@modules/staff/useCases/ControlAuthenticate/HighAuthenticateController";

export function makeHighAuthenticationController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new HighAuthenticate(repository);
  const controller = new AuthenticateUserController(useCase);

  return controller;
}