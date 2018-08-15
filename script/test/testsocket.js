exports.execute = () => {
  app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });

  app.get('/', function(req, res, next){
    console.log('get route', req.testing);
    res.end();
  });

  app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    ws.emit('message', "test")
    console.log('socket', req.testing);
  });

}
