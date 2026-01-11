import { Controller } from "@core/infra/Controller";
import { PrismaAppointmentsRepository } from "@modules/player/repositories/prisma/PrismaAppointmentsRepository";
import { PrismaStaffRepository } from "@modules/staff/repositories/prisma/PrismaStaffRepository";
import { GetStaffAppointment } from "@modules/staff/useCases/GetStaffAppointments/GetStaffAppointments";
import { GetStaffAppointmentsController } from "@modules/staff/useCases/GetStaffAppointments/GetStaffAppointmentsController";

export function makeGetStaffAppointmentsController(): Controller {
  const staffRepository = new PrismaStaffRepository();
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const useCase = new GetStaffAppointment(
    staffRepository,
    appointmentsRepository
  );
  const controller = new GetStaffAppointmentsController(useCase);

  return controller;
}