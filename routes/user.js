const express = require("express");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = express.Router();

const Key = "23456";

//User wants to sign up
user.post("/signup", async (req, res) => {
  //Fetching data from the database
  const User = await UserModel.findOne({
    email: req.body.email,
  });
  if (User) {
    res.status(401).send("User already exists");
  } else {
    bcrypt.genSalt(7, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const NewUser = new UserModel({
          email: req.body.email,
          name: req.body.name,
          password: hash,
        });
        await NewUser.save();
        res.status(201).send("User signed up successfully");
      });
    });
  }
});

//User wants to login
user.post("/login", async (req, res) => {
  const FindUser = await UserModel.findOne({
    email: req.body.email,
  });
  if (FindUser) {
    let isPasswordIdentical = bcrypt.compare(
      req.body.password,
      FindUser.password
    );
    if (isPasswordIdentical) {
      //Here I generate the token
      //What does generation mean? It means I encode the information of the user into a token.

      const token = jwt.sign({ id: FindUser._id }, Key);
      res.status(201).send(token);
    } else {
      res.status(400).send("Password is not correct");
    }
  } else {
    res.status(400).send("User doesn't exist");
  }
});

//Fetching document from database
user.get("/get", async (req, res) => {
  const FindUser = await UserModel.find();
  res.status(200).send(FindUser);
});

module.exports = user;

//The server need the token to verify the user
//The server will send the token to the frontend
//If the client wants to check his profile, he must send the server the token instead of bringing him everytime email and password. That is the authentication.
