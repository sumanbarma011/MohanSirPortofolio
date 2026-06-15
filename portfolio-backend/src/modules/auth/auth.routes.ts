import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/zod.validate";
import { changePasswordSchema, loginAdminSchema } from "./auth.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
export const authRouter = Router();
authRouter.post("/logIn", validate(loginAdminSchema), AuthController.login);
authRouter.post("/logout", AuthController.login);

authRouter.get(
  "/refresh-token",
  // authMiddleware,
  AuthController.getNewAccessToken,
);
authRouter.get("/me", authMiddleware, AuthController.me);
authRouter.post(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  AuthController.changePassword,
);
