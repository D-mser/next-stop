const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let record = new Schema({
  id: Number,
  userId: Number,
  countryName: String,
});

module.exports = mongoose.model("record", record);
