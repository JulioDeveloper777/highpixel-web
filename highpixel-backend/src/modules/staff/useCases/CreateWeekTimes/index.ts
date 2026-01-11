import { Controller } from "@core/infra/Controller";
import { PrismaStaffRepository } from "@modules/staff/repositories/prisma/PrismaStaffRepository";
import { PrismaTimesRepository } from "@modules/staff/repositories/prisma/PrismaTimesRepository";
import { CreateWeekTimes } from "@modules/staff/useCases/CreateWeekTimes/CreateWeekTimes";
import { CreateWeekTimesController } from "@modules/staff/useCases/CreateWeekTimes/CreateWeekTimesController";

export function makeHighCreateWeekTimesController(): Controller {
  const timesRepository = new PrismaTimesRepository();
  const staffRepository = new PrismaStaffRepository(timesRepository);
  const useCase = new CreateWeekTimes(staffRepository);
  const controller = new CreateWeekTimesController(useCase);

  return controller;
}