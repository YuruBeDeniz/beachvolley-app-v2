const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User.js");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
   const {name, email, password } = req.body;
   if (!name || !email || !password) {
    return res.status(400).json({message: "Please fill in all fields."})
   };

   User.findOne({ email })
    .then(foundUser => {
        if(foundUser) {
            return res.status(400).json({message: "User already exists."})
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        User.create({ name, email, password: hashedPassword })
          .then(createdUser => {
             const { name, email, _id } = createdUser;
             console.log(createdUser)
             const user = { name, email, _id };
             res.status(200).json({ user: user }) 
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal server error."})
          })
    })

  });
    
module.exports = router;
