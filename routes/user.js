const express = require("express");
const { sequelize, User, WishList, Book, Order } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();

const shema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(20),
  surname: Joi.string().trim().min(3).max(20),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().trim().min(4),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(20).required(),
  surname: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(4).required(),
});

function adminAuthorization(req, res, next) {
  User.findByPk(req.user.userID)
    .then((usr) => {
      if (usr.privileges == "admin") {
        next();
      } else {
        return res.status(403).json({ msg: "Forbiden" });
      }
    })
    .catch((err) => res.status(403).json({ msg: "No such User" }));
}

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let realUser = await User.findByPk(req.params.id);
    let user = {
      id: realUser.id,
      name: realUser.name,
      surname: realUser.surname,
      email: realUser.email,
      privileges: realUser.privileges,
    };

    let wishlist = await WishList.findByPk(realUser.WishListId, {
      include: Book,
    });
    let data = { user, wishlist };
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/order/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const orders = await Order.findAll({
      where: {
        userID: req.params.id,
      },
    });
    return res.json({ user, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", adminAuthorization, async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    const obj = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      privileges: req.body.privileges,
    };
    let newUser = await User.create(obj);
    let wishlist = await WishList.create({
      name: `${newUser.name}'s List`,
    });
    newUser.WishListId = wishlist.id;
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", adminAuthorization, async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let user = await User.findByPk(req.params.id);
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.password = req.body.password && bcrypt.hashSync(req.body.password, 10);
    user.privileges = req.body.privileges;

    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", adminAuthorization, async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

module.exports = route;
