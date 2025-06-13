import { User } from "../entities/User";
import { verify } from "./bcrypt.handler";
import { NotFoundError, UnauthorizedError } from "../utils/error.handler";

export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await User.findOneBy({ email: email });
  if (!user) throw new NotFoundError("User with this email not found");

  if (!user.password) throw new UnauthorizedError("User was created with OAuth, password login not allowed.");

  const isCorrect = await verify(password, user.password);
  if (isCorrect) return user;
  throw new UnauthorizedError("Password incorrect");
};
