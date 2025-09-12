"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertAuth0User = exports.getAuth0User = void 0;
const User_1 = require("../entities/User");
const error_handler_1 = require("../utils/error.handler");
const getAuth0User = async (req, res) => {
    const oauthId = req.query.id;
    try {
        if (!oauthId)
            return res.status(204).json({});
        const user = await User_1.User.findOne({ where: { auth0Sub: oauthId } });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json({ user });
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getAuth0User = getAuth0User;
const upsertAuth0User = async (req, res) => {
    const { first_name, last_name, email, username, auth0Sub, role } = req.body;
    try {
        let user = await User_1.User.findOneBy({ email });
        if (!user) {
            user = new User_1.User();
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.username = username;
            user.auth0Sub = auth0Sub;
            user.role = role;
            user.status = User_1.Status.ACTIVE;
            await user.save();
        }
        res.status(200).json(user);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.upsertAuth0User = upsertAuth0User;
