const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;

console.log("Role", )

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if(!token) {
    res.status(403).send({message: "No token provided!"})
    return;
  }

  jwt.verify(token, config.secret, (err, decode) => {
    if(err) {
      res.status(401).send({message: "Unauthorized!"})
      return;
    }
    req.userId = decode.id;
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec((err, user) => {
      if(err) {
        res.status(500).send({message: err})
        return;
      }

      for(let i=0; i<Role.length; i++) {
        if(Role[i] === "admin"){
          next()
          return;
        }
      }

      res.status(403).send({message: "Required admin Role!"})
      return;
    })
}

isModerator = (req, res, next) => {
  User.findById(req.userId)
    .exec((err, user) => {
      if(err) {
        res.status(500).send({message: err})
        return
      }
      
      for(let i=0; i<Role.length ; i++) {
        if(Role[i] === "moderator"){
          next()
          return
        }
      }

      res.status(403).send({ message: "Require Moderator Role!" });
        return;
    })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};