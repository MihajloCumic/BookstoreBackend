"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Authors", [
      {
        id: "50",
        name: "Pisac1",
        surname: "Pisac",
        country: "Srbija",
      },
      {
        id: "51",
        name: "Pisac2",
        surname: "Pisac",
        country: "Engleska",
      },
      {
        id: "52",
        name: "Pisac3",
        surname: "Pisac",
        country: "Nemacka",
      },
      {
        id: "53",
        name: "Pisac4",
        surname: "Pisac",
        country: "Srbija",
      },
      {
        id: "54",
        name: "Pisac5",
        surname: "Pisac",
        country: "Nemacka",
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
    await queryInterface.bulkDelete("Author", null, {});
  },
};
