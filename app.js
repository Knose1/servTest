const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 0000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/

app.use(function(req, res, next){
  res.locals.user = "test";
  res.locals.authenticated = true;
  next();
});

//404 Handeler
app.all("*", function(request,response) {
  response.status(404).send('Sorry, we cannot find that!');
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
