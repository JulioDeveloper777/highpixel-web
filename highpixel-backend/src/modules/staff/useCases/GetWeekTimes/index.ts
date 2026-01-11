import { Controller } from "@core/infra/Controller";
import { PrismaTimesRepository } from "@modules/staff/repositories/prisma/PrismaTimesRepository";
import { GetWeekTimes } from "@modules/staff/useCases/GetWeekTimes/GetWeekTimes";
import { GetWeekTimesController } from "@modules/staff/useCases/GetWeekTimes/GetWeekTimesController";

export function makeHighGetWeekTimes(): Controller {
  const repository = new PrismaTimesRepository();
  const useCase = new GetWeekTimes(repository);
  const controller = new GetWeekTimesController(useCase);

  return controller;
}
