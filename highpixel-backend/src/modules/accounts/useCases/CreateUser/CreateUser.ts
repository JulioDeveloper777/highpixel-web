import { Either, left, right } from '@core/logic/Either';
import { Email } from '@modules/accounts/domain/email';
import { InvalidEmailError } from '@modules/accounts/domain/errors/InvalidEmailError';
import { InvalidNameError } from '@modules/accounts/domain/errors/InvalidNameError';
import { InvalidPasswordError } from '@modules/accounts/domain/errors/InvalidPasswordError';
import { availableFeatures } from '@modules/accounts/domain/features';
import { Name } from '@modules/accounts/domain/name';
import { Password } from '@modules/accounts/domain/password';
import { User } from '@modules/accounts/domain/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { Roles } from '@prisma/client';
import { AccountAleardyExists } from '@modules/accounts/useCases/RegisterUser/errors/AccountAleardyExists';

type CreateUserResponse = Either<
  | AccountAleardyExists
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError,
  User
>;

export class CreateUser {
  constructor(private usersRepository: IUserRepository) { }

  async execute(): Promise<CreateUserResponse> {
    const nameOrError = Name.create("admin");
    const emailOrError = Email.create("admin@gmail.com");
    const passwordOrError = Password.create("highpixel2026");

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const accountOrErr = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      features: Array.from(availableFeatures),
      role: Roles.ADMIN
    });

    if (accountOrErr.isLeft()) {
      return left(accountOrErr.value);
    }

    const account = accountOrErr.value;

    const emailAleardyExists = await this.usersRepository.exists(
      account.email.value
    );

    const usernameAleardyExists = await this.usersRepository.exists(
      account.username.value
    );

    if (emailAleardyExists || usernameAleardyExists) {
      return left(new AccountAleardyExists());
    }

    await this.usersRepository.create(account);
    // const tokenObject = await this.usersRepository.createActivationToken(
    //   account.id
    // )

    return right(account);
  }
}