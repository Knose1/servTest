require("./config_var.js").load()
require("./app/app_config.js").execute()
require("./app/files.js").execute()

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/



app.all(`/admin*`,function(request,response,next) {
  if (request.query.admin == encodeURI(process.env.ADMINPASS) && request.query.mail == encodeURI(process.env.ADMINMAIL) && !Boolean(app.locals.adminRandCode)) {
    
    let randNum = String( Math.floor(Math.random()*10000000000000000) ) + String( Math.floor(Math.random()*10000000000000000) );
    app.locals.adminRandCode = randNum;
    response.cookie("adminRandCode",randNum);
    
    console.log("▬▬",app.locals.adminRandCode,"▬▬");
    response.send(`Successfuly connected <script>
      (async function(){
        await new Promise(function(resolve, reject) {
          setTimeout(resolve, 2500);
        });

        window.location.replace("https://${request.hostname + request.path}")
      })()
    </script>`);
    
  } else if (app.locals.adminRandCode == request.cookies.adminRandCode && request.cookies.adminRandCode != undefined) {
    
    response.render(`pages/admin/${request.path.slice("pages/admin/".length)}`, { randcode: app.locals.adminRandCode/*, eval: request.body*/}, function(err, html) {
      //request.body
      if (err) {
        response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
      } else {
        response.send(html);
      }
    });
    
    
    
    
  } else {
    response.status(403).render(`error/`,{
      code:403,
      error: "Access denied",
      reason: "You must sign in as an admin"
    });
  }
  //next();
});

app.get("/owo",function(request,response) {
  response.render(`pages/owo}`, {} , function(err, html) {
      //request.body
      if (err) {
        response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
      } else {
        response.send(html);
      }
    });
});

//404 Handeler
app.all("*", function(request,response) {
  response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`)
});
