import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  fail,
  forbidden,
  HttpResponse,
  notFound,
  ok
} from '@core/infra/HttpResponse';
import { UpdateProfile } from '@modules/social/useCases/UpdateProfile/UpdateProfile';
import { ProfileSlugAlreadyInUse } from '@modules/social/useCases/UpdateProfile/errors/ProfileSlugAlreadyInUse';
import { ProfileUpdateActionRequired } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateActionRequired';
import { ProfileUpdateDataMalformated } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateDataMalformated';
import { ProfileUpdateUserNotFound } from '@modules/social/useCases/UpdateProfile/errors/ProfileUpdateUserNotFound';
import { UserIsNotPremium } from '@modules/social/useCases/UpdateProfile/errors/UserIsNotPremium';

type UpdateProfileRequest = {
  user: { id: string };
  description: string;
  nickname: string;
  status: string;
  region_city: string;
  region_uf: string;
  region_country: string;
  youtube: string;
  twitch: string;
  instagram: string;
  slug: string;
  action: string;
};

export class UpdateProfileController implements Controller {
  constructor(private updateProfile: UpdateProfile) { }

  async handle(data: UpdateProfileRequest): Promise<HttpResponse> {
    const result = await this.updateProfile.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfileUpdateDataMalformated:
          return fail(error);
        case ProfileSlugAlreadyInUse:
          return conflict(error);
        case ProfileUpdateActionRequired:
          return clientError(error);
        case ProfileUpdateUserNotFound:
          return notFound(error);
        case UserIsNotPremium:
          return forbidden(error);
      }
    } else {
      return ok();
    }
  }
}
