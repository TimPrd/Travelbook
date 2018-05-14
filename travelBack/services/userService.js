var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
var bcrypt = require("bcryptjs");

function findAllUser(req,res){
    User.find(function(err, users) {
        if (err) {res.send(err);} res.json(users);
    });    
}

function findOneUser(req,res){
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });   
}

function register(req,res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var hashedPasswordConf = bcrypt.hashSync(req.body.passwordConf, 8);
    //Create user with args in the post request
    User.create(
      {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.userStatus, //Need to be replace by a check on email for admin
        password: hashedPassword,
        passwordConf: hashedPasswordConf,
        avatar: req.body.avatar
      },
      function(err, user) {
        // Check if correct
        if (err) return res.status(500).send("There was a problem registering the user.");
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }
    );
}

function login(req,res){
    //Retrieve user by its mail
    User.findOne({ email: req.body.email }, function(err, user) {
      //Error dealing
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");
      //Check the validity of password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // If not valid 401 = unauthorized
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });
      // Assign token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      // send

      res.status(200).send({ auth: true, token: token });
    });
}

function account(req,res)
{
     // Get the token in the header
     var token = req.headers["x-access-token"];
     console.log(req.headers)
     //Deal if not found
     if (!token)
       return res.status(401).send({ auth: false, message: "Not authorized." });
     jwt.verify(token, config.secret, function(err, decoded) {
       //or found but not correct
       if (err)
         return res
           .status(500)
           .send({ auth: false, message: "Failed to authenticate token.", error: err });
       //retrieve user
       User.findById(
         decoded.id,
         { password: 0, passwordConf: 0 }, //Avoid sending the password
         function(err, user) {
           if (err)
             return res
               .status(500)
               .send("There was a problem finding the user.");
           if (!user) return res.status(404).send("No user found.");
           //Send its data
           console.log(user);
           res.status(200).send(user);
         }
       );
     });
}

  module.exports = {
    findOneUser: findOneUser,
    register: register,
    login:login,
    account:account,
    findAllUser:findAllUser
  };
  