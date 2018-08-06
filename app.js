const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 1000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/

app.all(`/admin/*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) ) {
    app.locals.adminRandCode = ;
    console.log("▬▬",app.locals.adminIp,"▬▬");
    response.send("Successfuly connected");
    
  } else if (app.locals.adminRandCode == request.ip){
    response.render(`pages/${request.path.slice("pages/admin/".length)}`, { ip: app.locals.adminIp, eval: request.body}, function(err, html) {
      request.body
    });
    
    
    
  } else {
    response.status(403).send({error: "Accès refusé"});
  }
  //next();
});
//404 Handeler
app.all("*", function(request,response) {
  response.status(404).send({error: "404 not found", path: request.path});
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
