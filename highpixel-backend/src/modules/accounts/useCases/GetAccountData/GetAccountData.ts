import { Either, left, right } from '@core/logic/Either';
import { User } from '@modules/accounts/domain/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { GetAccountDataUserNotExists } from '@modules/accounts/useCases/GetAccountData/errors/GetAccountDataUserNotExists';

type GetAccountDataResponse = Either<GetAccountDataUserNotExists, User>;

export class GetAccountData {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ user }): Promise<GetAccountDataResponse> {
    const account = await this.usersRepository.findOne(user.id);

    if (!account) {
      return left(new GetAccountDataUserNotExists());
    }

    return right(account);
  }
}