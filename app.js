const express = require('express');
var app = express();

app.set('port', (process.env.PORT || 0000));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

//Test
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});
// \Test





app.get('/view/*', function(request,response) {
  response.render(`pages/${request.path.slice("/view/".length)}`);
});

app.get('/files/*', function(request,response,next) {
  
  const filePart = request.path.replace(/\//g,"/▲").replace(/:/g,":▼").split(/[/:]/g).map(m => {

    if (m.indexOf("▲") == 0)
      return {content: m.replace(/▲/g,""), type:"/"};
    else if (m.indexOf("▼") == 0)
      return {content: m.replace(/▼/g,""), type:":"};

  }).filter(f => f != undefined) //return an array
  filePart.shift();
  
  console.log(filePart)
  
  let filtered = filePart.filter(f => f.type == "/")
  let popped = filtered.pop()
  
  var options = {
    root: __dirname + filtered.map(m => m.type + m.content).join(""),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = popped.content;
  response.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});


//404 Handeler
app.all("*", function(request,response) {
  response.status(404).send('Sorry, we cannot find that!');
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
