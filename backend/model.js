const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let country = new Schema({
  name: String,
  location: Schema({
    type: String,
    coordinates: [[[Number]]],
  }),
});

module.exports = mongoose.model("country", country);
