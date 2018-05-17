let fs = require('fs');
let path = require('path');
let shell = require('shelljs');
let os = require('os');
let shortid = require('shortid');

function generatePDF(req,res){
    let cards = req.body;
    let pages = [];
    let id = shortid.generate();

    cards.forEach( element => {
        pages.push('"'+path.resolve('HTML/'+element+'.xhtml')+'"');
    })

    shell.exec(
        'wkhtmltopdf ' + pages.join(" ") + ' "PDF/'+id+'.pdf" ' ,
        async function(code, stdout, stderr) {
            res.type('text/pdf');
            await res.download(path.resolve('PDF/'+id+'.pdf'));
        })
    
}

module.exports = {
    generatePDF: generatePDF,
};
  