import sequelize from "../../DB/config.js"
import { DataTypes } from "sequelize"

const TransactionModel = sequelize.define(
  "Transaction",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {}
)

export default TransactionModel
