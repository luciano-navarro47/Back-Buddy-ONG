"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginAuth0_controller_1 = require("../controller/loginAuth0.controller");
const loginAuth0Router = (0, express_1.Router)();
loginAuth0Router.post("/", loginAuth0_controller_1.emailCheck);
exports.default = loginAuth0Router;
