"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginCtrl = exports.setStatusUserInDB = exports.updateUser = exports.getUserId = exports.getAllUsers = exports.createUser = void 0;
const User_1 = require("../Model/User");
const error_handler_1 = require("../utils/error.handler");
const bcrypt_handler_1 = require("../utils/bcrypt.handler");
const bcrypt_handler_2 = require("../utils/bcrypt.handler");
const mailer_1 = require("../config/mailer");
const createUser = async (req, res) => {
    const { name, surname, email, username, phone, role, password, status } = req.body;
    try {
        const passwordHashed = await (0, bcrypt_handler_1.encrypt)(password);
        const newUser = new User_1.User();
        newUser.name = name;
        newUser.surname = surname;
        newUser.email = email;
        newUser.password = passwordHashed;
        newUser.username = username;
        newUser.phone = phone;
        newUser.role = role;
        newUser.status = status;
        await newUser.save();
        res.status(200).send(newUser);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_CREATE_USER");
    }
    //SEND EMAIL DE BIENVENIDA
    try {
        await mailer_1.transporter.sendMail({
            from: '"EQUIPO BUDDY-ONG 👻" <correodepruebaproyectofinal@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "¡¡¡Bienvenido a BUDDY-ONG!!!", // Subject line
            // text: "", // plain text body
            html: `<b>El equipo Buddy-ONG te quiere dar una gran bienvenida y, sobre todo, agradecer tu tiempo para registrarte en nuestro sitio Web. Muchas gracias. ¡Es un placer conocerte y que estés aqui!
				Saludos!  
			   </b>`, // html body
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.status(200).send(users);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_USERS");
    }
};
exports.getAllUsers = getAllUsers;
const getUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.User.find({
            where: [{ id: id }],
            relations: ["pet"],
        });
        if (!user)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        else
            res.status(200).send(user);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_USER");
    }
};
exports.getUserId = getUserId;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, username, phone } = req.body;
    try {
        const user = await User_1.User.findOneBy({ id: id });
        if (!user)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        await User_1.User.update({ id: id }, req.body);
        res.status(200).send("User Updated");
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_UPDATE_USERS");
    }
};
exports.updateUser = updateUser;
const setStatusUserInDB = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.User.findOneBy({ id: id });
        if (!user)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        if (user.status === User_1.Status.ACTIVE) {
            await User_1.User.update({ id: id }, { status: User_1.Status.BANNED });
            res.status(200).send("User banned.");
        }
        else {
            await User_1.User.update({ id: id }, { status: User_1.Status.ACTIVE });
            res.status(200).send("User re-activaded.");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.setStatusUserInDB = setStatusUserInDB;
const loginCtrl = async (req, res) => {
    const { email, password } = req.body;
    try {
        const FindUser = await User_1.User.find({
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
                let resultPassword = await (0, bcrypt_handler_2.verified)(password, passwordDb[i]);
                if (emailDb[0] && resultPassword)
                    return res.status(200).send(FindUser);
                else
                    res.status(400).send("contraseña incorrecta");
            }
        }
    }
    catch {
        res.status(400).send("usuario incorrecto");
    }
};
exports.loginCtrl = loginCtrl;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDeleted = await User_1.User.delete({ id: id });
        console.log(userDeleted);
        if (userDeleted.affected === 0)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        res.send(`User deleted`);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, "ERROR_DELETED_USER");
    }
};
exports.deleteUser = deleteUser;
