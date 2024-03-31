import sequelize from "../../DB/config.js"
import { DataTypes } from "sequelize"


const itemModel = sequelize.define(
  "Items",
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Model: {
      type: DataTypes.STRING,
    },
    Detail: {
      type: DataTypes.STRING,
    },
    UnitPrice: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    Quantity: {
      type: DataTypes.STRING,
    },
  },
  {}
)

export default itemModel
