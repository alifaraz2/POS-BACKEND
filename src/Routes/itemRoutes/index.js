import { Router } from "express"
import itemController from "../../controller/itemController/index.js"
import AuthMiddleware from "../../middleware/middleware.js"
const itemRoutes = Router()
itemRoutes.get("/getAllItem", AuthMiddleware,itemController.getAllItems)
itemRoutes.get("/getOneItem/:item_Id", AuthMiddleware,itemController.getOneItem)
itemRoutes.post("/addItem", AuthMiddleware,itemController.addItem)
itemRoutes.put("/updateItem/:item_Id", AuthMiddleware,itemController.updateItem)
itemRoutes.delete("/deleteItem/:item_Id", AuthMiddleware,itemController.deleteItem)
export default itemRoutes
