import { Either, left, right } from '@core/logic/Either';
import { IWhitelistRepository } from '@modules/player/repositories/IWhitelistRepository';
import { WhitelistDataMalformated } from '@modules/staff/useCases/Whitelist/error/WhitelistDataMalformated';
import { WhitelistDoesNotExist } from '@modules/staff/useCases/Whitelist/error/WhitelistDoesNotExist';

type UpdateWhitelistDeleteRequest = {
  id: string;
};

type UpdateWhitelistDeleteResponse = Either<
  WhitelistDoesNotExist | WhitelistDataMalformated,
  boolean
>;

export class UpdateWhitelistDelete {
  constructor(private whitelistsRepository: IWhitelistRepository) { }

  async execute({
    id,
  }: UpdateWhitelistDeleteRequest): Promise<UpdateWhitelistDeleteResponse> {
    if (!id) {
      return left(new WhitelistDataMalformated());
    }

    const exists = await this.whitelistsRepository.exists(id);

    if (!exists) {
      return left(new WhitelistDoesNotExist());
    }

    await this.whitelistsRepository.deleteByID(id);

    return right(true);
  }
}
