import { Request, Response } from "express";
import { validateUserCredentials } from "../utils/auth.utils";
import { generateToken } from "../utils/jwt.utils";
import {
  getErrorMessage,
} from "../utils/error.handler";
import { JwtPayload } from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await validateUserCredentials(email, password);

    const token: string | JwtPayload= generateToken(user);
    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
      token: token,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return res.status(401).json({ error: errorMessage });
  }
};
