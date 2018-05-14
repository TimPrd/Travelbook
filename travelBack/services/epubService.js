async function gen_opf_toc(cards, path){
    var builder = require('xmlbuilder');

    var fs = require('fs');

    var stream = fs.createWriteStream(path+"/OEBPS/toc.ncx");
    await stream.once('open', async function(fd) {
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
        await stream.end();
    });

    var streamOPF = fs.createWriteStream(path+"/OEBPS/content.opf");
    await streamOPF.once('open', async function(fd) {
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

        await stream.end();
    });

}

module.exports = {
  gen_opf_toc: gen_opf_toc,
};
