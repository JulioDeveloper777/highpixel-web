import { Email } from "@modules/accounts/domain/email";
import { JWT } from "@modules/accounts/domain/jwt";
import { Name } from "@modules/accounts/domain/name";
import { Password } from "@modules/accounts/domain/password";
import { User } from "@modules/accounts/domain/User";
import { Profile } from "@modules/social/domain/profile/Profile";


type UserOverrides = {
  username?: string;
  email?: string;
  password?: string;
  features?: string[];
  timeout?: number;
  status?: string;
  Profile?: Profile;
};

export function createUser(overrides?: UserOverrides) {
  const username = Name.create(overrides?.username ?? 'JohnDoe').value as Name;
  const email = Email.create(overrides?.email ?? 'john@doe.com').value as Email;
  const password = Password.create(overrides?.password ?? '123456')
    .value as Password;

  const user = User.create({
    username,
    email,
    password,
    timeout: overrides?.timeout,
    status: overrides?.status,
    features: overrides?.features,
  });

  return user.value as User;
}

export function createAnonymous(overrides?: UserOverrides) {
  const username = Name.create('JohnDoe').value as Name;
  const email = Email.create(overrides?.email ?? 'john@doe.com').value as Email;
  const password = Password.create(overrides?.password ?? '123456')
    .value as Password;

  const user = User.create({
    username,
    email,
    password,
    features: overrides?.features,
  });

  return user;
}

export function createAndAuthenticateUser() {
  const username = Name.create('John Doe').value as Name;
  const email = Email.create('johndoe@example.com').value as Email;
  const password = Password.create('johndoe123').value as Password;

  const user = User.create({
    username,
    email,
    password,
  }).value as User;

  const jwt = JWT.sign('1d', user);

  return {
    user,
    jwt,
  };
}

export function createdUserWithProfile() {
  const profileOrErr = Profile.create({
    User: {
      email: 'jhon@doe',
      createdAt: new Date(),
      auth_system: 'NORMAL',
      features: [],
      id: '12345',
      isPremium: false,
      isEarlySupporter: false,
      isVerified: false,
      password: '1234567',
      status: 'TRIAGEM',
      timeout: 0,
      role: 'USER',
      username: 'jhondoe',
    },
    avatar: 'google.com',
    banner: 'google.com',
    badges: [],
    medals: [],
    bio: 'Ola',
    nickname: 'jhondoe',
    region_city: 'Santa rosa',
    region_country: 'Brazil',
    region_uf: 'RS',
    status: 'Olá Mundo!',
    slug: 'jhondoe',
    following: undefined,
    whitelist: '',
    timeout: 0,
    userid: '',
  }).value as Profile;

  return { profileOrErr };
}