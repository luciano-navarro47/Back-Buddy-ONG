"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../../Model/User");
// checkear después imagen
const isValidUser = async (email) => {
    return User_1.User.find({ where: [{ email: email }] }).then((user) => {
        if (user.length) {
            return Promise.reject("E-mail already in use");
        }
    });
};
const isValidUserName = async (username) => {
    return User_1.User.find({ where: [{ username: username }] }).then((user) => {
        console.log(user);
        if (user.length) {
            return Promise.reject("Username already in use");
        }
    });
};
exports.userValidator = [
    (0, express_validator_1.check)("name").exists().notEmpty().isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("surname").exists().notEmpty().isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("phone").exists().notEmpty().isNumeric().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .isEmail()
        .custom(isValidUser),
    (0, express_validator_1.check)("username")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 50 })
        .custom(isValidUserName),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
