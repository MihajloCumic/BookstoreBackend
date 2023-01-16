"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("toplistbooks", [
      {
        id: "50",
        bookID: "51",
        toplistID: "52",
      },
      {
        id: "51",
        bookID: "52",
        toplistID: "52",
      },
      {
        id: "52",
        bookID: "53",
        toplistID: "54",
      },
      {
        id: "53",
        bookID: "53",
        toplistID: "53",
      },
      {
        id: "54",
        bookID: "50",
        toplistID: "51",
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
    await queryInterface.bulkDelete("WishListBook", null, {});
  },
};
