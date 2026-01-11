import { Controller } from "@core/infra/Controller";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { PrismaAppointmentsRepository } from "@modules/player/repositories/prisma/PrismaAppointmentsRepository";
import { PrismaStaffRepository } from "@modules/staff/repositories/prisma/PrismaStaffRepository";
import { ChangeStaffInterview } from "@modules/staff/useCases/ChangeStaffInterview/ChangeStaffInterview";
import { ChangeStaffInterviewController } from "@modules/staff/useCases/ChangeStaffInterview/ChangeStaffInterviewController";

export function makeChangeStaffInterviewController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const usersRepository = new PrismaUserRepository(
    null,
    null,
    tokensRepository
  );
  const appointmentRepository = new PrismaAppointmentsRepository();
  const staffsRepository = new PrismaStaffRepository();
  const useCase = new ChangeStaffInterview(
    usersRepository,
    appointmentRepository,
    staffsRepository,
    tokensRepository
  );
  const controller = new ChangeStaffInterviewController(useCase);

  return controller;
}