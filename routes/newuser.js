const express = require("express");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const NewUser = express.Router();

const Key = "h3398";

//User wants to signup
NewUser.post("/new/signup", async (req, res) => {
  const FindUser = await UserModel.findOne({
    email: req.body.email,
  });

  if (FindUser) {
    res.status(401).send("User already exists, try another email!");
  } else {
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const NewUser = UserModel({
          name: "ayoub",
          password: hash,
          email: "ouata@hotmail.com",
        });
        await NewUser.save();
        res.status(201).send("User signed up successfully");
      });
    });
  }
});

//User wants to login
NewUser.post("/new/login", async (req, res) => {
  const NewUser = await UserModel.findOne({
    email: req.body.email,
  });

  if (NewUser == null) {
    res.status(401).send("User doesn't exist");
  } else {
    const isPasswordIdentical = bcrypt.compare(
      req.body.password,
      NewUser.password
    );
    res.status(201).send("User was logged successfully");

    if (isPasswordIdentical) {
      //generate the token
      const token = jwt.sign({ id: NewUser._id }, Key);
      res.status(201).send(token);
    } else {
      res.status(401).send("Password is wrong");
    }
  }
});

module.exports = NewUser;
