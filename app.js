const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/

app.get(`/admin/eval`,function(request,response) {
  
});

app.get(`/admin/*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) ) {
      app.locals.adminIp = request.ip
  } else {
      response.sendStatus(403);
  }
  next()
});
//404 Handeler
app.all("*", function(request,response) {
  //response.status(403).send({error: "Accès refusé"})
  response.status(404).send('Sorry, we cannot find that!');
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
