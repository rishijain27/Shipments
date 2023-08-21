const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=require('../config/keys')
router.post("/signup", (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "User already exist" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            name,
          });
          user
            .save()
            .then((user) => {
                console.log(user.email);
              res.json({ message: "saved successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/signin", (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({ message: "Invalid Email or password" });
        }
        bcrypt
          .compare(password, savedUser.password)
          .then((doMatch) => {
            if (doMatch) {
              const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
              const { _id, name, email } = savedUser;
              res.json({
                token: token,
                user: { _id, name, email },
              });
            } else {
              return res.json({ error: "Invalid Email or Password" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;