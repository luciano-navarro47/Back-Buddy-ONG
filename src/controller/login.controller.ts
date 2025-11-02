import { Request, Response } from "express";
import { validateUserCredentials } from "../utils/auth.utils";
import { generateToken } from "../utils/jwt.utils";
import { getErrorMessage } from "../utils/error.handler";
import { User } from "../entities/User";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User = await validateUserCredentials(email, password);

    const fullNameUser = user.first_name + " " + user.last_name;

    const token: string = generateToken(user);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24h
      })
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          phone: user.phone,
          fullName: fullNameUser,
        },
      });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return res.status(401).json({ error: errorMessage });
  }
};
