const express = require("express");
const { sequelize, GiftCard } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25),
  amount: Joi.number().min(5).max(1000),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(3).max(25).required(),
  amount: Joi.number().min(5).max(1000).required(),
});

route.get("/", async (req, res) => {
  try {
    const allGiftCards = await GiftCard.findAll();
    return res.json(allGiftCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let giftCard = await GiftCard.findByPk(req.params.id);
    return res.json(giftCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  console.log(req.body);
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
    amount: Number(req.body.amount),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newGiftCard = await GiftCard.create(req.body);
    res.send(newGiftCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    amount: req.body.amount && Number(req.body.amount),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let giftCard = await GiftCard.findByPk(req.params.id);
    giftCard.name = req.body.name;
    giftCard.amount = req.body.amount;

    await giftCard.save();
    const fullGiftCard = await GiftCard.findByPk(req.params.id);
    res.send(fullGiftCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    amount: req.body.amount && Number(req.body.amount),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let giftCard = await GiftCard.findByPk(req.params.id);
    await giftCard.destroy();
    res.send(giftCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
