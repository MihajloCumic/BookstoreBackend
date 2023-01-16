"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GiftCards", [
      {
        id: "50",
        name: "GiftCard",
        amount: "20",
      },
      {
        id: "51",
        name: "GiftCard1",
        amount: "30",
      },
      {
        id: "52",
        name: "GiftCard2",
        amount: "15",
      },
      {
        id: "53",
        name: "GiftCard3",
        amount: "10",
      },
      {
        id: "54",
        name: "GiftCard4",
        amount: "20",
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
    await queryInterface.bulkDelete("GiftCard", null, {});
  },
};
