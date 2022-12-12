const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config")
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // secret environment variable
    httpOnly: true
  })
)

// const db = import("./app/models/index");
const db = require("./app/models")
const Role = db.role;

Role.ex

db.mongoose
  .set('strictQuery', false)
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Sucessfully connect to MongoDB");
    initial();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit();
  })

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added admin to role collection");
      })

      new Role({
        name: "moderator"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added moderator to role collection");
      })

      new Role({
        name: "admin"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("Added admin to role collection");
      })
    }
  })
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to people application." });
})

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

