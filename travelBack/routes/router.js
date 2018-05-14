var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Card = require("../models/card");

var jwt = require("jsonwebtoken");
var config = require("../config");
var bcrypt = require("bcryptjs");

const cardService = require("./../services/cardService");
const imageService = require("./../services/imageService");
const epubService = require("./../services/epubService");
//ROUTES :

//HOME
router.route("/").all(function(req, res) {
  res.json({
    message: "TravelBook API ",
    methode: req.method
  });
});

//CARDS

router.route("/favorites").get((req, res) => {
  cardService.findFavorites(req, res);
});

router
  .route("/allcards")
  .get((req, res) => {
    cardService.findCard(req, res);
  })

//@todo: in developpement
router
  .route("/cards")
  .get((req, res) => {
    console.log(req.query)
    let query = {}

    if (req.query.country) query.country = req.query.country;
    if (req.query.category) query.category = req.query.category;

    Card.find(query, function (err, results) {
      if (err) return handleError(err);
      console.log(results)
      if (!results) return res.send('Nothing found').status('500');
      return res.json(results).status(302);
    });
  })

  /*

     */


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

router.route("/card").post((req, res) => {
  cardService.insertCard(req, res);
});

router
  .route("/card/:id")

  .get((req, res) => {
    Card.findById(req.params.id, function(err, cards) {
      if (err) res.send("err");
      res.json(cards);
    });
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
    Card.remove({ _id: req.params.id }, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.end("success");
      }
    });
  });

//@todo: refactor all the code below like card
//USERS
router.route("/users").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router
  .post("/register", function(req, res) {
    //Salted pass
    console.log(req.body)
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
        if (err)
          return res
            .status(500)
            .send("There was a problem registering the user.");
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        //Send
        res.status(200).send({ auth: true, token: token });
      }
    );
  })
  .post("/login", function(req, res) {
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
  })

  .get("/account", function(req, res) {
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
  });

//@todo: put & delete user
//One User
router
  .route("/users/:user_id")
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  })
  .put(function(req, res) {
    res.json({
      message:
        "Vous souhaitez modifier les informations du user n°" +
        req.params.user_id
    });
  })
  .delete(function(req, res) {
    res.json({
      message: "Vous souhaitez supprimer l'user n°" + req.params.user_id
    });
  });

router.route("/uploads").post(function(req, res) {
  imageService.uploadImg(req, res);
});

router.route("/generatorPDF")
.put( function(req, res){
  var fs = require('fs');
  var cards = req.body

  if (cards.length === 1 )
  {
    var pdf = require('html-pdf');
    var html1 = fs.readFileSync('HTML/'+cards[0]+'.xhtml', 'utf8');
    var options = { format: 'Letter' };
   
    pdf.create(html1, options).toFile('./foo.pdf', function(err, resu) {
      if (err) return console.log(err);
      var path = require('path');
      res.type('text/html')
      res.download(path.resolve('./foo.pdf'));
    });
   
  }
  else{
    //apt-get install pdftk
    const PDFMerge = require('pdf-merge');
    PDFMerge(cards, {output: `./3.pdf`})
    .then((buffer) => {});
  }
})

router.route("/generator")
.put( function(req, res){
    console.log(req.body);
    var shell = require('shelljs');
    var shortid = require('shortid');

    var id = shortid.generate();
    var cards = req.body
    let path = "epub_tmp/tmp_"+id;
    shell.exec(
        'bash ./utils/scripts/epubation_1.sh '+id,
        async function(code, stdout, stderr) {
            var fs = require('fs');
            await cards.forEach(function(element) {
                console.log(element + " a copier")
                fs.createReadStream('HTML/'+element+'.xhtml').pipe(fs.createWriteStream(path+'/OEBPS/Text/'+element+'.xhtml'));
            });
            await console.log("opf et toc")
            await epubService.gen_opf_toc(cards, path);
            await shell.exec(
                'cd epub_tmp/tmp_'+id+' ; zip -q0X "book_'+id+'.epub" mimetype ; zip -qXr9D "book_'+id+'.epub" * -x "*.svn*" -x "*~" -x "*.hg*" -x "*.swp" -x "*.DS_Store"',
                function(code, stdout, stderr) {
                    console.log("GO EPUB");
                }
            );
        }
    );



    // todo : TOUT FAIRE EN NODEJS AVEC FS
    // On choppe toutes les données du front dont les ids
    // Une fois qu'on a les id, on crée un dossier tmp_[idUser]
    // On copie depuis /book le dossier OEBPS, META-INF etc.. (sauf book.epub) dans /tmp
    // On copie depuis /HTML les fichiers avec les ids correspondant dans /tmp/[idUsr]/OEBPS/text
    // On crée les .opf et le .toc dans tmp/[idUser]/OEBPS
    // On exec le publish en bash
})
module.exports = router;
