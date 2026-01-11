import { Controller } from "@core/infra/Controller";
import { PrismaConnectionsRepository } from "@modules/accounts/repositories/implementations/PrismaConnectionsRepository";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaAppointmentsRepository } from "@modules/player/repositories/prisma/PrismaAppointmentsRepository";
import { ChangeAppointmentStatus } from "@modules/staff/useCases/ChangeAppointmentStatus/ChangeAppointmentStatus";
import { ChangeAppointmentStatusController } from "@modules/staff/useCases/ChangeAppointmentStatus/ChangeAppointmentStatusControlller";

export function makeChangeAppointmentStatusController(): Controller {
  const usersRepository = new PrismaUserRepository();
  const connectionsRepository = new PrismaConnectionsRepository();
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const useCase = new ChangeAppointmentStatus(
    appointmentsRepository,
    connectionsRepository,
    usersRepository
  );
  const controller = new ChangeAppointmentStatusController(useCase);

  return controller;
}