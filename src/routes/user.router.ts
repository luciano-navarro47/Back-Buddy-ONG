import { Router } from "express";
import {
  getAllUsers,
  getUserId,
  updateUser,
  createUser,
  checkUsername,
  setStatusUserInDB,
  deleteUser,
  checkUsernameRateLimiter,
} from "../controller/user.controller";
import {
  oauthUserValidator,
  userValidator,
  validateRequest,
} from "../middlewares/validators/user.validator";
import { getAuth0User, upsertAuth0User } from "../controller/auth0.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/check-username", checkUsernameRateLimiter, checkUsername);
userRouter.get("/oauth-user", getAuth0User);
userRouter.get("/:id", getUserId);
userRouter.put("/:id", updateUser);
userRouter.put("/setStatusUser/:id", setStatusUserInDB);
userRouter.post("/register", userValidator, validateRequest, createUser);
userRouter.post(
  "/oauth-upsert",
  oauthUserValidator,
  validateRequest,
  upsertAuth0User
);
userRouter.delete("/:id", deleteUser);

export default userRouter;
