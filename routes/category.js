const express = require("express");
const { sequelize, Category, Book } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25).required(),
});

route.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    return res.json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let category = await Category.findByPk(req.params.id);
    let categoryBooks = await Category.findAll({
      include: {
        model: Book,
        where: {
          categoryID: req.params.id,
        },
      },
    });
    if (categoryBooks.length == 0) return res.json(category);
    return res.json(categoryBooks);
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
    let newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let category = await Category.findByPk(req.params.id);
    category.name = req.body.name;
    await category.save();
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let category = await Category.findByPk(req.params.id);
    await category.destroy();
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
