import { Router } from "express";
import {
	getAllUsers,
	getUserId,
	updateUser,
	createUser,
	checkUsername,
	setStatusUserInDB,
	loginCtrl,
	deleteUser,
	checkUsernameRateLimiter,
} from "../controller/user.controller";
import { userValidator, validateRequest } from "../middlewares/validators/user.validator";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/check-username", checkUsernameRateLimiter, checkUsername);
userRouter.get("/:id", getUserId);
userRouter.put("/:id", updateUser);
userRouter.put("/setStatusUser/:id", setStatusUserInDB);
userRouter.post("/register", userValidator, validateRequest, createUser);
userRouter.delete("/:id", deleteUser);
// http://localhost:3001/users/login
userRouter.post("/login", loginCtrl);

export default userRouter;
