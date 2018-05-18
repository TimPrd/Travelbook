const templateHTML = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title class="main_title">{{title}}</title><link rel="stylesheet" type="text/css" href="../Styles/style.css" /></head><body><div id="{{id}}" xml:lang="en-US"><img class="cover_pict" src="{{cover_picture}}" alt="Notebook" style="width:750px;"/><div class="content"><h1 style="text-align:center">{{adress.city}}</h1><p></p><p style="text-align:center">{{title}}</p><p style="color:#7DB7FF">{{date}}</p></div><div class="barre"><p>{{adress}} - lat : {{lat}} | long : {{long}}</p> </div><br/><div id="content"><div id="colonne1"><p> {{para1}} </p><img id="img1" src="{{picture1}}"/></div><div id="colonne2"><p> {{para2}} </p><img id="img2" src="{{picture2}}"/> </div></div></div></body></html>';

module.exports = {
  templateHTML: templateHTML
};
