exports.execute = () => {
  app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });

  app.get('/*', function(req, res, next){
    console.log('get route', req.testing);
    res.end();
  });

  app.ws('/*', function(ws, req) {
    console.log(ws.getWss().clients)
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

}
