const express = require("express");
const { sequelize, Sale, Book } = require("../models");
const Joi = require("joi");

const route = express.Router();

//prebacuje name json iz body-ja u objekte
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const shema = Joi.object().keys({
  name: Joi.string().trim().min(5).max(50),
  discount: Joi.number().min(1).max(99),
  enddate: Joi.date().greater("now"),
});
const shemaPost = Joi.object().keys({
  name: Joi.string().trim().min(5).max(50).required(),
  discount: Joi.number().min(1).max(99).required(),
  enddate: Joi.date().greater("now").required(),
});

route.get("/", async (req, res) => {
  try {
    const allSales = await Sale.findAll();
    return res.json(allSales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.get("/:id", async (req, res) => {
  try {
    let sale = await Sale.findByPk(req.params.id);
    let saleBooks = await Sale.findAll({
      include: {
        model: Book,
        where: {
          saleID: req.params.id,
        },
      },
    });
    if (saleBooks.length == 0) return res.json(sale);
    return res.json(saleBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.post("/", async (req, res) => {
  const { error, succ } = shemaPost.validate({
    name: req.body.name,
    discount: req.body.discount,
    enddate: Date.parse(req.body.enddate),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let newSale = await Sale.create({
      name: req.body.name,
      discount: req.body.discount,
      enddate: Date.parse(req.body.enddate),
    });
    res.send(newSale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.put("/:id", async (req, res) => {
  const { error, succ } = shema.validate({
    name: req.body.name,
    discount: req.body.discount,
    enddate: req.body.enddate && Date.parse(req.body.enddate),
  });
  if (error) {
    return res.json({ msg: "Greska pri unosu" });
  }
  try {
    let sale = await Sale.findByPk(req.params.id);
    sale.name = req.body.name;
    sale.discount = req.body.discount;
    sale.enddate = req.body.enddate && Date.parse(req.body.enddate);
    await sale.save();

    res.send(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let sale = await Sale.findByPk(req.params.id);
    await sale.destroy();
    res.send(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greska", data: error });
  }
});
