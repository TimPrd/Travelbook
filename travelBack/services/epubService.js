let shell = require('shelljs');
let shortid = require('shortid');
let fs = require('fs');
let os = require('os');

function generateEPUB(req, res){
    console.log(req.body);
    let id = shortid.generate();
    let cards = req.body
    let path = "epub_tmp/tmp_"+id;
    const pathR = require('path');

    shell.exec(
        'bash ./utils/scripts/epubation_1.sh '+id,
        async function(code, stdout, stderr) {
            var fs = require('fs');
            console.log("1- OPF ET TOC")
            var p =  new Promise(function(resolve, reject) {
                resolve(gen_opf_toc(cards, path));
            })
            
            p.then( async () => {
                console.log("4 - THEN ")
                console.log("5 - COPY ")
                await cards.forEach(async function(element) {
                    console.log(element + " a copier")
                    await fs.createReadStream('HTML/'+element+'.xhtml').pipe(fs.createWriteStream(path+'/OEBPS/Text/'+element+'.xhtml'));
                });
                let dire = pathR.resolve('epub_tmp/tmp_'+id)
                shell.exec('cd "epub_tmp/tmp_'+id+'"', () => {})
                console.log("6 - SHELL ")
                let cmd;

                
                (os.platform() === 'win32') ?
                cmd = 'cd "epub_tmp/tmp_'+id+'" && 7z a "book_'+id+'.epub" "mimetype" && 7z a "book_'+id+'.epub" *' :
                cmd = 'cd epub_tmp/tmp_'+id+' ; zip -q0X "book_'+id+'.epub" mimetype ; zip -qXr9D "book_'+id+'.epub" * -x "*.svn*" -x "*~" -x "*.hg*" -x "*.swp" -x "*.DS_Store"' 
                
                shell.exec(  cmd,
                    async function(code, stdout, stderr) {
                        console.log(stdout)
                        console.log(stderr)
                        console.log("7 - DONE ")
                        res.type('zip/epub');
                        await res.download(pathR.resolve('epub_tmp/tmp_'+id+'/book_'+id+'.epub'));

                    }
                );
            });
           
           
        }
    );
}

async function gen_opf_toc(cards, path){
    
    var streamOPF = fs.createWriteStream(path+"/OEBPS/content.opf");
    var p2 =  new Promise(function(resolve, reject) {
        console.log("2 - opf ")
        resolve(streamOPF.once('open', function(fd) {
            streamOPF.write('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n')
            streamOPF.write('<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">\n')
            streamOPF.write('<metadata xmlns:opf="http://www.idpf.org/2007/opf" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n')
            streamOPF.write('<dc:identifier id="bookid" opf:scheme="ISBN">urn:isbn:[ISBN]</dc:identifier>\n')
            streamOPF.write("<dc:title>Title</dc:title>\n")
            streamOPF.write('<dc:date opf:event="publication">2012-01-01</dc:date>\n')
            streamOPF.write("<dc:language>en</dc:language>\n")
            streamOPF.write('<meta name="cover" content="[COVER_NAME].jpg" />\n')
            streamOPF.write('<dc:identifier opf:scheme="UUID">urn:uuid:[UUID]</dc:identifier>\n')
            streamOPF.write("</metadata>\n")
            streamOPF.write("<manifest>\n");
            streamOPF.write('<item href="Images/cover.jpg" id="cover.jpg" media-type="image/jpeg" />\n');
            streamOPF.write('<item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml" />\n');
            streamOPF.write('<item href="Styles/style.css" id="css" media-type="text/css" />\n');
            for(let x=0; x<cards.length; x++)
            {
                streamOPF.write('<item href="Text/'+cards[x]+'.xhtml" id="'+cards[x]+'" media-type="application/xhtml+xml" />\n');
            }
            streamOPF.write("</manifest>\n");
            streamOPF.write('<spine toc="ncx">\n')
            for(let count=0; count<cards.length; count++)
            {
                streamOPF.write('<itemref idref="'+cards[count]+'" />\n')
            }
            streamOPF.write("</spine>\n")
            streamOPF.write("</package>\n")
            console.log("2BIS - opf ")
            streamOPF.end()
        }));
    })

    p2.then(()  => {console.log("2BISOK")})

   

    var stream = fs.createWriteStream(path+"/OEBPS/toc.ncx");
    var p3 =  new Promise(function(resolve, reject) {

    console.log("3 - ncx ")
    resolve( stream.once('open', async function(fd) {
        stream.write('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n')
        stream.write('<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n')
        stream.write('<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n')
        stream.write("<head>\n")
        stream.write('<meta name="dtb:uid" content="urn:isbn:[ISBN]"/>\n')
        stream.write('<meta name="dtb:depth" content="1"/>\n')
        stream.write('<meta name="dtb:totalPageCount" content="0"/>\n')
        stream.write('<meta name="dtb:maxPageNumber" content="0"/>\n')
        stream.write("</head>\n")
        stream.write("<docTitle>\n")
        stream.write('<text>"TravelBook"</text>\n')
        stream.write("</docTitle>\n")
        stream.write("<navMap>\n")
        for (let i= 0; i<cards.length; i++){
                stream.write('<navPoint id="'+i+'" playOrder="'+(i+1)+'">\n')
                stream.write('<navLabel><text>'+'Fiche '+i+'</text></navLabel>\n')
                stream.write('<content src="Text/'+cards[i]+'.xhtml"/>\n')
                stream.write('</navPoint>\n')
        }
        stream.write('</navMap>\n')
        stream.write('</ncx>\n')
        console.log("3BIS - ncx written ")
        stream.end()
    }));
    })
    p3.then(()  => {console.log("3BISOK")})
}

module.exports = {
    generateEPUB: generateEPUB,
    gen_opf_toc:gen_opf_toc
};
