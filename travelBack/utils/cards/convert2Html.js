function convert(data) {
  const fs = require("fs");
  const Handlebars = require("handlebars");

  const {templateHTML} = require('./template');
  const template = Handlebars.compile(templateHTML);

  const contents = template(data);

  fs.writeFile("./HTML/"+data.id+".xhtml", contents, err => {
    if (err) {
      return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }

    console.log("Saved template!");
  });
}

module.exports = {
  convert: convert
};
