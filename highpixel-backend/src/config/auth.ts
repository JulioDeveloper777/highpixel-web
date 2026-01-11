import { SignOptions } from 'jsonwebtoken';

export const auth: {
  secretKey: string;
  expiresIn: SignOptions['expiresIn'];
} = {
  secretKey: process.env.JWT_SECRET as string,
  expiresIn: '7d',
};
