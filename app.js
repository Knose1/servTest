const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/

app.get(`/admin/*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) ) {
    app.locals.adminIp = request.ip;
    console.log("▬▬",app.locals.adminIp,"▬▬");
    response.send("Successfuly connected");
    
  } else if (app.locals.adminIp == request.ip){
    response.render(`pages/${request.path.slice("pages/admin/".length)}`);
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
