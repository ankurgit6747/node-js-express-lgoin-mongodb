const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDublicateUsernameOrEmail = ((req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if(err) {
      res.status(500).send({message: err})
      return
    }
    if(user) {
      res.status(400).send({message: "Username is allready in use!"})
      return
    }
  })

  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, email) => {
    if(err) {
      res.status(500).send({message: err})
      return
    }
    if(email) {
      res.status(400).send({message: "Email is allready in use!"})
      return
    }
  })
  next()
})

const checkRolesExisted = ((req, res, next) => {
  if(req.body.roles) {
    for(let i=0 ; i<req.body.roles.length; i++) {
      if(!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({message: `Faild! Role of ${req.body.role[i]} does not exist!`})
        return
      }
    }
  }
  next()
})

const verifySignUp = {
  checkDublicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp;
