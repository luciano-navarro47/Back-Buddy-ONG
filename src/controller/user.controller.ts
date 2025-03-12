import { Request, Response } from "express";
import { User, Status, Role } from "../Model/User";
import { handleHttpError, NotFoundError } from "../utils/error.handler";
import { encrypt } from "../utils/bcrypt.handler";
import { verified } from "../utils/bcrypt.handler";
import { sendEmail } from "../utils/sendEmail";
import rateLimit from "express-rate-limit";

export const createUser = async (req: Request, res: Response) => {
  const { name, surname, email, username, phone, password } = req.body;
  try {
    const passwordHashed = await encrypt(password);

    const newUser = new User();
    newUser.name = name;
    newUser.surname = surname;
    newUser.email = email;
    newUser.password = passwordHashed;
    newUser.username = username;
    newUser.phone = phone;
    newUser.role = Role.USER;
    newUser.status = Status.ACTIVE;

    await newUser.save();
    await sendEmail(email, name);
    res.status(200).send(newUser);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_USER");
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

export const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.find({
      where: [{ id: id }],
      relations: ["pet"],
    });

    if (!user) throw new NotFoundError(`User ${id} is not found`);
    else res.status(200).send(user);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_USER");
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

export const loginCtrl = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const FindUser = await User.find({
      // select: [password],
      where: [{ email: email }],
      relations: ["pet"],
    });
    console.log(FindUser);
    if (!FindUser.length) {
      res.status(400).send(console.log("usuario no encontrado"));
    }
    if (FindUser.length) {
      const emailDb = FindUser.map((e) => e.email);
      const passwordDb = FindUser.map((p) => p.password);

      for (let i = 0; i < passwordDb.length; i++) {
        let resultPassword = await verified(password, passwordDb[i]);

        if (emailDb[0] && resultPassword) return res.status(200).send(FindUser);
        else res.status(400).send("contraseña incorrecta");
      }
    }
  } catch {
    res.status(400).send("usuario incorrecto");
  }
};

export const checkUsernameRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: {error: "Too many requests, try again later."},
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

    return res.status(200).json({ available: !existingUser }); // Devuelve un objeto con `available`
  } catch (error) {
    handleHttpError(res, "INTERNAL_SERVER_ERROR");
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
