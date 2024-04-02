import { Router } from "express";
import authController from "../../controller/authController/index.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import AuthMiddleware from "../../middleware/middleware.js";
const authRoutes = Router();

authRoutes.post("/Login", authController.login);
authRoutes.post("/Register",AuthMiddleware,adminMiddleware, authController.register);

export default authRoutes;
