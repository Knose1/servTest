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

app.get(`/css/*.css`,function(request,response,next) {
    var options = {
    root: __dirname,
  };
  var fileName = "/views" + request.path
  response.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(fileName)
      console.error(err)
    } else {
      console.log('Sent:', fileName);
      response.status(200)
    }
  });
});

app.all(`/admin*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) ) {
    
    let randNum = String( Math.floor(Math.random()*10000000000000000) ) + String( Math.floor(Math.random()*10000000000000000) );
    app.locals.adminRandCode = randNum;
    response.cookie("adminRandCode",randNum);
    
    console.log("▬▬",app.locals.adminRandCode,"▬▬");
    response.send(`Successfuly connected <script>
      (async function(){
        await new Promise(function(resolve, reject) {
          setTimeout(resolve, 1000);
        });
        window.location.reload()
      })()
    </script>`);
    
  } else if (app.locals.adminRandCode == request.cookies.adminRandCode && request.cookies.adminRandCode != undefined) {
    
    response.render(`pages/admin/${request.path.slice("pages/admin/".length)}`, { randcode: app.locals.adminRandCode/*, eval: request.body*/}/*, function(err, html) {
      request.body
    }*/);
    
    
    
  } else {
    response.status(403).render(`error/`,{
      code:403,
      error: "Access denied",
      reason: "You must sign in as an admin"
    });
  }
  //next();
});
//404 Handeler
app.all("*", function(request,response) {
  response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
