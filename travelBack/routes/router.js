var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Card = require("../models/card");

const cardService = require("./../services/cardService");
const userService = require("./../services/userService");
const epubService = require("./../services/epubService");
const pdfService = require("./../services/pdfService");
const imageService = require("./../services/imageService");

//HOME
router.route("/").all(function(req, res) {
  res.json({
    message: "TravelBook API ",
    methode: req.method
  });
});

/********************************************
 *              ROADS :CARDS                *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

router.route('/cards/pagination/:page').get( (req, res, next) => {
  cardService.paginateCard(req,res,next);
});

/* Find the favorites */
router.route("/recent").get((req, res) => {
  cardService.findRecent(req, res);
});
/* Find all cards */
router.route("/allcards").get((req, res) => {
  cardService.findCard(req, res);
})
/* get all the cards with query (category/country) */
router.route("/cards")
  .get((req, res) => {
    cardService.findCardByQuery(req,res)
  })
  //@todo: remove this one in prod
  //this method is way to dangerous to stay alive, for test only
  .delete((req, res) => {
    Card.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.end("success");
      }
    });
  });
/* create a card */
router.route("/card").post((req, res) => {
  cardService.insertCard(req, res);
});
/* Find all the cards for an author */
router.route("/createdBy").get((req, res) => {
  cardService.getAuthor(req,res)
});

/*===========*
 * Instance  *
 *===========*/

router.route("/card/:id")
  .get((req, res) => {
    cardService.findOneCard(req,res);
  })
  //@todo: weird response
  .put((req, res) => {
    const doc = {
      title: req.body.author,
      body: req.body.body,
      stars: req.body.stars,
      updatedAt: Date.now()
    };
    Card.update({ _id: req.params.id }, doc, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
  })
  //@todo:seems ok
  .delete((req, res) => {
    Card.remove({ id: req.params.id }, function(err) {
      if (err) res.send(err);
      return res.status(200).send({message: "deleted"});
    });
  });


/********************************************
 *              ROADS : USERS               *
 ********************************************/

/*===========*
 *   Type    *
 *===========*/

/* fetch all the users */
router.route("/users").get(function(req, res) {
  userService.findAllUser(req,res)
});

router
  .post("/register", function(req, res) {
    userService.register(req,res);  
  })
  .post("/login", function(req, res) {
    userService.login(req,res);
  })
  .get("/account", function(req, res) {
    userService.account(req,res);
  });

/*===========*
 * Instance  *
 *===========*/

router.route("/users/:user_id")
  .get(function(req, res) {
    userService.findOneUser(req,res);
  })
  .put(function(req, res) {
    //userService.updateUser(req,res);
  })
  .delete(function(req, res) {
    //userService.deleteUser(req,res);
  });


/********************************************
 *           ROADS : GENERATORS             *
 ********************************************/
router.route("/generatorPDF").put( function(req, res){
  pdfService.generatePDF(req,res);
})

router.route("/generatorEPUB").put( function(req, res){
  epubService.generateEPUB(req,res);
})


/**
 * NO MORE USED BUT CAN BE USEFULL
 */
router.route("/uploads").post(function(req, res) {
  imageService.uploadImg(req, res);
});

module.exports = router;
