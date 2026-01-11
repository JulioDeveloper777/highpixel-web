import { PermissionDenied } from "@infra/http/errors/PermissionDenied";
import { FeatureFlags } from "@modules/accounts/domain/features";
import { Either, left, right } from "@core/logic/Either";
import { JWT } from "@modules/accounts/domain/jwt";
import { Token } from "@modules/accounts/domain/Token";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import Queue from '@infra/libs/queue/bull';
import { AccountDoesNotExist } from "@modules/accounts/useCases/AuthenticateUser/errors/AccountDoesNotExist";
import { AccountInvalidPassword } from "@modules/accounts/useCases/AuthenticateUser/errors/AccountInvalidPassword";

type TokenResponse = {
  token: string;
};

type AuthenticateUserRequest = {
  buffer: string;
};

type AuthenticateUserResponse = Either<
  AccountInvalidPassword | PermissionDenied | AccountInvalidPassword,
  TokenResponse
>;

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    buffer,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const [, hash] = buffer.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    const account = await this.usersRepository.findOne(email);

    if (!account) {
      return left(new AccountDoesNotExist());
    }

    const isPasswordValid = await account.password.comparePassword(password);

    if (isPasswordValid === false) {
      return left(new AccountInvalidPassword());
    }

    if (
      !FeatureFlags.can(account.features, 'create:session') &&
      FeatureFlags.can(account.features, 'read:activation_token')
    ) {
      // Here is called the email sending service,
      // where the email will be sent to the user to confirm.

      const tokenObject = Token.create({
        type: 'activation',
        user_id: account.id,
        used: false,
      });

      await this.usersRepository.save(account);

      // Sending the Activation-mail to user.
      await Queue.add('RegistrationMail', {
        name: account.username.value,
        email: account.email.value,
        activation_token: tokenObject.id,
      });

      return left(new PermissionDenied('create:session'));
    }

    const { token } = JWT.signUser(account);

    return right({
      token,
    });
  }
}