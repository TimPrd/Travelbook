/*
 * card MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Describe the schema (model)
var cardSchema = mongoose.Schema({
  title: {type: String, default: 'test'},
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  adress: String,
  lat: Number,
  long: Number,
  stars: { type: Number, default: 0 },
  pictures: [String],

});

var Card = mongoose.model("Card", cardSchema);

module.exports = Card;
