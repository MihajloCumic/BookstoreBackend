"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Author, {
        foreignKey: "authorID",
      });
      this.belongsTo(models.Category, {
        foreignKey: "categoryID",
      });
      this.belongsTo(models.Sale, {
        foreignKey: "saleID",
      });
      this.belongsToMany(models.TopList, { through: models.TopListBook });
      this.belongsToMany(models.WishList, { through: models.WishListBook });
      this.belongsToMany(models.Order, { through: models.OrderBook });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publisher: DataTypes.STRING,
      ISBN: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.MEDIUMINT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
