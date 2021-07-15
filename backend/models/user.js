const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  privileges: String,
});

module.exports = mongoose.model("user", user);
