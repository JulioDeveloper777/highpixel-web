import { Either, left, right } from '@core/logic/Either';
import dayjs from 'dayjs';
import { Notification } from '@modules/accounts/domain/Notification';
import { Token } from '@modules/accounts/domain/Token';
import { ITokensRepository } from '@modules/accounts/repositories/ITokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ServiceTokenAlreadyUsed } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenAlreadyUsed';
import { ServiceTokenExpired } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenExpired';
import { ServiceTokenNotFound } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenNotFound';
import { ServiceTokenNotValid } from '@modules/accounts/useCases/ActivateUser/errors/ServiceTokenNotValid';

type ActivateUserRequest = {
  id: string;
};

type ActivateUserResponse = Either<
  | ServiceTokenAlreadyUsed
  | ServiceTokenExpired
  | ServiceTokenNotValid
  | ServiceTokenNotFound,
  Token
>;

export class ActivateUser {
  constructor(
    private usersRepository: IUserRepository,
    private tokenRepository: ITokensRepository
  ) { }

  async execute({ id }: ActivateUserRequest): Promise<ActivateUserResponse> {
    const token = await this.tokenRepository.getById(id);

    if (!token) {
      return left(new ServiceTokenNotFound());
    }

    if (token.type !== 'activation') {
      return left(new ServiceTokenNotValid());
    }

    if (token.used) {
      return left(new ServiceTokenAlreadyUsed());
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new ServiceTokenExpired());
    }

    // activate the user by-features
    const account = await this.usersRepository.findOne(token.userId);

    // TODO: in the future, understand how to run
    // this inside a transaction, or at least
    // reduce how many queries are run.
    account.removeFeatures(['read:activation_token']);
    account.addFeatures([
      'create:user',
      'read:user',
      'read:user:self',
      'read:user:list',
      'create:whitelist',
      'create:appointment',
      'update:profile:self',
      'profile:subscribe',
      'read:subscribers:list',
      'profile:unsubscribe',
      'create:session',
      'create:post',
      'read:post',
      'read:comments',
      'read:post:list',
      'create:comment',
      'update:post',
      'delete:post',
    ]);

    const notify = Notification.create({
      read: false,
      small:
        'Hey ' +
        account.username.value +
        ', é ótimo ter você por aqui! Lembre-se que esta é uma versão Beta da plataforma. Se você estiver com alguma dúvida, ou encontrar algum erro, não hesite em entrar em contato com nosso time de suporte no Discord!',
      userid: account.id,
    });

    account.addNotification(notify);

    // mark the request token to used
    // await this.usersRepository.markActivationTokenHasUsed(token)

    token.MarkHasUsed = true;

    await this.usersRepository.save(account);
    await this.tokenRepository.saveSingle(token);

    return right(token);
  }
}