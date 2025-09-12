"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_utils_1 = require("../../utils/jwt.utils");
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.status(401).json({ error: "Token not provided" });
    try {
        const payload = (0, jwt_utils_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.authenticateJWT = authenticateJWT;
