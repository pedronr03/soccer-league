import 'dotenv/config';
import { sign, verify, decode, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default';

const JWT_CONFIG: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const createAccessToken = (id: number) => {
  const token = sign({ id }, JWT_SECRET, JWT_CONFIG);
  return token;
};

export const validateAccessToken = (token: string) => {
  verify(token, JWT_SECRET);
  const decodedPayload = decode(token);
  return decodedPayload;
};
