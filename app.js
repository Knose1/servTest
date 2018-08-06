const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 0000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(request,response) {
  response.send('pages');
});

app.all('/secret', function (request,response, next) {
  response.send('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get(/./, function(request,response) {
  response.status(404).send('Sorry, we cannot find that!');
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
