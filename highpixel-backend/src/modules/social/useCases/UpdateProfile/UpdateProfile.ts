import { Either, left, right } from '@core/logic/Either';
import { IProfilesRepository } from '@modules/social/repositories/IProfileRepository';
import { ProfileSlugAlreadyInUse } from '@modules/social/useCases/UpdateProfile/errors/ProfileSlugAlreadyInUse';
import { ProfileUpdateActionRequired } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateActionRequired';
import { ProfileUpdateDataMalformated } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateDataMalformated';
import { ProfileUpdateUserNotFound } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateUserNotFound';
import { UserIsNotPremium } from '@modules/social/useCases/UpdateProfile/errors/UserIsNotPremium';

type UpdateProfileRequest = {
  user: { id: string };
  bio?: string;
  nickname?: string;
  status?: string;
  region_city?: string;
  region_uf?: string;
  region_country?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
  slug?: string;
  action: string;
};

type UpdaProfileResponse = Either<
  | ProfileUpdateUserNotFound
  | ProfileSlugAlreadyInUse
  | ProfileUpdateDataMalformated
  | ProfileUpdateActionRequired,
  boolean
>;

export class UpdateProfile {
  constructor(private profilesRepository: IProfilesRepository) { }

  async execute({
    action,
    user,
    bio,
    nickname,
    status,
    region_city,
    region_uf,
    region_country,
    slug,
  }: UpdateProfileRequest): Promise<UpdaProfileResponse> {
    if (!action) {
      return left(new ProfileUpdateActionRequired());
    }

    const profile = await this.profilesRepository.findOne(user.id);

    if (!profile) {
      return left(new ProfileUpdateUserNotFound());
    }

    if (action === 'update:bio') {
      if (profile.user.isPremium !== false) {
        profile.setBio = bio ? bio : null;
      }
    }

    if (action === 'update:social') {
      profile.setNickname = nickname;
      profile.setRegion_city = region_city ? region_city : null;
      profile.setRegion_uf = region_uf ? region_uf : null;
      profile.setRegion_country = region_country ? region_country : null;
      profile.setStatus = status ? status : null;

      if (slug !== profile.slug) {
        const exists = await this.profilesRepository.exists(slug);

        if (exists) {
          return left(new ProfileSlugAlreadyInUse());
        }

        if (profile.user.isPremium !== false) {
          profile.setSlug = slug;
        } else {
          return left(new UserIsNotPremium());
        }
      }
    }

    await this.profilesRepository.save(profile);
    return right(true);
  }
}
