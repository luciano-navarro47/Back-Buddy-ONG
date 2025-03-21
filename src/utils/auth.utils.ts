import { User } from "../Model/User";
import { verified } from "./bcrypt.handler";
import {
    handleHttpError,
    NotFoundError,
    UnauthorizedError,
  } from "../utils/error.handler";

export const validateUserCredentials = async (email: string, password: string) => {

    const user = await User.findOneBy({ email: email });
    if (!user) throw new NotFoundError("User with this email not found");
        
    const isCorrect = await verified(password, user.password);
    if (!isCorrect) {
      throw new UnauthorizedError("Password incorrect.");
    }

    return user;
}