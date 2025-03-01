import { Request, Response } from "express";
import { User, Status, Role } from "../Model/User";
import { handleHttpError, NotFoundError } from "../utils/error.handler";
import { encrypt } from "../utils/bcrypt.handler";
import { verified } from "../utils/bcrypt.handler";
import { transporter } from "../utils/sendEmail";

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

    // console.log("NEW USER: ", newUser);
    await newUser.save();

    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERRORRR: ", error);
    handleHttpError(res, "ERROR_CREATE_USER");
  }

// Welcome message from Nodemailer
  try {
  	await transporter.sendMail({
  		from: '"🐾​ EQUIPO BUDDY-ONG 🐾​" <buddy-ong@gmail.com>',
  		to: email,
  		subject: "Bienvenido/a BUDDY ONG!",
  		text: "PLAIN TEXT BODY", // plain text body
  		html: `<b> 
			Hola ${name},
			El equipo de Buddy ONG te quiere dar la bienvenida y ante todo, agradecer tu tiempo por haberte registrado en nuestra comunidad. Nos complace que estés aqui.
  			Saludos,
			Equipo de Buddy
  		   </b>`,
  	});
  } catch (error) {
  	console.log("EMAIL ERROR: ", error);
	handleHttpError(res, "ERROR_SEND_EMAIL");
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
