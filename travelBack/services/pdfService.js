let fs = require('fs');
let path = require('path');
let shell = require('shelljs');
let os = require('os');

function generatePDF(req,res){
    let cards = req.body;
    let pages = [];

    cards.forEach( element => {
        pages.push('HTML/'+element+'.xhtml');
    })

    shell.exec(
        'wkhtmltopdf ' + pages.join(" ") + " out.pdf" ,
        async function(code, stdout, stderr) {
            res.type('text/html');
            await res.download(path.resolve('./out.pdf'));
        })
    
}

module.exports = {
    generatePDF: generatePDF,
};
  