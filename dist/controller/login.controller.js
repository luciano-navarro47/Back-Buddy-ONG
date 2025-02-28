"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = void 0;
const User_1 = require("../Model/User");
const formData = async (req, res) => {
    const { email, username } = req.body;
    try {
        const user = await User_1.User.find({
            where: [{ email: email }],
            relations: ["pet"],
        });
        if (user[0].username !== username)
            return res.status(400).send("contraseña incorrecta");
        else
            res.status(200).send(user);
    }
    catch (error) {
        if (error)
            return res
                .status(400)
                .json("El Email ingresado no se encuentra registrado");
    }
};
exports.formData = formData;
