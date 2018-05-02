/*
 * card MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var shortid = require("shortid");

//Describe the schema (model)
var cardSchema = mongoose.Schema({
  id: { type: String, require: true, default: shortid.generate()},
  title: { type: String, default: "test", require: true },
  author: String,
  para1: String,
  para2: String,
  date: { type: Date, default: Date.now },
  adress: String,
  lat: Number,
  long: Number,
  category: String,
  country: String,
  stars: { type: Number, default: 0 },
  cover_picture: String,
  picture1: String,
  picture2: String
});

var Card = mongoose.model("Card", cardSchema);

module.exports = Card;
