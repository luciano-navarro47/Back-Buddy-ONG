import { Request, Response } from "express";
import { User, Status, Role } from "../entities/User";
import { handleHttpError, NotFoundError } from "../utils/error.handler";
import { encrypt, verify } from "../utils/bcrypt.handler";
import { sendEmail } from "../utils/sendEmail";
import rateLimit from "express-rate-limit";
import { In } from "typeorm";

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
    console.log("ERROR_GET_USERS: ", error);
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
  const { first_name, last_name, email, username, phone, newPassword } =
    req.body;
  try {
    const user = await User.findOneBy({ id: id });
    if (!user) throw new NotFoundError(`User ${id} is not found`);

    const toUpdate: Partial<User> = {
      first_name,
      last_name,
      email,
      username,
      phone,
    };

    if (newPassword && newPassword.trim().length > 0) {
      const hashed = await encrypt(newPassword);
      toUpdate.password = hashed;
    }
    await User.update({ id: id }, toUpdate);
    res.status(200).send({ ok: true, message: "User Updated" });
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const bulkSetUsersStatus = async (req: Request, res: Response) => {
  const updates: { id: string; status: Status }[] = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: "No users provided for update." });
  }

  try {
    const userIds = updates.map((u) => u.id);

    const existingUsers = await User.findBy({ id: In(userIds) });
    const existingIds = existingUsers.map((u) => u.id);

    const missingIds = userIds.filter((id) => !existingIds.includes(id));
    if (missingIds.length > 0) {
      return res
        .status(404)
        .json({ message: `Users not found: ${missingIds.join(", ")}` });
    }

    for (const { id, status } of updates) {
      await User.update({ id }, { status });
    }

    return res.status(200).json({ message: "All user's status updated correctly."})
  } catch (error) {
    handleHttpError(res, error)
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
      if (!user || !user.password)
        throw new NotFoundError(`User ${userId} is not found`);
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
