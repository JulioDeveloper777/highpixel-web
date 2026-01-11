import { Either, left, right } from "@core/logic/Either";
import { Password } from "@modules/accounts/domain/password";
import { ITokensRepository } from "@modules/accounts/repositories/ITokensRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import dayjs from "dayjs";
import { RecoveryAlreadyUsed } from "@modules/accounts/useCases/RecoveryUser/errors/RecoveryAlreadyUsed";
import { RecoveryExpired } from "@modules/accounts/useCases/RecoveryUser/errors/RecoveryExpired";
import { RecoveryNotFound } from "@modules/accounts/useCases/RecoveryUser/errors/RecoveryNotFound";
import { RecoveryTokenNotValid } from "@modules/accounts/useCases/RecoveryUser/errors/RecoveryTokenNotValid";
import { Token } from "@modules/accounts/domain/Token";

type RecoveryPasswordRequest = {
  id: string;
  password: string;
};

type RecoveryPasswordResponse = Either<
  | RecoveryAlreadyUsed
  | RecoveryExpired
  | RecoveryNotFound
  | RecoveryTokenNotValid,
  Token
>;

export class RecoveryPassword {
  constructor(
    private usersRepository: IUserRepository,
    private tokensRepository: ITokensRepository
  ) { }

  async execute({
    id,
    password,
  }: RecoveryPasswordRequest): Promise<RecoveryPasswordResponse> {
    const token = await this.tokensRepository.getById(id);

    if (!token) {
      return left(new RecoveryNotFound());
    }

    if (token.type !== 'recovery') {
      return left(new RecoveryTokenNotValid());
    }

    if (token.used) {
      return left(new RecoveryAlreadyUsed());
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new RecoveryExpired());
    }

    const account = await this.usersRepository.findOne(token.userId);
    const passwordOrError = Password.create(password);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    // Update and save new user password.
    account.setPassword = passwordOrError.value;

    // mark the request token to used
    token.MarkHasUsed = true;

    await this.tokensRepository.saveSingle(token);
    await this.usersRepository.save(account);

    return right(token);
  }
}