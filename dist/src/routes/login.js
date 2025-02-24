"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controller/login.controller");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", login_controller_1.formData);
exports.default = loginRouter;
