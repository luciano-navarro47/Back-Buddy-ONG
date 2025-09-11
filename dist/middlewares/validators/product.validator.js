"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorPostProduct = void 0;
const express_validator_1 = require("express-validator");
// checkear después imagen
exports.validatorPostProduct = [
    (0, express_validator_1.check)("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
    (0, express_validator_1.check)("description").exists().notEmpty().isLength({ min: 8, max: 200 }),
    (0, express_validator_1.check)("price").exists().notEmpty().isNumeric(),
    (0, express_validator_1.check)("stock").exists().notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
