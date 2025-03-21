import { Router } from "express";
import { loginUser } from "../controller/login.controller";

const loginRouter = Router();

loginRouter.post("/", loginUser);

export default loginRouter;
