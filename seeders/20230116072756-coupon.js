"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Coupons", [
      {
        id: "50",
        name: "Kupon",
        code: "kupon123",
        discount: "5",
      },
      {
        id: "51",
        name: "Kupon1",
        code: "kupon123",
        discount: "10",
      },
      {
        id: "52",
        name: "Kupon2",
        code: "kupon123",
        discount: "5",
      },
      {
        id: "53",
        name: "Kupon3",
        code: "kupon123",
        discount: "6",
      },
      {
        id: "54",
        name: "Kupon4",
        code: "kupon123",
        discount: "10",
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
    await queryInterface.bulkDelete("Coupon", null, {});
  },
};
