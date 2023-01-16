const express = require("express");
const { sequelize, User, WishList } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

let corsOptions = {
  origin: "http://127.0.0.1:8000",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/register", (req, res) => {
  const obj = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    privileges: req.body.privileges,
  };

  User.create(obj)
    .then((rows) => {
      WishList.create({
        name: `${rows.name}'s List`,
      }).then((wishlist) => {
        rows.WishListId = wishlist.id;
        rows.save();
      });

      const usr = {
        userID: rows.id,
        user: rows.email,
      };

      const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

      res.json({ token: token });
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((usr) => {
      if (bcrypt.compareSync(req.body.password, usr.password)) {
        const obj = {
          userID: usr.id,
          user: usr.email,
        };

        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    })
    .catch((err) => res.status(500).json({ msg: "Invalid credentials" }));
});

app.listen({ port: 9000 }, async () => {
  await sequelize.authenticate();
  console.log("Started server on localhost:9000");
});
