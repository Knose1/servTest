const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 0000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

//404 Handeler
app.all("*", function(request,response) {
  response.status(404).send('Sorry, we cannot find that!');
});


app.get('/view/*', function(request,response) {
  response.render(`pages/${request.path}`);
});

app.get('/files/*', function(request,response,next) {
  var options = {
    root: __dirname /*+ '/public/'*/,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = request.path;
  response.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

//Test
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});
// \Test



app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
