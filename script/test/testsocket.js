exports.execute = () => {
  app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });

  app.get('/testsocket', function(req, res, next){
    console.log('get route', req.testing);
    res.end();
  });

  app.ws('/testsocket', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

}
