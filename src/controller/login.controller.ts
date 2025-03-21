import { Request, Response } from "express";
import { User } from "../Model/User";
import { handleHttpError, NotFoundError } from "../utils/error.handler";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOneBy({ email: email});
    console.log("USERRRR: ", user);
    console.log("PWWWW: ", password);

    if(!user) throw new NotFoundError("User not found");
    res.status(200).send(user);
  } catch (error: any) {
    handleHttpError(res, error);
  }
};
