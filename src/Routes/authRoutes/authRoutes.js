import { Router } from "express"
import authController from "../../controller/authController/index.js"
import AuthMiddleware from "../../middleware/middleware.js"

const authRoutes = Router()
authRoutes.post("/Login", authController.login)
authRoutes.post("/adminRegister",authController.adminRegister)
authRoutes.post("/RegisterUser", AuthMiddleware, authController.register)
export default authRoutes
