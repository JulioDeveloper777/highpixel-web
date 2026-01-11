import { Controller } from "@core/infra/Controller";
import { GetAccountData } from "@modules/accounts/useCases/GetAccountData/GetAccountData";
import { GetAccountDataController } from "@modules/accounts/useCases/GetAccountData/GetAccountDataController";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";

export function makeGetAccountDataController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new GetAccountData(repository);
  const controller = new GetAccountDataController(useCase);

  return controller;
}