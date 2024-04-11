import sequelize from "../../DB/config.js"
import TransactionModel from "../../Model/TransactionModel/index.js"

const transactionController = {
  getTransaction: (req, res) => {
    res.json({
      message: "This is a GET request for transactions",
    })
  },
  addTransaction: async (req, res) => {
    try {
      const payload = req.body
      const transaction = await TransactionModel.create({
        itemName: payload.itemName,
        unitPrice: payload.unitPrice,
      });
      res.json({
        message: "Transaction added successfully",
        transaction: transaction
      });
    } catch (error) {
      console.error("Error adding transaction:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  },
}

export default transactionController
