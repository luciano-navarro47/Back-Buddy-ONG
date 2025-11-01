import {
  check,
  validationResult,
  CustomValidator,
  Meta,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";

export const isValidEmail: CustomValidator = async (
  email: string,
  meta: Meta
): Promise<boolean> => {
  const req = meta?.req as Request | undefined;
  const userId = req?.params?.id ?? null;

  const normalized = String(email).trim().toLowerCase();
  const existingUser = await User.createQueryBuilder("u")
    .where("LOWER(u.email) = :email", { email: normalized })
    .getOne();

  if (existingUser && existingUser.id !== userId) {
    throw new Error("The Email is already in use");
  }

  return true;
};

export const userValidator = [
  check("first_name")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 }),

  check("last_name")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 }),

  check("phone")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .bail()
    .isLength({ min: 6, max: 15 }),

  check("email")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 50 })
    .bail()
    .isEmail()
    .bail()
    .custom(isValidEmail),

  check("username")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 10 }),
];

export const oauthUserValidator = [
  check("first_name")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 }),

  check("last_name")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 1, max: 50 }),

  check("email")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 50 })
    .bail()
    .isEmail()
    .bail()
    .custom(isValidEmail),

  check("auth0Sub").exists().bail().notEmpty(),
];
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
