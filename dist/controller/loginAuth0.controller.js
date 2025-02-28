"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCheck = void 0;
const User_1 = require("../Model/User");
const emailCheck = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User_1.User.find({
            where: [{ email: email }],
            relations: ["pet"],
        });
        if (!user.length) {
            return res.status(400).json("Email no econtrado");
        }
        else {
            res.status(200).send(user);
        }
        console.log(user);
    }
    catch (error) {
        if (error)
            return res.status(400).json("Email no econtrado");
    }
};
exports.emailCheck = emailCheck;
