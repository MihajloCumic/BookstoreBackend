"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Books", [
      {
        id: "50",
        title: "knjiga1",
        publisher: "laguna",
        ISBN: "12345",
        description: "opis knjige1",
        price: "10",
        categoryID: "50",
        saleID: "",
        authorID: "50",
      },
      {
        id: "51",
        title: "knjiga2",
        publisher: "laguna",
        ISBN: "12346",
        description: "opis knjige2",
        price: "10",
        categoryID: "50",
        saleID: "",
        authorID: "51",
      },
      {
        id: "52",
        title: "knjiga3",
        publisher: "laguna",
        ISBN: "12347",
        description: "opis knjige3",
        price: "15",
        categoryID: "51",
        saleID: "",
        authorID: "52",
      },
      {
        id: "53",
        title: "knjiga4",
        publisher: "vulkan",
        ISBN: "12348",
        description: "opis knjige4",
        price: "20",
        categoryID: "52",
        saleID: "50",
        authorID: "52",
      },
      {
        id: "54",
        title: "knjiga5",
        publisher: "delfi",
        ISBN: "12349",
        description: "opis knjige5",
        price: "11",
        categoryID: "52",
        saleID: "",
        authorID: "50",
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
    await queryInterface.bulkDelete("Book", null, {});
  },
};
