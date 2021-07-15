const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const router = express.Router();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/destinations", {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.use("/", router);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

let country = require("./models/country");
let record = require("./models/record");
let user = require("./models/user");

// Routes

router.route("/getCountries").get(function (req, res) {
  country.find({ "location.type": "Polygon" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/setVisited/:name").put(function (req, res) {
  let inputName = req.params.name;
  let filter = { name: inputName };
  let updateDoc = {
    $set: {
      visited: true,
    },
  };
  country.updateOne(filter, updateDoc, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/getUsers").get(function (req, res) {
  user.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/getUserRecords").get(function (req, res) {
  record.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/login").post(function (request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    let query = {};
    query["username"] = username;
    query["password"] = password;

    user.find(query, function (error, results) {
      if (results.length > 0) {
        response.send("Log in successfull");
      } else {
        response.send("Incorrect Username and/or Password!");
      }
      response.end();
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
