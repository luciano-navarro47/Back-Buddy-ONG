"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.veterinaryValidator = void 0;
const express_validator_1 = require("express-validator");
// import { Veterinary } from "../../Model/Veterinary";
// checkear después imagen
// const isValidUser: CustomValidator = async (email) => {
// 	return Veterinary.find({ where: [{ email: email }] }).then((veterinary) => {
// 		if (veterinary.length) {
// 			return Promise.reject("E-mail already in use");
// 		}
// 	});
// };
// const isValidVeterinaryAddress: CustomValidator = async (address) => {
// 	return Veterinary.find({ where: [{ address: address }] }).then(
// 		(veterinary) => {
// 			console.log(veterinary);
// 			if (veterinary.length) {
// 				return Promise.reject("address already in use");
// 			}
// 		}
// 	);
// };
// const isValidVeterinaryphone: CustomValidator = async (phone) => {
// 	return Veterinary.find({ where: [{ phone: phone }] }).then((veterinary) => {
// 		console.log(veterinary);
// 		if (veterinary.length) {
// 			return Promise.reject("phone already in use");
// 		}
// 	});
// };
exports.veterinaryValidator = [
    (0, express_validator_1.check)("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
    (0, express_validator_1.check)("phone")
        .exists()
        .notEmpty()
        .isNumeric()
        .isLength({ min: 6, max: 10 }),
    // .custom(isValidVeterinaryphone),
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isLength({ min: 6, max: 50 })
        .isEmail(),
    // .custom(isValidUser),
    (0, express_validator_1.check)("description").exists().notEmpty().isLength({ min: 10, max: 200 }),
    (0, express_validator_1.check)("address")
        .exists()
        .notEmpty()
        .isLength({ min: 5, max: 40 }),
    // .custom(isValidVeterinaryAddress),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
