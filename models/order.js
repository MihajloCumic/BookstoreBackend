"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Book, { through: models.OrderBook });
      this.belongsTo(models.Coupon, {
        foreignKey: "couponID",
      });
      this.belongsTo(models.User, {
        foreignKey: "userID",
      });
    }
  }
  Order.init(
    {
      date: DataTypes.DATE,
      status: DataTypes.STRING,
      address: DataTypes.STRING,
      amount: DataTypes.MEDIUMINT,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
