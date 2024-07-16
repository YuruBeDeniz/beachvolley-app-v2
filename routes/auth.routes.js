const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User.js");
const { isAuthenticated } = require('../middlewares/jwt'); 
const jwt = require('jsonwebtoken');

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
             const user = { name, email, _id };
             res.status(200).json({ user: user }) 
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal server error."})
          })
    })
  });

  router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({ message: "Please provide email and password" });
        return;
    };
console.log("req.headers", req.headers)
    User.findOne({ email })
      .then((foundUser) => {
        if(!foundUser) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
        if(isPasswordCorrect) {
            
            const { name, _id } = foundUser;
            const payload = { name, _id };

            const authToken = jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {algorithm: 'HS256', expiresIn: '24h'}
            );
            res.status(200).json({ authToken: authToken });        
        }

        else {
            res.status(401).json({ message: "Unable to authenticate the user" })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })
      })
});

  router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log("req.payload", req.payload)
    res.status(200).json(req.payload);
});
    
module.exports = router;
