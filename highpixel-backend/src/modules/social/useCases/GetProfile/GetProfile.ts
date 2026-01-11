import { Either, left, right } from "@core/logic/Either";
import { IProfilesRepository } from "@modules/social/repositories/IProfileRepository";
import { ProfileDoesNotExist } from "@modules/social/useCases/GetProfile/errors/ProfileDoesNotExist";

type GetProfileResponse = object;
type GetProfileDetails = Either<ProfileDoesNotExist, GetProfileResponse>;

export class GetProfile {
  constructor(private profilesRepository: IProfilesRepository) { }

  async execute({ ident, user }): Promise<GetProfileDetails> {
    const exists = await this.profilesRepository.exists(ident);

    if (!exists) {
      return left(new ProfileDoesNotExist());
    }

    const profile = await this.profilesRepository.findOne(ident);
    const requestUser = await this.profilesRepository.findOne(profile.userid);
    const userfollows = requestUser.following as object[];
    const isFollowing = userfollows.find((follow: any) => follow.followers_id === profile.userid);

    const {
      slug,
      avatar,
      banner,
      User,
      badges,
      following,
      
      followers,
    } = profile;

    return right({
      ...User,
      slug,
      avatar,
      banner,
      badges,
      following,
      followers,
      isFollowing: Boolean(isFollowing) ? Boolean(isFollowing) : false,
    });
  }
}