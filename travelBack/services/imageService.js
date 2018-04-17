var multer = require("multer");
var path = require("path");
var fs = require("fs");
var sightengine = require("sightengine")(
  "{1503840230}",
  "{K3w6tbnavBVL3M5azfnm}"
);


var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single('image');


function uploadImg(req,res){
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading 
      return res.status(503).send({message:'img not created'});
    }
    return res.status(200).send({message:'img created'});
    // Everything went fine 
  })
}
module.exports = {
  uploadImg: uploadImg,
};
