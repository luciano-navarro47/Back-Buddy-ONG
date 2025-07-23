import { Request, Response } from "express";
import { User, Status, Role } from "../entities/User";
import { handleHttpError, NotFoundError } from "../utils/error.handler";
import { encrypt, verify } from "../utils/bcrypt.handler";
import { sendEmail } from "../utils/sendEmail";
import rateLimit from "express-rate-limit";

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, username, phone, password } = req.body;
  try {
    const passwordHashed = await encrypt(password);

    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.password = passwordHashed;
    newUser.username = username;
    newUser.phone = phone;
    newUser.role = Role.USER;
    newUser.status = Status.ACTIVE;

    await newUser.save();
    await sendEmail(email, first_name);
    res.status(200).send(newUser);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_USERS");
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.find({
      where: [{ id: id }],
      relations: ["pets"],
    });

    if (!user) throw new NotFoundError(`User ${id} is not found`);
    else res.status(200).send(user);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, surname, email, username, phone } = req.body;
  try {
    const user = await User.findOneBy({ id: id });
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    await User.update({ id: id }, req.body);
    res.status(200).send("User Updated");
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_USERS");
  }
};

export const setStatusUserInDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOneBy({ id: id });
    if (!user) throw new NotFoundError(`User ${id} is not found`);
    if (user.status === Status.ACTIVE) {
      await User.update({ id: id }, { status: Status.BANNED });
      res.status(200).send("User banned.");
    } else {
      await User.update({ id: id }, { status: Status.ACTIVE });
      res.status(200).send("User re-activaded.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkUsernameRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const checkUsername = async (req: Request, res: Response) => {
  let { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({
      message: "The username is required and must be a valid string.",
    });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    return res.status(200).json({ available: !existingUser });
  } catch (error) {
    handleHttpError(res, "INTERNAL_SERVER_ERROR");
  }
};

export const checkUserPassword = async (req: Request, res: Response) => {
  const { userId, currentPassword } = req.body;
  try {
    if (userId) {
      const user = await User.findOneBy({ id: userId });
      if (!user || !user.password) return res.status(400).json({ ok: false });
      const isCorrect = await verify(currentPassword, user?.password);
      return res.status(200).json({ ok: isCorrect });
    }
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.delete({ id: id });
    console.log(userDeleted);

    if (userDeleted.affected === 0)
      throw new NotFoundError(`User ${id} is not found`);
    res.send(`User deleted`);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETED_USER");
  }
};
