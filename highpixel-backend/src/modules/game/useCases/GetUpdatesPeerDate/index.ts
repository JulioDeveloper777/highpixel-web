import { Controller } from "@core/infra/Controller";
import { PrismaUpdatesRepository } from "@modules/game/repositories/prisma/PrismaUpdatesRepository";
import { GetUpdatesPerDate } from "@modules/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDate";
import { GetUpdatesPerDateController } from "@modules/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDateController";

export function makeGetUpdatesPerDate(): Controller {
  const repository = new PrismaUpdatesRepository();
  const useCase = new GetUpdatesPerDate(repository);
  const controller = new GetUpdatesPerDateController(useCase);

  return controller;
}