var Card = require('../models/card');


/** FIND **/
function findCard(req,res) {
  Card.find(function (err, cards) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(cards)
  });
}

/** CREATE **/
function insertCard(req,res) {
  new Promise(
    resolve => {
      //fetching the place (from adresse to {lat:, long:, country..}
      resolve(this.getLatLong(req).then());
    }).then(
    addressResolved => {
      //creating the card with the info + the resolved address
      createCard(req, res, addressResolved)
    }).catch(
    // Promise rejected
    () => {
      console.log("promesse rompue");
    });
}

async function getLatLong(req) {
  var NodeGeocoder = require('node-geocoder');
  var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyAcxsdfkb3T-kMiYtf9pH55q7XK_sWFMTc', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };
  var geocoder = NodeGeocoder(options);
  var result = await resolveLocation(req, geocoder).then();
  console.log('res : ', result[0].streetNumber);
  return result[0];
}

function resolveLocation(req, geocoder) {
  return new Promise(resolve => {
    geocoder.geocode(req.body.adress)
      .then(function (res) {
        resolve(res)
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

function createCard(req, res, adresse) {
  Card.create({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    adress: req.body.adress,
    lat: adresse.latitude,
    long: adresse.longitude,
    //pictures: [String],

  }, function (err, cards) {
    console.log('card - add ', cards);
    res.status(200).send({cards: cards});

  });
}



function findFavorites(req,res){
  Card.find(function (err, cards) {
    if (err) {res.send(err);}
    res.status(200).json(cards)
  }).limit(6).sort({stars: -1})
}

module.exports = {
  getLatLong: getLatLong,
  insertCard: insertCard,
  findCard:findCard,
  findFavorites: findFavorites
};
