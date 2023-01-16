const express = require("express");
const { sequelize, Coupon, Order } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  name: Joi.string().trim().min(5).max(20),
  code: Joi.string().trim().min(5).max(10),
  discount: Joi.number().min(1).max(99),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(5).max(20).required(),
  code: Joi.string().trim().min(5).max(10).required(),
  discount: Joi.number().min(1).max(99).required(),
});

route.get("/", async (req, res) => {
  try {
    const allCoupons = await Coupon.findAll();
    return res.json(allCoupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let coupon = await Coupon.findByPk(req.params.id);
    let orders = await Order.findAll({
      where: {
        couponID: req.params.id,
      },
    });
    const data = { coupon, orders };
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
    code: req.body.code,
    discount: Number(req.body.discount),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newCoupon = await Coupon.create(req.body);
    res.send(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    code: req.body.code,
    discount: req.body.discount && Number(req.body.discount),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let coupon = await Coupon.findByPk(req.params.id);
    coupon.name = req.body.name;
    coupon.code = req.body.code;
    coupon.discount = req.body.discount;
    await coupon.save();
    res.send(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let coupon = await Coupon.findByPk(req.params.id);
    await coupon.destroy();
    res.send(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
