"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCredentials = void 0;
const User_1 = require("../entities/User");
const bcrypt_handler_1 = require("./bcrypt.handler");
const error_handler_1 = require("../utils/error.handler");
const validateUserCredentials = async (email, password) => {
    const user = await User_1.User.findOneBy({ email: email });
    if (!user)
        throw new error_handler_1.NotFoundError("User with this email not found");
    if (!user.password)
        throw new error_handler_1.UnauthorizedError("User was created with OAuth, password login not allowed.");
    const isCorrect = await (0, bcrypt_handler_1.verify)(password, user.password);
    if (isCorrect)
        return user;
    throw new error_handler_1.UnauthorizedError("Password incorrect");
};
exports.validateUserCredentials = validateUserCredentials;
