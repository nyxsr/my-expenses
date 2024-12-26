import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const expiresIn = 24 * 60 * 60;

export const tokenGenerator = (payload: Record<string, any>) => {
  const token = jwt.sign(payload, process.env.SECRET!, {
    expiresIn,
  });

  return { token, expiresIn: Math.floor(Date.now() / 1000) + expiresIn };
};

export const tokenVerifier = (token: string) => {
  return jwt.verify(token, process.env.SECRET!);
};
