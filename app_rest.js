const path = require("path");
const express = require("express");
const { sequelize, User } = require("./models");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

let corsOptions = {
  origin: "http://127.0.0.1:8000",
  optionsSuccessStatus: 200,
};

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ msg: "Nije autentifikovan" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: err });
    req.user = user;

    next();
  });
}

function autorization(req, res, next) {
  User.findByPk(req.user.userID)
    .then((usr) => {
      if (usr.privileges == "admin" || usr.privileges == "moderator") {
        next();
      } else {
        return res.status(403).json({ msg: "Forbiden" });
      }
    })
    .catch((err) => res.status(403).json({ msg: "No such User" }));
}

app.use(cors(corsOptions));
app.use(authToken);
app.use(autorization);

const authorRoutes = require("./routes/author.js");
app.use("/author", authorRoutes);

const categoryRoutes = require("./routes/category.js");
app.use("/category", categoryRoutes);

const bookRoutes = require("./routes/book.js");
app.use("/book", bookRoutes);

const toplistRoutes = require("./routes/toplist.js");
app.use("/toplist", toplistRoutes);

const saleRoutes = require("./routes/sale.js");
app.use("/sale", saleRoutes);

const wishlistRoutes = require("./routes/wishlist.js");
app.use("/wishlist", wishlistRoutes);

const orderRoutes = require("./routes/order.js");
app.use("/order", orderRoutes);

const couponRoutes = require("./routes/coupon.js");
app.use("/coupon", couponRoutes);

const userRoutes = require("./routes/user.js");
const { rmSync } = require("fs");
app.use("/user", userRoutes);

const giftCardRoutes = require("./routes/giftcard.js");
app.use("/giftcard", giftCardRoutes);

app.listen({ port: 7000 }, async () => {
  await sequelize.authenticate();
  console.log("Started server on localhost:7000");
});
