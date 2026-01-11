import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';
import { Badges, Medals, User } from '@prisma/client';
import { Follow } from '@modules/social/domain/profile/Follow';
import { Follows } from '@modules/social/domain/profile/Follows';
import { Visitor } from '@modules/social/domain/profile/Visitor';
import { Visitors } from '@modules/social/domain/profile/Visitors';
import { InvalidEmailError } from '@modules/social/domain/profile/errors/InvalidEmailError';
import { InvalidNameError } from '@modules/social/domain/profile/errors/InvalidNameError';

interface IProfilePorps {
  nickname: string;
  User?: User;
  avatar: string;
  banner: string;
  badges: Badges[];
  medals: Medals[];
  region_city: string;
  region_uf: string;
  visitors?: Visitors;
  follows?: Follows;
  followers?: Follows | object[];
  region_country: string;
  status: string;
  bio: string;
  userid: string;
  whitelist: string;
  following: Follows | object[];
  timeout: number;
  slug: string;
}

export class Profile extends Entity<IProfilePorps> {
  private constructor(props: IProfilePorps, id?: string) {
    super(props, id);
  }

  get User() {
    return this.props.User;
  }

  get nickname() {
    return this.props.nickname;
  }

  get follows() {
    return this.props.follows;
  }

  get following() {
    return this.props.following;
  }

  get user() {
    return this.props.User;
  }

  get avatar() {
    return this.props.avatar;
  }

  get userid() {
    return this.props.userid;
  }

  get followers() {
    return this.props.followers;
  }

  get banner() {
    return this.props.banner;
  }

  get badges() {
    return this.props.badges;
  }

  get medals() {
    return this.props.medals;
  }
  
  get bio() {
    return this.props.bio;
  }

  get region_city() {
    return this.props.region_city;
  }

  get region_uf() {
    return this.props.region_uf;
  }

  get region_country() {
    return this.props.region_country;
  }

  get status() {
    return this.props.status;
  }

  get slug() {
    return this.props.slug;
  }

  get visitors() {
    return this.props.visitors;
  }

  get whitelist() {
    return this.props.whitelist;
  }

  set setNickname(nickname: string) {
    this.props.nickname = nickname;
  }

  set setStatus(status: string) {
    this.props.status = status;
  }

  set setRegion_city(region_city: string) {
    this.props.region_city = region_city;
  }

  set setRegion_uf(region_uf: string) {
    this.props.region_uf = region_uf;
  }

  set setRegion_country(region_country: string) {
    this.props.region_country = region_country;
  }

  set setSlug(slug: string) {
    this.props.slug = slug;
  }
  
  set setBio(bio: string) {
    this.props.bio = bio;
  }

  set setAvatarURL(url: string) {
    this.props.avatar = url;
  }

  set setBannerURL(url: string) {
    this.props.banner = url;
  }

  public subscribeToVisitor(visitor: Visitor) {
    this.visitors.add(visitor);
  }

  public subscribeFollow(follow: Follow) {
    this.follows.add(follow);
  }

  public unsubscribeFollow(follow: Follow) {
    this.follows.remove(follow);
  }

  static create(
    props: IProfilePorps,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError, Profile> {
    const profile = new Profile(
      {
        ...props,
        visitors: props.visitors ?? Visitors.create([]),
        follows: props.follows ?? Follows.create([]),
      },
      id
    );

    return right(profile);
  }
}
