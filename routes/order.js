const express = require("express");
const { sequelize, Order, Book } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  date: Joi.date().greater("now"),
  status: Joi.string().trim().min(5).max(15),
  address: Joi.string().trim().min(5).max(50),
  couponID: Joi.number().min(1),
  userID: Joi.number().min(1),
});
const shemaPost = Joi.object().keys({
  date: Joi.date().greater("now").required(),
  status: Joi.string().trim().min(5).max(15).required(),
  address: Joi.string().trim().min(5).max(50).required(),
  couponID: Joi.number().min(1),
  userID: Joi.number().min(1).required(),
});

route.get("/", async (req, res) => {
  try {
    const allOrders = await Order.findAll();
    return res.json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let order = await Order.findAll({
      include: Book,
      where: {
        id: req.params.id,
      },
    });
    return res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    date: Date.parse(req.body.date),
    status: req.body.status,
    address: req.body.address,
    couponID: req.body.couponID,
    userID: req.body.userID,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newOrder = await Order.create({
      date: Date.parse(req.body.date),
      status: req.body.status,
      address: req.body.address,
      amount: 0,
      couponID: req.body.couponID,
      userID: req.body.userID,
    });
    res.send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    date: req.body.date && Date.parse(req.body.date),
    status: req.body.status,
    address: req.body.address,
    couponID: req.body.couponID,
    userID: req.body.userID,
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let order = await Order.findByPk(req.params.id);
    order.date = req.body.date;
    order.status = req.body.status;
    order.address = req.body.address;
    order.amount = req.body.amount;
    order.couponID = req.body.couponID;

    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id1/book/:id2", async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.id1);
    let book = await Book.findByPk(req.params.id2);
    await order.addBook(book);

    order.amount += book.price;
    await order.save();

    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
