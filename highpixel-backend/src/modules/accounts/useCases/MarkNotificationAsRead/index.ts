import { Controller } from "@core/infra/Controller";
import { PrismaNotificationsRepository } from "@modules/accounts/repositories/implementations/PrismaNotificationsRepository";
import { MarkNotificationAsRead } from "@modules/accounts/useCases/MarkNotificationAsRead/MarkNotificationAsRead";
import { MarkNotificationAsReadController } from "@modules/accounts/useCases/MarkNotificationAsRead/MarkNotificationAsReadController";

export function makeNotificationController(): Controller {
  const repository = new PrismaNotificationsRepository();
  const useCase = new MarkNotificationAsRead(repository);
  const controller = new MarkNotificationAsReadController(useCase);

  return controller;
}