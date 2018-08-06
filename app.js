const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 0000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(request,response) {
  response.render('apps/index');
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
