import { User } from "../Model/User";
import { verify } from "./bcrypt.handler";
import { NotFoundError, UnauthorizedError } from "../utils/error.handler";

export const validateUserCredentials  = async (
  email: string,
  password: string
) : Promise<User> => {
  const user = await User.findOneBy({ email: email });
  if (!user) throw new NotFoundError("User with this email not found");

  const isCorrect = await verify(password, user.password);
  if (!isCorrect) throw new UnauthorizedError("Password incorrect");

  return user;
};