/* 
 * card MODEL 
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Describe the schema (model)
var cardSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true
  },
});

var Card = mongoose.model("Card", cardSchema);

module.exports = Card;
