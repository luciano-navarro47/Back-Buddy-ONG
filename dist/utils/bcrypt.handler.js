"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
const encrypt = async (pass) => {
    return await (0, bcryptjs_1.hash)(pass, 10);
};
exports.encrypt = encrypt;
const verify = async (pass, passHash) => {
    return await (0, bcryptjs_1.compare)(pass, passHash);
};
exports.verify = verify;
