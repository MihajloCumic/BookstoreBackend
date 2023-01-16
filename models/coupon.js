"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: "couponID",
      });
    }
  }
  Coupon.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      discount: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
