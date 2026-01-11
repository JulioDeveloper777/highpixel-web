interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  stripeSubscriptionStatus?: string;
  stripeSubscriptionId?: string;
  couple?: Couple
  coupleId?: string;
}

interface Signal {
  id: string;
  userId: string;
  coupleId: string;
  emotion: string;
  note?: string;
  createdAt: Date;
  user: User;
  couple: Couple;
}

interface AIResponse {
  id: string;
  coupleId: string;
  summary: string;
  advice: string;
  challenge?: string;
  createdAt: Date;
  couple: Couple;
}

interface Couple {
  id: string;
  relationshipStatus: string;
  startAt: Date;
  createdAt: Date;
  signals: Signal[];
  aiResponses: AIResponse[];
  users: User[];
}

interface CoupleMetric {
  id: string;
  coupleId: string;
  synchrony: number;
  connection: number;
  communication: number;
  intensity: number;
  avgTotal?: number;
}

interface Invite {
  id?: string,
  inviterId: string,
  inviteeEmail: string,
  token: string,
  used: boolean,
  expiresIn: number,
}

interface Memory {
  id: string;
  title: string;
  description: string;
  avatarUrl?: string;
  createdAt: Date
}

interface Meta {
  total: number,
  page: number,
  perPage: number,
  lastPage: number,
}

interface Paginate<T> {
  data: T[],
  meta: Meta
}

interface Question {
  id: string;
  coupleId: string;
  userId: string;
  user?: User;
  couple?: Couple;
  question: string;
  answer: string | null;
  wasAnswered: boolean;
  createdAt: Date;
  updatedAt: Date
}

enum InviteStatus {
  Active = "active",
  Pending = "pending"
}

enum SubscriptionStatus {
  Active = "active",
}
