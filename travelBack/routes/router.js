
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Card = require('../models/card');

var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require("bcryptjs");

//ROUTES :

//HOME 
router
    .route("/")
    .all(function (req, res) {
        res.json({
            message: "TravelBook API ",
            methode: req.method
        });
    });

//CARDS

router
    .route("/cards")
    .get(function (req, res) {
        Card.find(function (err, cards) {
            if (err) {
                res.send(err);
            }
            res.json(cards);
        });
    })
    .post(function (req, res){
        Card.create({
            title: req.body.title,
         
        }, function (err, user) {
            console.log('card - add ', user);
        });
    });

    


//USERS
router
    .route("/users")
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });


router
    .post('/register', function (req, res) {

        //Salted pass
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var hashedPasswordConf = bcrypt.hashSync(req.body.passwordConf, 8);
        //Create user with args in the post request
        User.create({
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            status: req.body.userStatus, //Need to be replace by a check on email for admin
            password: hashedPassword,
            passwordConf: hashedPasswordConf
        }, function (err, user) {
            // Check if correct
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            //Send
            res.status(200).send({auth: true, token: token});
        });
    })
    .post('/login', function (req, res) {
        //Retrieve user by its mail
        User.findOne({email: req.body.email}, function (err, user) {
            //Error dealing
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');
            //Check the validity of password
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            // If not valid 401 = unauthorized
            if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
            // Assign token
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            // send
            res.status(200).send({auth: true, token: token});
        });
    })
    .get('/account', function (req, res) {
        // Get the token in the header
        var token = req.headers['x-access-token'];
        //Deal if not found
        if (!token) return res.status(401).send({auth: false, message: 'Not authorized.'});
        jwt.verify(token, config.secret, function (err, decoded) {
            //or found but not correct
            if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
            //retrieve user
            User.findById(decoded.id,
                {password: 0, passwordConf:0}, //Avoid sending the password
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem finding the user.");
                    if (!user) return res.status(404).send("No user found.");
                    //Send its data
                    res.status(200).send(user);
                });
        });
    });


//One User
router
    .route("/users/:user_id")
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    .put(function (req, res) {
        res.json({
            message:
            "Vous souhaitez modifier les informations du user n°" +
            req.params.user_id
        });
    })
    .delete(function (req, res) {
        res.json({
            message: "Vous souhaitez supprimer l'user n°" + req.params.user_id
        });
    });


module.exports = router;