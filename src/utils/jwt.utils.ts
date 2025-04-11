import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

export const generateToken = (
  user: Pick<AuthTokenPayload, "id" | "email" | "role">
): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};
export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
};
