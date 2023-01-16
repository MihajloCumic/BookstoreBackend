"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Book, { through: models.WishListBook });
      this.hasOne(models.User, {
        foreignKey: "WishListId",
      });
    }
  }
  WishList.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );
  return WishList;
};
