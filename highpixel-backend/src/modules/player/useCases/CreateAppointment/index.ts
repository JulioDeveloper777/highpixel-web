import { Controller } from "@core/infra/Controller";
import { PrismaConnectionsRepository } from "@modules/accounts/repositories/implementations/PrismaConnectionsRepository";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaAppointmentsRepository } from "@modules/player/repositories/prisma/PrismaAppointmentsRepository";
import { PrismaStaffRepository } from "@modules/staff/repositories/prisma/PrismaStaffRepository";
import { PrismaTimesRepository } from "@modules/staff/repositories/prisma/PrismaTimesRepository";
import { CreateAppointment } from "@modules/player/useCases/CreateAppointment/CreateAppointment";
import { CreateAppointmentConnError } from "@modules/player/useCases/CreateAppointment/CreateAppointmentController";

export function makeCreateAppointmentController(): Controller {
  const connectionsRepository = new PrismaConnectionsRepository();
  const usersRepository = new PrismaUserRepository();
  const timesRepository = new PrismaTimesRepository();
  const staffRepository = new PrismaStaffRepository();
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const useCase = new CreateAppointment(
    usersRepository,
    timesRepository,
    staffRepository,
    connectionsRepository,
    appointmentsRepository
  );
  const controller = new CreateAppointmentConnError(useCase);

  return controller;
}