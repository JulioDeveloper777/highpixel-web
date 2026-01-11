import {
  Appointments,
  Notification as PersistenceNotification,
  User as PersistenceUser,
  Connection as PersistencecConnection,
  Profile,
  Staff,
} from '@prisma/client';
import { Connection } from '@modules/accounts/domain/Connection';
import { Connections } from '@modules/accounts/domain/Connections';
import { Notifications } from "@modules/accounts/domain/Notifications";
import { User } from "@modules/accounts/domain/User";
import { Email } from "@modules/accounts/domain/email";
import { Name } from "@modules/accounts/domain/name";
import { Password } from "@modules/accounts/domain/password";
import { NotificationMapper } from "@modules/accounts/mappers/NotificationMapper";

type PersistenteUserRaw = PersistenceUser & {
  Connections?: PersistencecConnection[];
  notifications?: PersistenceNotification[];
  Profile: Profile;
  appointment?: Appointments;
  Staff: Staff;
}

export class UserMapper {
  static toDomain(raw: PersistenteUserRaw): User {
    const nameOrError = Name.create(raw.username);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password, true);

    const notificationsErr = raw.notifications
      ? Notifications.create(
        raw.notifications.map(notifictation =>
          NotificationMapper.toDomain(notifictation)
        )
      )
      : Notifications.create([]);

    const connectionsOrErr = raw.Connections
      ? Connections.create(
        raw.Connections.map(connection => Connection.create(connection))
      )
      : Connections.create([]);

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.');
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid.');
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.');
    }

    const userOrError = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      role: raw.role,
      features: raw.features,
      Profile: raw.Profile,
      auth_system: raw.auth_system,
      isPremium: raw.isPremium,
      isEarlySupporter: raw.isEarlySupporter,
      isVerified: raw.isVerified,
      notifications: notificationsErr,
      createdAt: raw.createdAt,
      staff: raw.Staff,
      appointment: raw.appointment,
      timeout: raw.timeout,
      connections: connectionsOrErr,
      status: raw.status,
    }, raw.id)

    if (userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static toDto(raw: PersistenteUserRaw) {
    return {
      id: raw.id,
      username: raw.username,
      email: raw.email,
      role: raw.role, 
      isPremium: raw.isPremium,
      isVerified: raw.isVerified,
      isEarlySupporter: raw.isEarlySupporter,
      features: raw.features,
      status: raw.status,
      auth_system: raw.auth_system,
      timeout: raw.timeout,
      createdAt: raw.createdAt,
    }
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
      password: await user.password.getHashedPassword(),
      role: user.role,
      isPremium: user.isPremium,
      isVerified: user.isVerified,
      features: user.features,
      auth_system: user.auth_system,
      status: user.status,
      timeout: user.timeout,
      createdAt: user.createdAt,
    }
  }
}