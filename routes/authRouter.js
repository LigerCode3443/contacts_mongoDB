import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
} from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const registerMiddleware = validateBody(userRegisterSchema);
const loginMiddleware = validateBody(userLoginSchema);
const resendVerifyEmailMiddleware = validateBody(userEmailSchema);

const authRouter = Router();

authRouter.post(
  "/users/register",
  registerMiddleware,
  authControllers.register
);

authRouter.post("/users/login", loginMiddleware, authControllers.login);

authRouter.get("/users/current", authenticate, authControllers.getCurrent);

authRouter.post("/users/logout", authenticate, authControllers.logout);

authRouter.patch("/users", authenticate, authControllers.updateSubscription);

authRouter.get("/users/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/users/verify",
  resendVerifyEmailMiddleware,
  authControllers.resendVerify
);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatarURL"),
  authControllers.updateAvatar
);

export default authRouter;
