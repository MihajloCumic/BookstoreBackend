"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TopLists", [
      {
        id: "50",
        name: "Top lista",
      },
      {
        id: "51",
        name: "Top lista1",
      },
      {
        id: "52",
        name: "Top lista2",
      },
      {
        id: "53",
        name: "Top lista3",
      },
      {
        id: "54",
        name: "Top lista4",
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
    await queryInterface.bulkDelete("TopList", null, {});
  },
};
