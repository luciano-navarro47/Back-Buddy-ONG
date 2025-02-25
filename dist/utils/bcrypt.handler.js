"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verified = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
const encrypt = async (pass) => {
    const passwordHashed = await (0, bcryptjs_1.hash)(pass, 10);
    return passwordHashed;
};
exports.encrypt = encrypt;
const verified = async (pass, passHash) => {
    const isCorrect = await (0, bcryptjs_1.compare)(pass, passHash);
    return isCorrect;
};
exports.verified = verified;
