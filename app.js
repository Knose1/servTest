const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser')
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

app.set('port', (process.env.PORT || 1000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/

app.all(`/admin/*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) ) {
    
    let randNum = new TextEncoder().encode(String(Math.floor(Math.random()*10000000000000000)) + String(Math.floor(Math.random()*10000000000000000))).join("");
    app.locals.adminRandCode = randNum;
    response.cookie("adminRandCode",randNum);
    
    console.log("▬▬",app.locals.adminRandCode,"▬▬");
    response.send("Successfuly connected");
    
  } else if (app.locals.adminRandCode && request.cookies) {
    if (app.locals.adminRandCode == request.cookies.adminRandCode && request.cookies.adminRandCode != undefined) {
      response.render(`pages/admin/${request.path.slice("pages/admin/".length)}`, { randcode: app.locals.adminRandCode/*, eval: request.body*/}/*, function(err, html) {
        request.body
      }*/);
    }
    
    
    
  } else {
    response.status(403).send({
      error: "Accès refusé",
      cookies: request.cookies,
      cookies_string: String(request.cookies),
      
      signedCookies: request.signedCookies,
      signedCookies: String(request.signedCookies)
    });
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
