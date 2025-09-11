"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const error_handler_1 = require("../utils/error.handler");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, auth_utils_1.validateUserCredentials)(email, password);
        const token = (0, jwt_utils_1.generateToken)(user);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "test",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24h
        })
            .status(200)
            .json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, role: user.role, phone: user.phone },
        });
    }
    catch (error) {
        const errorMessage = (0, error_handler_1.getErrorMessage)(error);
        return res.status(401).json({ error: errorMessage });
    }
};
exports.loginUser = loginUser;
