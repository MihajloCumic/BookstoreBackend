"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GiftCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.GiftCardUser });
    }
  }
  GiftCard.init(
    {
      name: DataTypes.STRING,
      amount: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "GiftCard",
    }
  );
  return GiftCard;
};
