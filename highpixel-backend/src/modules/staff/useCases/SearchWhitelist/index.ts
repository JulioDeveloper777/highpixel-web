import { Controller } from "@core/infra/Controller";
import { PrismaWhitelistRepository } from "@modules/player/repositories/prisma/PrismaWhitelistRepository";
import { SearchWhitelist } from "@modules/staff/useCases/SearchWhitelist/SearchWhitelist";
import { SearchWhitelistController } from "@modules/staff/useCases/SearchWhitelist/SearchWhitelistController";

export function makeHighSearchWhitelistController(): Controller {
  const repository = new PrismaWhitelistRepository();
  const useCase = new SearchWhitelist(repository);
  const controller = new SearchWhitelistController(useCase);

  return controller;
}
