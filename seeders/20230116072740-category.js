"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        id: "50",
        name: "Kategorija",
      },
      {
        id: "51",
        name: "Kategorija1",
      },
      {
        id: "52",
        name: "Kategorija2",
      },
      {
        id: "53",
        name: "Kategorija3",
      },
      {
        id: "54",
        name: "Kategorija4",
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
    await queryInterface.bulkDelete("Category", null, {});
  },
};
