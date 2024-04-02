import sequelize from "../../DB/config.js";
import TransactionModel from "../../Model/TransactionModel/index.js";

const transactionController = {
  getTransaction: (req, res) => {
    res.json({
      message: "This is a GET request for transactions"
    });
  },
  addTransaction: async (req, res) => {
    try {
      const { itemName, unitPrice } = req.body;

      // Find the item in the TransactionModel table
      const transactionItem = await TransactionModel.findOne({
        where: { itemName }
      });

      if (!transactionItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Decrement the quantity of the item
      await TransactionModel.update(
        { unitPrice: sequelize.literal('unitPrice - 1') }, // Assuming you're decrementing the unitPrice by 1
        { where: { itemName } }
      );

      res.json({
        message: "Transaction added successfully"
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default transactionController;
