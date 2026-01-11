import { Controller } from '@core/infra/Controller';
import { PrismaConnectionsRepository } from '@modules/accounts/repositories/implementations/PrismaConnectionsRepository';
import { PrismaUserRepository } from '@modules/accounts/repositories/implementations/PrismaUsersRepository';
import { DiscordConnection } from '@modules/accounts/useCases/Connections/DiscordConnection/DiscordConnection';
import { DiscordConnectionController } from '@modules/accounts/useCases/Connections/DiscordConnection/DiscordConnectionController';

export function makeDiscordConnectionController(): Controller {
  const connectionsRepository = new PrismaConnectionsRepository();
  const repository = new PrismaUserRepository(null, connectionsRepository);
  const useCase = new DiscordConnection(repository, connectionsRepository);
  const controller = new DiscordConnectionController(useCase);

  return controller;
}