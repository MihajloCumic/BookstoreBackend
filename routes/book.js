const express = require("express");
const { sequelize, Book } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  title: Joi.string().trim().min(3).max(30),
  publisher: Joi.string().trim().min(3).max(30),
  ISBN: Joi.string().trim().min(5).max(5),
  description: Joi.string().trim().min(5).max(100),
  price: Joi.number().min(1).max(2000),
  categoryID: Joi.number().min(1),
  saleID: Joi.number().min(1),
  authorID: Joi.number().min(1),
});
const shemaPost = Joi.object().keys({
  title: Joi.string().trim().min(3).max(30).required(),
  publisher: Joi.string().trim().min(3).max(30).required(),
  ISBN: Joi.string().trim().min(5).max(5).required(),
  description: Joi.string().trim().min(5).max(100).required(),
  price: Joi.number().min(1).max(2000).required(),
  categoryID: Joi.number().min(1).required(),
  saleID: Joi.number().min(1),
  authorID: Joi.number().min(1).required(),
});

route.get("/", async (req, res) => {
  try {
    const allBooks = await Book.findAll();
    return res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let book = await Book.findByPk(req.params.id);
    return res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    title: req.body.title,
    publisher: req.body.publisher,
    ISBN: req.body.ISBN,
    description: req.body.description,
    price: req.body.price,
    categoryID: req.body.categoryID,
    saleID: req.body.saleID,
    authorID: req.body.authorID,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newBook = await Book.create(req.body);
    res.send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    title: req.body.title,
    publisher: req.body.publisher,
    ISBN: req.body.ISBN,
    description: req.body.description,
    price: req.body.price,
    categoryID: req.body.categoryID,
    saleID: req.body.saleID,
    authorID: req.body.authorID,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let book = await Book.findByPk(req.params.id);
    book.title = req.body.title;
    book.publisher = req.body.publisher;
    book.ISBN = req.body.ISBN;
    book.description = req.body.description;
    book.price = req.body.price;
    book.authorID = req.body.authorID;
    book.categoryID = req.body.categoryID;
    book.saleID = req.body.saleID;

    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
