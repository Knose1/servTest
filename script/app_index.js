require("./config_var.js").load()
require("./app/app_config.js").execute()
require("./app/files.js").execute()
require("./test/testsocket.js").execute()

/*app.get('/user/connect', function(request, response){
  response.render(`pages/login`);
});*/



app.all(`/admin*`,function(request,response,next) {
  if (!Boolean(app.locals.adminRandCode1) || !Boolean(app.locals.adminRandCode2) || !Boolean(app.locals.adminRandCode3) || !Boolean(app.locals.adminRandCode4)) {
    var strCodes = [NaN];
    let i = 0;
    while (i < 4) {
      i += 1;
      eval(`
        let randNum = String( Math.floor(Math.random()*10000000000000000) ) + String( Math.floor(Math.random()*10000000000000000) );
        app.locals.adminRandCode${i} = randNum;
        strCodes.push(randNum);
        console.log("▬▬",randNum,"▬▬");
      `)
    }
    
  } else {
    var strCodes = [NaN,app.locals.adminRandCode1,app.locals.adminRandCode2,app.locals.adminRandCode3,app.locals.adminRandCode4]
  }
  
  if (!app.locals.adminConnected) {
    strCodes.forEach(code => {
      console.log("▬▬",code,"▬▬");
    })
  }
  
  if (request.query.a1 == app.locals.adminRandCode1 && request.query.a2 == app.locals.adminRandCode2 && request.query.a3 == app.locals.adminRandCode3 && request.query.a4 == app.locals.adminRandCode4 && !app.locals.adminConnected) {
    let i = 0;
    while (i < 4) {
      i += 1
      eval(`response.cookie("adminRandCode${i}",strCodes[${i}])`);
    }
    app.locals.adminConnected = true
    response.send(`Successfuly connected <script>
      (async function(){
        await new Promise(function(resolve, reject) {
          setTimeout(resolve, 2500);
        });

        window.location.replace("https://${request.hostname + request.path}")
      })()
    </script>`);
    
  } else if (request.cookies.adminRandCode1 == app.locals.adminRandCode1 && request.cookies.adminRandCode2 == app.locals.adminRandCode2 && request.cookies.adminRandCode3 == app.locals.adminRandCode3 && request.cookies.adminRandCode4 == app.locals.adminRandCode4) {
    
    //Si on est sur le /admin mais que le stropole n'est pas lancé ou que l'on est pas sur /admin
    if (!( (request.query.openStropole == "true" || app.locals.stropole) && request.originalUrl == "/admin" )) {
      response.render(`pages/admin/${request.path.slice("pages/admin/".length)}`, { code1: app.locals.adminRandCode1,code2: app.locals.adminRandCode2,code3: app.locals.adminRandCode3,code4: app.locals.adminRandCode4}, function(err, html) {
        //request.body
        if (err) {
          console.error(err)
          response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
        } else {
          response.send(html);
        }
      });
    } else if ( (request.query.openStropole == "true" || app.locals.stropole) && request.originalUrl == "/admin" ) {
      if (!app.locals.stropole)
        app.locals.stropole = [];
      
      response.render(`pages/admin`, { code1: app.locals.adminRandCode1,code2: app.locals.adminRandCode2,code3: app.locals.adminRandCode3,code4: app.locals.adminRandCode4, stropole: app.locals.stropole}, function(err, html) {
        //request.body
        if (err) {
          console.error(err)
          response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
        } else {
          response.send(html);
        }
      });
    }
    
    
    
    
  } else {
    response.status(403).render(`error/`,{
      code:403,
      error: "Access denied",
      reason: "You must sign in as an admin"
    });
  }
  //next();
});

//404 Handeler
app.all("*", function(request,response) {
  response.status(404).render(`error/`,{code:404, error: "404 not found", path: request.path});
  response.status(500).render(`error/`);
});

app.listen(app.get('port'), function() {
  console.log(`App is running on port ${app.get('port')}`);
  var strCodes = [NaN];
  var UriCodes = "?";
  let i = 0;
    while (i < 4) {
      i += 1;
      eval(`
        let randNum = String( Math.floor(Math.random()*10000000000000000) ) + String( Math.floor(Math.random()*10000000000000000) );
        app.locals.adminRandCode${i} = randNum;
        strCodes.push(randNum);
        console.log("▬▬",randNum,"▬▬");
        UriCodes += \`a${i}=\${randNum}&\`;
      `)
    }
    console.log("▬▬",UriCodes.slice(0,-1),"▬▬")
  app.locals.adminConnected = false
});
