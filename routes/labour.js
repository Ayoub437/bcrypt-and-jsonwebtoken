const express = require("express");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");

const labour = express.Router();

//Signup
labour.post("/signup", async (req, res) => {
  try {
    const FindLabour = await UserModel.findOne({
      email: req.body.email,
    });
 
    
    if (FindLabour) {
      res.status(401).send("try another email!");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        console.log(salt)
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          const NewLabour = UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });
          await NewLabour.save();
          res.status(201).send("User was created successfully");
        });
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error is occured");
  }
});
module.exports = labour;
