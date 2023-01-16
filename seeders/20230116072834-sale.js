"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Sales", [
      {
        id: "50",
        name: "Snizenje",
        discount: "20",
        enddate: "2023-1-20",
      },
      {
        id: "51",
        name: "Snizenje1",
        discount: "10",
        enddate: "2023-1-25",
      },
      {
        id: "52",
        name: "Snizenje2",
        discount: "5",
        enddate: "2023-1-27",
      },
      {
        id: "53",
        name: "Snizenje3",
        discount: "10",
        enddate: "2023-2-17",
      },
      {
        id: "54",
        name: "Snizenje4",
        discount: "15",
        enddate: "2023-2-10",
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
    await queryInterface.bulkDelete("Sale", null, {});
  },
};
