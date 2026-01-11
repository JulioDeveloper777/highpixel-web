import { Controller } from "@core/infra/Controller";
import { PrismaTokensRepository } from "@modules/accounts/repositories/implementations/PrismaTokensRepository";
import { SendRecoveryEmail } from "@modules/accounts/useCases/SendRecoveryEmail/SendRecoveryEmail";
import { SendRecoveryEmailController } from "@modules/accounts/useCases/SendRecoveryEmail/SendRecoveryEmailController";
import { PrismaUserRepository } from "@modules/accounts/repositories/implementations/PrismaUsersRepository";
import { MailProvider } from "@infra/providers/mail/implementations/MailProvider";

export function makeSendRecoveryEmailController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const mailProvider = new MailProvider();
  const userRepository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new SendRecoveryEmail(userRepository);
  const controller = new SendRecoveryEmailController(useCase);

  return controller;
}