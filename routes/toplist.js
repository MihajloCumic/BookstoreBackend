const express = require("express");
const { sequelize, TopList, Book } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25).required(),
});

route.get("/", async (req, res) => {
  try {
    const allTopLists = await TopList.findAll();
    return res.json(allTopLists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let topList = await TopList.findAll({
      include: Book,
      where: {
        id: req.params.id,
      },
    });
    return res.json(topList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newTopList = await TopList.create(req.body);
    res.send(newTopList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let topList = await TopList.findByPk(req.params.id);
    topList.name = req.body.name;

    await topList.save();
    res.send(topList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id1/book/:id2", async (req, res) => {
  try {
    let topList = await TopList.findByPk(req.params.id1);
    let book = await Book.findByPk(req.params.id2);
    await topList.addBook(book);

    //await book.save();
    res.send(topList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let topList = await TopList.findByPk(req.params.id);
    await topList.destroy();
    res.send(topList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id1/book/:id2", async (req, res) => {
  try {
    let topList = await TopList.findByPk(req.params.id1);
    let book = await Book.findByPk(req.params.id2);
    topList.removeBook(book);
    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
