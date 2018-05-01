function convert(data) {
  const fs = require("fs");
  const Handlebars = require("handlebars");

  const {templateHTML} = require('./template');
  const template = Handlebars.compile(templateHTML);

  const contents = template(data);

  fs.writeFile(data.id+".html", contents, err => {
    if (err) {
      return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }

    console.log("Saved template!");
  });
  console.log("coucou " + data.title);
}

module.exports = {
  convert: convert
};
