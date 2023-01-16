const express = require("express");
const { sequelize, Author, Book } = require("../models");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const shema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(20),
  surname: Joi.string().trim().min(3).max(20),
  country: Joi.string().trim().min(3).max(30),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(20).required(),
  surname: Joi.string().trim().min(3).max(20).required(),
  country: Joi.string().trim().min(3).max(30).required(),
});

route.get("/", async (req, res) => {
  try {
    const allAuthors = await Author.findAll();
    return res.json(allAuthors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let author = await Author.findByPk(req.params.id);
    let authorBooks = await Author.findAll({
      include: {
        model: Book,
        where: {
          authorID: req.params.id,
        },
      },
    });
    if (authorBooks.length == 0) return res.json(author);
    return res.json(authorBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
    surname: req.body.surname,
    country: req.body.country,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newAuthor = await Author.create(req.body);
    res.send(newAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    surname: req.body.surname,
    country: req.body.country,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let author = await Author.findByPk(req.params.id);
    author.name = req.body.name;
    author.surname = req.body.surname;
    author.country = req.body.country;
    await author.save();
    res.send(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let author = await Author.findByPk(req.params.id);
    await author.destroy();
    res.send(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

module.exports = route;
