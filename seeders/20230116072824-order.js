"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Orders", [
      {
        id: "50",
        date: "2023-1-17",
        status: "obrada",
        address: "adresa 1",
        amount: "15",
        couponID: "",
        userID: "52",
      },
      {
        id: "51",
        date: "2023-1-17",
        status: "obrada",
        address: "adresa 2",
        amount: "20",
        couponID: "",
        userID: "52",
      },
      {
        id: "52",
        date: "2023-1-17",
        status: "obrada",
        address: "adresa 3",
        amount: "25",
        couponID: "50",
        userID: "53",
      },
      {
        id: "53",
        date: "2023-1-17",
        status: "obrada",
        address: "adresa 4",
        amount: "20",
        couponID: "",
        userID: "53",
      },
      {
        id: "54",
        date: "2023-1-17",
        status: "obrada",
        address: "adresa 5",
        amount: "30",
        couponID: "51",
        userID: "52",
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
    await queryInterface.bulkDelete("Order", null, {});
  },
};
