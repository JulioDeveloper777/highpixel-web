import { Either, left, right } from '@core/logic/Either';
import { IWhitelistRepository } from '@modules/player/repositories/IWhitelistRepository';
import { GetWhitelistNotFound } from '@modules/staff/useCases/GetWhitelistDetails/errors/GetWhitelistDetailsNotFound';
import { Whitelist } from '@modules/player/domain/Whitelist';

type GetWhitelistDetailsRequest = {
  id: string;
};

type GetWhitelistDetailsResponse = Either<GetWhitelistNotFound, Whitelist>;

export class GetWhitelistDetails {
  constructor(private whitelistRepository: IWhitelistRepository) { }

  async execute({
    id,
  }: GetWhitelistDetailsRequest): Promise<GetWhitelistDetailsResponse> {
    const exists = await this.whitelistRepository.exists(id);

    if (!exists) {
      return left(new GetWhitelistNotFound());
    }

    const whitelist = await this.whitelistRepository.findOneByID(id);
    return right(whitelist);
  }
}
