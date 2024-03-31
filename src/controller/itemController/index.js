import itemModel from "../../Model/itemModel/index.js"
import Joi from "joi"
const itemController = {
  // Get all items
  getAllItems: async (req, res) => {
    try {
      const items = await itemModel.findAll({})
      res.json(items)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  },

  // Get one item by ID
  getOneItem: async (req, res) => {
    try {
      const item_Id = req.params.item_Id
      const item = await itemModel.findByPk(item_Id)
      if (!item) {
        return res.status(404).json({ error: "Item not found" })
      }
      res.json(item)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  },

  addItem: async (req, res) => {
    try {
      const payload = req.body
      const schema = Joi.object({
        Name: Joi.string().min(4).max(15).required(),
        Model: Joi.string().min(3).max(90),
        Detail: Joi.string(),
        UnitPrice: Joi.string().required(),
        Quantity: Joi.string(),
      })

      const isValidate = schema.validate(payload)
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error })
      }

      const newItem = await itemModel.create({
        Name: payload.Name,
        Model: payload.Model,
        Detail: payload.Detail,
        UnitPrice: payload.UnitPrice,
        Quantity: payload.Quantity,
      })
      res.status(201).json(newItem)
    } catch (error) {
      res.status(500).json({ error: "Failed to add item" })
    }
  },

  // Update an existing item
  updateItem: async (req, res) => {
    try {
      const item_Id = req.params.item_Id
      const payload = req.body
      const schema = Joi.object({
        Name: Joi.string().min(4).max(15).required(),
        Model: Joi.string().min(3).max(90),
        Detail: Joi.string(),
        UnitPrice: Joi.string().required(),
        Quantity: Joi.string(),
      })

      const isValidate = schema.validate(payload)
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error })
      }

      let itemToUpdate = await itemModel.findByPk(item_Id)

      if (!itemToUpdate) {
        return res.status(404).json({
          message: "No item found",
        })
      }

      itemToUpdate.Name = payload.Name
      itemToUpdate.Model = payload.Model
      itemToUpdate.Detail = payload.Detail
      itemToUpdate.UnitPrice = payload.UnitPrice
      itemToUpdate.Quantity = payload.Quantity

      await itemToUpdate.save()

      return res.status(200).json({
        message: "Item updated successfully",
        item: itemToUpdate,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Delete an item
  deleteItem: async (req, res) => {
    try {
      const item_Id = req.params.item_Id

      const deleted = await itemModel.destroy({ where: { id: item_Id } })

      if (deleted) {
        return res.json({ message: "Item deleted successfully" })
      } else {
        throw new Error("Item not found")
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

export default itemController
