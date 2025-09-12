"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.oauthUserValidator = exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../../entities/User");
const isValidEmail = async (email) => {
    const result = await User_1.User.find({ where: [{ email: email }] });
    if (result.length > 0) {
        throw new Error("The Email is already in use");
    }
    return true;
};
exports.userValidator = [
    (0, express_validator_1.check)("first_name")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("last_name")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("phone")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isNumeric()
        .bail()
        .isLength({ min: 6, max: 15 }),
    (0, express_validator_1.check)("email")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 3, max: 50 })
        .bail()
        .isEmail()
        .bail()
        .custom(isValidEmail),
    (0, express_validator_1.check)("username")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 3, max: 10 }),
];
exports.oauthUserValidator = [
    (0, express_validator_1.check)("first_name")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("last_name")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)("email")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isLength({ min: 3, max: 50 })
        .bail()
        .isEmail()
        .bail()
        .custom(isValidEmail),
    (0, express_validator_1.check)("auth0Sub")
        .exists()
        .bail()
        .notEmpty()
];
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateRequest = validateRequest;
