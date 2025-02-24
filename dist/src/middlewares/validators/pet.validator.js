"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// checkear después imagen
const validatorPostPet = [
    (0, express_validator_1.check)("size")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("species")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("age")
        .exists()
        .notEmpty(),
    /* .check(""), */ //img
    (0, express_validator_1.check)("detail")
        .exists()
        .notEmpty()
        .isLength({ min: 10, max: 200 }),
    (0, express_validator_1.check)("area")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 50 }),
    (0, express_validator_1.check)("sex")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("status")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }
];
exports.default = validatorPostPet;
