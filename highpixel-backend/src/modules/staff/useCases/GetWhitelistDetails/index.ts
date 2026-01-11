import { Controller } from "@core/infra/Controller";
import { PrismaWhitelistRepository } from "@modules/player/repositories/prisma/PrismaWhitelistRepository";
import { GetWhitelistDetails } from "@modules/staff/useCases/GetWhitelistDetails/GetWhitelistDetails";
import { GetWhitelistController } from "@modules/staff/useCases/GetWhitelistDetails/GetWhitelistDetailsController";

export function makeHighGetWhitelistDetailsController(): Controller {
  const repository = new PrismaWhitelistRepository();
  const useCase = new GetWhitelistDetails(repository);
  const controller = new GetWhitelistController(useCase);

  return controller;
}
