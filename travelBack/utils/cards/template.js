const templateHTML =
  '<!DOCTYPE html> <html> <head> <title>Fiches voyages</title> <meta charset="UTF-8" /> <link rel="stylesheet" type="text/css" href="CSS2.css" /> </head> <body> <div class="container"> <img src="{{cover_picture}}" alt="Notebook" style="width:750px;"> <div class="content"> <h1 style="text-align:center">{{adress.city}}</h1> <!--ville/pays--> <!-- nom du lieux--> <p></p> <p style="text-align:center">{{title}}</p> <p style="color:#7DB7FF">{{date}}</p> <!--date--> </div> </div> <div class="barre"> <p> <img src="" style="width:12%"> </p> <!--nom d utilisateur--> <p>{{adress}} - lat : {{lat}} | long : {{long}}</p> <img src="location-pointer.svg" style="width:3%"> <!--adresse--> </div> <br/> <div id="conteneur"> <div id="colonne1"> <p> <img id="img2" src="{{picture1}}">{{para1}}</p> </div> <div id="colonne2"> <p> {{para2}} <img id="img3" src="{{picture2}}"> </p> </div> <div id="bas"> </div> </body> </html> ';

module.exports = {
  templateHTML: templateHTML
};
