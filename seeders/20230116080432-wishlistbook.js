"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("wishlistbooks", [
      {
        id: "50",
        bookID: "51",
        wishlistID: "52",
      },
      {
        id: "51",
        bookID: "52",
        wishlistID: "52",
      },
      {
        id: "52",
        bookID: "53",
        wishlistID: "54",
      },
      {
        id: "53",
        bookID: "53",
        wishlistID: "53",
      },
      {
        id: "54",
        bookID: "50",
        wishlistID: "51",
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
