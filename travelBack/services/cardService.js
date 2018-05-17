var Card = require("../models/card");

/** FIND **/
function findCard(req, res) {
  Card.find(function(err, cards) {
    if(err) res.status(500).send(err);
    if(cards) return res.status(200).json(cards);
    else return res.status(404).send({message:'No card found'});
  });
}

function findOneCard(req, res){
  Card.findOne( {id: req.params.id}, function(err, card) {
    if(err) res.status(500).send(err);
    if(card) return res.status(200).json(card);
    else return res.status(404).send({message:'No card found'});
  });
}


function paginateCard(req,res,next){
  var perPage = 4
  var page = req.params.page || 1

  Card
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, cards) {
        Card.count().exec( function(err, count) {
            if (err) return next(err)
            res.status(200).send({
                cards: cards,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
    })
}
/** CREATE **/
function insertCard(req, res) {
    new Promise(resolve => {
      //fetching the place (from adresse to {lat:, long:, country..}
      resolve(this.getLatLong(req,res).then());
    })
      .then(addressResolved => {
        //creating the card with the info + the resolved address
        createCard(req, res, addressResolved);
      })
      .catch(
        // Promise rejected
        () => {
          res.status(500);
          res.send('Something went wrong with the geocoding');
        }
      );

}

async function getLatLong(req,res) {
  var NodeGeocoder = require("node-geocoder");
  var options = {
    provider: "google",
    httpAdapter: "https",
    language: "fr",
    apiKey: "AIzaSyCbiwXh12LHMp7s094UkveRoEUK1kC0IKc",
    formatter: null
  };
  var geocoder = NodeGeocoder(options);
  var result = await resolveLocation(req, res, geocoder).then();
  return result[0];
}

function resolveLocation(req, res, geocoder) {
  return new Promise(resolve => {
      geocoder
        .geocode(req.body.adress)
        .then(function(res) {
          resolve(res);
        })
        .catch(function(err) {
          res.status(400);
        });
  });
}

function createCard(req, res, adresse) {
  var shortid = require("shortid");
  let data = {
    id: req.body.id || shortid.generate(),
    title: req.body.title,
    author: req.body.author,
    para1: req.body.para1,
    para2: req.body.para2,
    adress: req.body.adress,
    lat: adresse.latitude,
    long: adresse.longitude,
    category: req.body.category,
    country: adresse.country,
    cover_picture: req.body.pictures[0].dataURL,
    picture1: req.body.pictures[1].dataURL,
    picture2: req.body.pictures[2].dataURL
  };
  Card.create(data, function(err, card) {
    res.status(201).send({ card: card });
  });
  const converter2HTML = require("./../utils/cards/convert2Html");
  converter2HTML.convert(data);
}

function findRecent(req, res) {
  Card.find(function(err, cards) {
    if (err)  res.send(err);
    if (cards) res.status(200).json(cards);
    else res.status(404).send({message:'No card found'});

  })
    .limit(6)
    .sort({ date: -1 });
}

function findCardByQuery(req, res) {
  let query = {}
  if (req.query.country) query.country = req.query.country;
  if (req.query.category) query.category = req.query.category;

  Card.find(query, function (err, results) {
    if (err) return handleError(err);
    if (!results) return res.send('Nothing found').status('404');
    return res.json(results).status(200);
  });
}

function getAuthor(req, res){
  Card.find( { author: req.query.username }, function (err, results) {
    if (results) res.json(results).status(200);
    else res.send('No author found').status('404');
  });
}
module.exports = {
  getLatLong: getLatLong,
  insertCard: insertCard,
  findCard: findCard,
  findRecent: findRecent,
  findCardByQuery:findCardByQuery,
  getAuthor:getAuthor,
  findOneCard:findOneCard,
  paginateCard:paginateCard
};
