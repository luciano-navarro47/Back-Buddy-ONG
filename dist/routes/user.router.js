"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const user_validator_1 = require("../middlewares/validators/user.validator");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controller_1.getAllUsers);
userRouter.get("/:id", user_controller_1.getUserId);
userRouter.put("/:id", user_controller_1.updateUser);
userRouter.put("/setStatusUser/:id", user_controller_1.setStatusUserInDB);
userRouter.post("/", user_validator_1.userValidator, user_controller_1.createUser);
userRouter.delete("/:id", user_controller_1.deleteUser);
// http://localhost:3001/users/login
userRouter.post("/login", user_controller_1.loginCtrl);
exports.default = userRouter;
