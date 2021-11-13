var express = require('express');
var router = express.Router();

var loki = require('lokijs');

var db = new loki('data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  var games = db.getCollection("games");
  if (games === null) {
    games = db.addCollection("games");
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// router.get("/toSurvay",function(req,res){
//   res.render('survay',{});
// });

router.post('/form', function (req, res) {

  var response = {
    header: req.headers,
    body: req.body
  };

  req.body.age = parseInt(req.body.age);
  db.getCollection("games").insert(req.body);

  res.render("chart");

});

// get the data
router.get("/chart" , function(req,res) {
  
  var result = db.getCollection("games").find();
  var pc1=0, Ps4=0;
  var lol=0,csgo=0,ddt=0,ow=0,dnf=0,bbt=0;
  var zd=0,rdr=0,dbc=0,dmc=0,spm=0,ssdt=0;
  for(i=0;i<result.length;i++){
    if(result[i].platform === "PC"){
      pc1++;
    switch(result[i].Games){
      case "League of legend": lol++;break;
      case "CSGO" : csgo++;break;
      case "ddt" : ddt++;break;
      case "Overwatch" : ow++;break;
      case "DNF" : dnf++;break;
      case "Battle Block Theater" : bbt++;break;

    }
    }else if(result[i].platform === "PS4"){
      Ps4++;
      switch(result[i].Games){
        case "Zero down": zd++;break;
        case "Red Dead Redemption" : rdr++;break;
        case "Detroit Becomes Human" : dbc++;break;
        case "Devil May Cry 5" : dmc++;break;
        case "Spiderman Marvel" : spm++;break;
        case "Sekiro：Shadows Die Twice" : ssdt++;break;
        
      }
    }
  }
  var as=0,af=0,na=0,eu=0,sa=0,o=0;
  for(i=0;i<result.length;i++){
    switch(result[i].Region) {
      case "Asia":as++; break;
      case "Europe":eu++; break;
      case "North America":na++; break;
      case "South America":sa++; break;
      case "Africa":af++; break;
      case "Oceania":o++; break;
    }

  }

  

  console.log("ps4:"+Ps4);
  console.log("pc:"+pc1);

  console.log("lol:"+lol);
  console.log("csgo:"+csgo);
  console.log("ddt:"+ddt);
  console.log("ow:"+ow);
  console.log("dnf:"+dnf);
  console.log("bbt:"+bbt);

  console.log("as:"+as);
  console.log("eu:"+eu);
  console.log("na:"+na);
  console.log("sa:"+sa);
  console.log("af:"+af);
  console.log("o:"+o);
  var totalNumRecords = db.getCollection("games").count();

  console.log(totalNumRecords)
  res.render("chart",{ pc1: pc1,Ps4:Ps4,lol:lol,csgo:csgo,ddt:ddt,ow:ow,dnf:dnf,bbt:bbt,zd:zd,rdr:rdr,dbc:dbc,dmc:dmc,
    spm:spm,ssdt:ssdt,as:as,af:af,na:na,eu:eu,sa:sa,o:o
  });

});

router.post("/refresh",function(req,res) {
  
  var response = {
    header: req.headers,
    body: req.body
  };

  req.body.age = parseInt(req.body.age);
  // let result=
  db.getCollection("games").insert(req.body);

  // // res.json(response);

  return res.redirect("/chart");

  // res.status(201).json(result);



});

router.get('/delete/:id', function (req, res) {

  // let result = db.getCollection("games").findOne({ $loki: parseInt(req.params.id) });

  // if (!result) return res.status(404).send('Unable to find the requested resource!');

  // if (req.get('Accept').indexOf('html') === -1) {
  //   return res.status(204).send();	    // for ajax request
  // } else {
  //   return res.redirect('/chart');	// for normal HTML request
  // }

  db.getCollection("games").remove({ $loki: parseInt(req.params.id) });

  res.send("Booking deleted.");

});

