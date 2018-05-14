let fs = require('fs');
let path = require('path');

function generatePDF(req,res){
    let cards = req.body
    if (cards.length === 1 )
    {
        let pdf = require('html-pdf');
        let html1 = fs.readFileSync('HTML/'+cards[0]+'.xhtml', 'utf8');
        let options = { format: 'Letter' };
    
        pdf.create(html1, options).toFile('./foo.pdf', function(err, resu) {
            if (err) return console.log(err);
            res.type('text/html');
            res.download(path.resolve('./foo.pdf'));
        });
    }
    else{
        //apt-get install pdftk
        const PDFMerge = require('pdf-merge');
        PDFMerge(cards, {output: `./3.pdf`})
        .then((buffer) => {});
    }
}

module.exports = {
    generatePDF: generatePDF,
};
  