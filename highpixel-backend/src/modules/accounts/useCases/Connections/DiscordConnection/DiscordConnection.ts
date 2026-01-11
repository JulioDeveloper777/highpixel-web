import { Either, left, right } from '@core/logic/Either';
import * as Discord from '@infra/services/discord';
import { Connection } from '@modules/accounts/domain/Connection';
import { IConnectionsRepository } from '@modules/accounts/repositories/IConnectionsRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { DiscordConnectionAccountNotFound } from '@modules/accounts/useCases/Connections/DiscordConnection/errors/DiscordConnectionAccountNotFound';
import { DiscordConnectionAlreadySync } from '@modules/accounts/useCases/Connections/DiscordConnection/errors/DiscordConnectionAlreadySync';
import { DiscordConnectionNotAvailable } from '@modules/accounts/useCases/Connections/DiscordConnection/errors/DiscordConnectionNotAvailable';
import { DiscordConnectionRequestError } from '@modules/accounts/useCases/Connections/DiscordConnection/errors/DiscordConnectionRequestError';

type DiscordConnectionRequest = {
  user: { id: string };
  code: string;
};

type DiscordConnectionRequestResponse = Either<
  | DiscordConnectionRequestError
  | DiscordConnectionAccountNotFound
  | DiscordConnectionNotAvailable
  | DiscordConnectionAlreadySync,
  boolean
>;

export class DiscordConnection {
  constructor(
    private usersRepository: IUserRepository,
    private connectionsRepository: IConnectionsRepository
  ) { }

  async execute({
    code,
    user,
  }: DiscordConnectionRequest): Promise<DiscordConnectionRequestResponse> {
    const account = await this.usersRepository.findOne(user.id);

    if (!account) {
      return left(new DiscordConnectionAccountNotFound());
    }

    const exists = await this.connectionsRepository.getByUserAndPlataform(
      account.id,
      'Discord'
    );

    if (exists) {
      return left(new DiscordConnectionAlreadySync());
    }

    const { access_token, refresh_token } = await Discord.OAUTH2.getTokenByCode(
      code
    );

    if (!access_token) {
      return left(new DiscordConnectionRequestError());
    }

    // const member = await Discord.OAUTH2.me(access_token)

    // try {
    //   const guildMember = (await Discord.REST.getMemberGuild(
    //     process.env.BOT_DISCORD_GUILD_HIGHPIXEL,
    //     member.id
    //   )) as { roles: string[] }

    //   const findMemberRoles = guildMember.roles.some(id =>
    //     constants.accepted.includes(id)
    //   )

    //   if (!findMemberRoles) {
    //     return left(new DiscordConnectionNotAvailable())
    //   }
    // } catch (error) {
    //   return left(new DiscordConnectionNotAvailable())
    // }

    const connection = Connection.create({
      plataform: 'Discord',
      fallback: refresh_token,
      user_id: user.id,
    });

    account.addConnection(connection);
    await this.usersRepository.save(account);

    return right(true);
  }
}