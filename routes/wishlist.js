const express = require("express");
const { sequelize, WishList, Book, User } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje nam json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25).required(),
});

route.get("/", async (req, res) => {
  try {
    const allWishLists = await WishList.findAll();
    return res.json(allWishLists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let wishList = await WishList.findAll({
      include: Book,
      where: {
        id: req.params.id,
      },
    });
    return res.json(wishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/user/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    let wishList = await WishList.findAll({
      include: Book,
      where: {
        id: user.WishListId,
      },
    });
    let data = {
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
      },
      wishList,
    };
    return res.json(data);
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
    let newWishList = await WishList.create(req.body);
    res.send(newWishList);
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
    let wishList = await WishList.findByPk(req.params.id);
    wishList.name = req.body.name;

    await wishList.save();
    res.send(wishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id1/book/:id2", async (req, res) => {
  try {
    let wishList = await WishList.findByPk(req.params.id1);
    let book = await Book.findByPk(req.params.id2);
    await wishList.addBook(book);

    //await book.save();
    res.send(wishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let wishList = await WishList.findByPk(req.params.id);
    await wishList.destroy();
    res.send(wishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id1/book/:id2", async (req, res) => {
  try {
    let wishList = await WishList.findByPk(req.params.id1);
    let book = await Book.findByPk(req.params.id2);
    wishList.removeBook(book);
    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
