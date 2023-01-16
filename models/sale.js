"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Book, {
        foreignKey: "saleID",
      });
    }
  }
  Sale.init(
    {
      name: DataTypes.STRING,
      discount: DataTypes.TINYINT,
      enddate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Sale",
    }
  );
  return Sale;
};
