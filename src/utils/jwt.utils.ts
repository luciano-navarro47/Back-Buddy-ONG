import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../Model/User';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

type UserPayload = Pick<User, 'id' | 'email' | 'role'>;

export const generateToken = (user: UserPayload) : string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};
export const verifyToken = (token: string) : JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}