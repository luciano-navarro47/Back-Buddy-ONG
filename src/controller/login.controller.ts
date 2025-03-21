import { Request, Response } from "express";
import { validateUserCredentials } from "../utils/auth.utils";
import { generateToken } from "../utils/jwt.utils";
import { handleHttpError, NotFoundError, UnauthorizedError } from "../utils/error.handler";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await validateUserCredentials(email, password);

    const token = await generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
      token: token,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(401).json({
        error: "Correo electrónico incorrecto",
      });
    }

    if (error instanceof UnauthorizedError) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    handleHttpError(res, error);
  }
};
