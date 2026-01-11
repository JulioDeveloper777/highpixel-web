import {
  Badges,
  Follower,
  Medals,
  Profile as ProfileRaw,
  User,
} from '@prisma/client';
import { Profile } from '@modules/social/domain/profile/Profile';

export type PersistenceProfileRaw = ProfileRaw & {
  user?: User;
  following?: Follower[];
  followers?: Follower[];
  badges?: Badges[];
  medals?: Medals[];
};

type topPeristenceRaw = {
  avatar: string;
  banner: string;
  region_city: string;
  region_uf: string;
  region_country: string;
  bio: string;
  status: string;
  nickname: string;
  slug: string;
};

export class ProfileMapper {
  static toDomain(raw: PersistenceProfileRaw): Profile {
    const profileOrError = Profile.create(
      {
        User: raw.user,
        avatar: raw.avatar,
        banner: raw.banner,
        badges: raw.badges,
        medals: raw.medals,
        followers: raw.followers,
        region_city: raw.region_city,
        region_uf: raw.region_uf,
        region_country: raw.region_country,
        status: raw.status,
        following: raw.following,
        nickname: raw.nickname,
        whitelist: raw.user.status,
        slug: raw.slug,
        bio: raw.bio,
        timeout: raw.user.timeout,
        userid: '', // remove
      },
      raw.id
    );

    if (profileOrError.isRight()) {
      return profileOrError.value;
    }

    return null;
  }

  static toPersistence(raw: topPeristenceRaw) {
    return {
      avatar: raw.avatar,
      banner: raw.banner,
      region_city: raw.region_city,
      region_uf: raw.region_uf,
      region_country: raw.region_country,
      status: raw.status,
      nickname: raw.nickname,
      bio: raw.bio,
      slug: raw.slug,
    };
  }
}
