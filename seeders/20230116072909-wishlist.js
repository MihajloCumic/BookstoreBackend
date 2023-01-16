"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("WishLists", [
      {
        id: "50",
        name: "Wish lista",
      },
      {
        id: "51",
        name: "Wish lista1",
      },
      {
        id: "52",
        name: "Wish lista2",
      },
      {
        id: "53",
        name: "Wish lista3",
      },
      {
        id: "54",
        name: "Wish lista4",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("WishList", null, {});
  },
};
