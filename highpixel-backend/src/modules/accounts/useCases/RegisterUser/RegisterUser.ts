import { Either, left, right } from '@core/logic/Either';
import Queue from '@infra/libs/queue/bull';
import { Email } from '@modules/accounts/domain/email';
import { InvalidEmailError } from '@modules/accounts/domain/errors/InvalidEmailError';
import { InvalidNameError } from '@modules/accounts/domain/errors/InvalidNameError';
import { InvalidPasswordError } from '@modules/accounts/domain/errors/InvalidPasswordError';
import { Name } from '@modules/accounts/domain/name';
import { Password } from '@modules/accounts/domain/password';
import { Token } from '@modules/accounts/domain/Token';
import { User } from '@modules/accounts/domain/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AccountAleardyExists } from '@modules/accounts/useCases/RegisterUser/errors/AccountAleardyExists';

type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserResponse = Either<
  | AccountAleardyExists
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError,
  User
>;

export class RegisterUser {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

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
      features: ['read:activation_token'],
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

    // Here is called the email sending service,
    // where the email will be sent to the user to confirm.
    const token = Token.create({
      type: 'activation',
      user_id: account.id,
      used: false,
    });

    account.addToken(token);

    // Sending the Activation-mail to user.
    await Queue.add('RegistrationMail', {
      name: account.username.value,
      email: account.email.value,
      activation_token: token.id,
    });

    await this.usersRepository.create(account);
    // const tokenObject = await this.usersRepository.createActivationToken(
    //   account.id
    // )

    return right(account);
  }
}