const express = require("express");
const { sequelize } = require("./models");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./static" });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./static" });
});

app.get("/author", (req, res) => {
  res.sendFile("author.html", { root: "./static" });
});

app.get("/book", (req, res) => {
  res.sendFile("book.html", { root: "./static" });
});

app.get("/category", (req, res) => {
  res.sendFile("category.html", { root: "./static" });
});

app.get("/sale", (req, res) => {
  res.sendFile("sale.html", { root: "./static" });
});

app.get("/toplist", (req, res) => {
  res.sendFile("toplist.html", { root: "./static" });
});

app.get("/wishlist", (req, res) => {
  res.sendFile("wishlist.html", { root: "./static" });
});

app.get("/order", (req, res) => {
  res.sendFile("order.html", { root: "./static" });
});

app.get("/user", (req, res) => {
  res.sendFile("user.html", { root: "./static" });
});

app.get("/coupon", (req, res) => {
  res.sendFile("coupon.html", { root: "./static" });
});

app.get("/giftcard", (req, res) => {
  res.sendFile("giftcard.html", { root: "./static" });
});

app.use(express.static(path.join(__dirname, "static")));

app.listen({ port: 8000 }, async () => {
  console.log("Started server at port 8000");
});
