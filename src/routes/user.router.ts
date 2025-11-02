import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  checkUsername,
  bulkSetUsersStatus,
  deleteUser,
  checkUsernameRateLimiter,
  checkUserPassword,
} from "../controller/user.controller";
import {
  isValidEmail,
  oauthUserValidator,
  userValidator,
  validateRequest,
} from "../middlewares/validators/user.validator";
import { getAuth0User, upsertAuth0User } from "../controller/auth0.controller";
import { check } from "express-validator";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/check-username", checkUsernameRateLimiter, checkUsername);
userRouter.get("/oauth-user", getAuth0User);
userRouter.get("/:id", getUserById);
userRouter.put("/bulk-set-status", bulkSetUsersStatus);
userRouter.put("/:id", [
  check("email")
    .optional() 
    .isEmail()
    .bail()
    .custom(isValidEmail),
  validateRequest,
], updateUser);
userRouter.post("/register", userValidator, validateRequest, createUser);
userRouter.post(
  "/oauth-upsert",
  oauthUserValidator,
  validateRequest,
  upsertAuth0User
);
userRouter.post("/check-password", checkUserPassword);
userRouter.delete("/:id", deleteUser);

export default userRouter;
