"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: "50",
        name: "Mihajlo",
        surname: "Cumic",
        email: "mihajlo@usr.com",
        password: bcrypt.hashSync("sifra", 10),
        privileges: "admin",
        wishListID: "50",
      },
      {
        id: "51",
        name: "Marko",
        surname: "Markovic",
        email: "markoo@usr.com",
        password: bcrypt.hashSync("sifra", 10),
        privileges: "moderator",
        wishListID: "51",
      },
      {
        id: "52",
        name: "Nikola",
        surname: "Nikolic",
        email: "nikola@usr.com",
        password: bcrypt.hashSync("sifra", 10),
        privileges: "moderator",
        wishListID: "52",
      },
      {
        id: "53",
        name: "Filip",
        surname: "Filipovic",
        email: "filip@usr.com",
        password: bcrypt.hashSync("sifra", 10),
        privileges: "user",
        wishListID: "53",
      },
      {
        id: "54",
        name: "Aleksa",
        surname: "Aleksic",
        email: "aleksa@usr.com",
        password: bcrypt.hashSync("sifra", 10),
        privileges: "admin",
        wishListID: "54",
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
    await queryInterface.bulkDelete("User", null, {});
  },
};
