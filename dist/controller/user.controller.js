"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.checkUserPassword = exports.checkUsername = exports.checkUsernameRateLimiter = exports.bulkSetUsersStatus = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
const error_handler_1 = require("../utils/error.handler");
const bcrypt_handler_1 = require("../utils/bcrypt.handler");
const sendEmail_1 = require("../utils/sendEmail");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const typeorm_1 = require("typeorm");
const createUser = async (req, res) => {
    const { first_name, last_name, email, username, phone, password } = req.body;
    try {
        const passwordHashed = await (0, bcrypt_handler_1.encrypt)(password);
        const newUser = new User_1.User();
        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;
        newUser.password = passwordHashed;
        newUser.username = username;
        newUser.phone = phone;
        newUser.role = User_1.Role.USER;
        newUser.status = User_1.Status.ACTIVE;
        await newUser.save();
        await (0, sendEmail_1.sendEmail)(email, first_name);
        res.status(200).send(newUser);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.status(200).send(users);
    }
    catch (error) {
        console.log("ERROR_GET_USERS: ", error);
        (0, error_handler_1.handleHttpError)(res, "ERROR_GET_USERS");
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.User.find({
            where: [{ id: id }],
            relations: ["pets"],
        });
        if (!user)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        else
            res.status(200).send(user);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, username, phone, newPassword } = req.body;
    try {
        const user = await User_1.User.findOneBy({ id: id });
        if (!user)
            throw new error_handler_1.NotFoundError(`User ${id} is not found`);
        const toUpdate = {
            first_name,
            last_name,
            email,
            username,
            phone,
        };
        if (newPassword && newPassword.trim().length > 0) {
            const hashed = await (0, bcrypt_handler_1.encrypt)(newPassword);
            toUpdate.password = hashed;
        }
        await User_1.User.update({ id: id }, toUpdate);
        res.status(200).send({ ok: true, message: "User Updated" });
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.updateUser = updateUser;
const bulkSetUsersStatus = async (req, res) => {
    const updates = req.body;
    if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ message: "No users provided for update." });
    }
    try {
        const userIds = updates.map((u) => u.id);
        const existingUsers = await User_1.User.findBy({ id: (0, typeorm_1.In)(userIds) });
        const existingIds = existingUsers.map((u) => u.id);
        const missingIds = userIds.filter((id) => !existingIds.includes(id));
        if (missingIds.length > 0) {
            return res
                .status(404)
                .json({ message: `Users not found: ${missingIds.join(", ")}` });
        }
        for (const { id, status } of updates) {
            await User_1.User.update({ id }, { status });
        }
        return res.status(200).json({ message: "All user's status updated correctly." });
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.bulkSetUsersStatus = bulkSetUsersStatus;
exports.checkUsernameRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: { error: "Too many requests, try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
const checkUsername = async (req, res) => {
    let { username } = req.query;
    if (!username || typeof username !== "string") {
        return res.status(400).json({
            message: "The username is required and must be a valid string.",
        });
    }
    try {
        const existingUser = await User_1.User.findOne({ where: { username } });
        return res.status(200).json({ available: !existingUser });
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, "INTERNAL_SERVER_ERROR");
    }
};
exports.checkUsername = checkUsername;
const checkUserPassword = async (req, res) => {
    const { userId, currentPassword } = req.body;
    try {
        if (userId) {
            const user = await User_1.User.findOneBy({ id: userId });
            if (!user || !user.password)
                throw new error_handler_1.NotFoundError(`User ${userId} is not found`);
            const isCorrect = await (0, bcrypt_handler_1.verify)(currentPassword, user?.password);
            return res.status(200).json({ ok: isCorrect });
        }
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.checkUserPassword = checkUserPassword;
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
        (0, error_handler_1.handleHttpError)(res, "ERROR_DELETED_USER");
    }
};
exports.deleteUser = deleteUser;
