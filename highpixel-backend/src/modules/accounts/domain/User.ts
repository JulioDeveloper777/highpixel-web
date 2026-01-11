import { Appointments, Profile, Roles, Staff } from "@prisma/client";
import { Either, right } from "@core/logic/Either";
import { Entity } from "@core/domain/Entity";
import { Connection } from "@modules/accounts/domain/Connection";
import { Connections } from "@modules/accounts/domain/Connections";
import { Email } from "@modules/accounts/domain/email";
import { InvalidEmailError } from "@modules/accounts/domain/errors/InvalidEmailError";
import { InvalidNameError } from "@modules/accounts/domain/errors/InvalidNameError";
import { InvalidPasswordError } from "@modules/accounts/domain/errors/InvalidPasswordError";
import { Name } from "@modules/accounts/domain/name";
import { Notification } from "@modules/accounts/domain/Notification";
import { Notifications } from "@modules/accounts/domain/Notifications";
import { Password } from "@modules/accounts/domain/password";
import { Token } from "@modules/accounts/domain/Token";
import { Tokens } from "@modules/accounts/domain/Tokens";

export interface IUserProps {
  username: Name,
  email: Email,
  password: Password,
  role?: Roles,
  Profile?: Profile,
  isPremium?: boolean,
  isVerified?: boolean,
  timeout?: number;
  isEarlySupporter?: boolean;
  status?: string;
  features?: string[];
  staff?: Staff;
  appointment?: Appointments;
  auth_system?: string;
  connections?: Connections;
  notifications?: Notifications;
  createdAt?: Date,
  tokens?: Tokens;
}

export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get features() {
    return this.props.features;
  }

  get isPremium() {
    return this.props.isPremium
  }

  get isEarlySupporter() {
    return this.props.isEarlySupporter;
  }

  get isVerified() {
    return this.props.isVerified
  }

  get status() {
    return this.props.status;
  }

  get staff() {
    return this.props.staff;
  }

  get appointment() {
    return this.props.appointment;
  }

  get createdAt() {
    return this.props.createdAt
  }

  get role() {
    return this.props.role
  }

  get timeout() {
    return this.props.timeout;
  }

  get notifications() {
    return this.props.notifications;
  }

  get tokens() {
    return this.props.tokens
  }

  get connections() {
    return this.props.connections;
  }

  get auth_system() {
    return this.props.auth_system;
  }

  get Profile() {
    return this.props.Profile
  }

  set setAccountWhitelistTimeout(timeout: number) {
    this.props.timeout = timeout;
  }

  set setAccountWhitelistStatus(status: string) {
    this.props.status = status;
  }

  set markAsVerified(verified: boolean) {
    this.props.isVerified = true
  }

  set setPassword(password: Password) {
    this.props.password = password;
  }

  public addNotification(notification: Notification) {
    this.notifications.add(notification);
  }

  public removeNotification(notification: Notification) {
    this.notifications.remove(notification);
  }

  public addFeatures(features: string[]) {
    features.map((feature, index) => {
      this.props.features.push(feature);
    });
  }

  public addConnection(connection: Connection) {
    this.connections.add(connection);
  }

  public removeConnection(connection: Connection) {
    this.connections.remove(connection);
  }

  public removeFeatures(toRemove: string[]) {
    const features = this.props.features;

    toRemove.forEach(feat => {
      features.splice(features.indexOf(feat), 1);
    });

    features.map((feature, index) => {
      this.props.features.push(feature);
    });
  }

  public addToken(token: Token) {
    this.tokens.add(token)
  }

  public removeToken(token: Token) {
    this.tokens.remove(token)
  }

  static create(props: IUserProps, id?: string): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const user = new User({
      ...props,
      notifications: props.notifications ?? Notifications.create([]),
      connections: props.connections ?? Connections.create([]),
      tokens: props.tokens ?? Tokens.create([]),
      auth_system: props.auth_system ?? 'NORMAL',
    }, id);

    return right(user)
  }
}