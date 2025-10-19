import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorPostPet = [
  check("size").exists().notEmpty(),

  check("specie").exists().notEmpty(),

  check("age").exists().notEmpty(),

  check("images")
    .exists()
    .notEmpty()
    .isArray({ min: 3, max: 3 })
    .withMessage("Images must be an array of exactly 3 strings")
    .custom((arr) => arr.every((img: any) => typeof img === "string"))
    .withMessage("Each image must be a string"),

  check("name")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("videos")
    .optional()
    .isArray()
    .custom((arr) => arr.every((vid: any) => typeof vid === "string"))
    .withMessage("Each video must be a string"),

  check("detail").exists().notEmpty().isLength({ min: 50, max: 500 }),

  check("street")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Street must be at least 3 characters long"),

  check("number")
    .optional()
    .isInt({ min: 10, max: 99999 })
    .withMessage("Number must be between 2 and 5 digits"),

  check("city").exists().notEmpty().isString().withMessage("City is required"),

  check("sex").exists().notEmpty(),

  check("status").exists().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export default validatorPostPet;
