import { Either, left, right } from '@core/logic/Either';
import { PermissionDenied } from '@infra/http/errors/PermissionDenied';
import { FeatureFlags } from '@modules/accounts/domain/features';
import { JWT } from '@modules/accounts/domain/jwt';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AccountDoesNotExist } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountDoesNotExist';
import { AccountDoesNotHavePermission } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountDoesNotHavePermission';
import { AccountInvalidPassword } from '@modules/staff/useCases/ControlAuthenticate/errors/AccountInvalidPassword';

type TokenResponse = {
  token: string;
};

type HighAuthenticateRequest = {
  buffer: string;
};

type HighAuthenticateResponse = Either<
  | AccountInvalidPassword
  | PermissionDenied
  | AccountDoesNotHavePermission
  | AccountInvalidPassword,
  TokenResponse
>;

export class HighAuthenticate {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    buffer,
  }: HighAuthenticateRequest): Promise<HighAuthenticateResponse> {
    const [, hash] = buffer.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    const account = await this.usersRepository.findOne(email);

    if (!account) {
      return left(new AccountDoesNotExist());
    }

    if (account.role !== 'ADMIN') {
      return left(new AccountDoesNotHavePermission());
    }

    const isPasswordValid = await account.password.comparePassword(password);

    if (isPasswordValid === false) {
      return left(new AccountInvalidPassword());
    }

    if (
      !FeatureFlags.can(account.features, 'create:session') &&
      FeatureFlags.can(account.features, 'read:activation_token')
    ) {
      return left(new PermissionDenied('create:session'));
    }

    const { token } = JWT.signUser(account);

    return right({
      token,
    });
  }
}
