import { Router } from "express";
import transactionController from "../../controller/TransactionController/index.js";

const transactionRoutes=Router()
transactionRoutes.get('/getTransaction',transactionController.getTransaction)
export default transactionRoutes;