require("./config_var.js").load()
require("./app/app_config.js").execute()
require("./app/files.js").execute()

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
  
  if (request.cookies.adminRandCode1 == app.locals.adminRandCode1 && request.cookies.adminRandCode2 == app.locals.adminRandCode2 && request.cookies.adminRandCode3 == app.locals.adminRandCode3 && request.cookies.adminRandCode4 == app.locals.adminRandCode4 && !app.locals.adminConnected) {
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
    
  } else if (app.locals.adminRandCode == request.cookies.adminRandCode ) {
    
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

app.get("/owo.mp4",function(request,response) {
  response.render(`pages/owo`, {} , function(err, html) {
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
        UriCodes += \`a${i}=\${randNum}\`;
      `)
    }
    console.log("▬▬",UriCodes.slice(0,-1),"▬▬")
  app.locals.adminConnected = false
});
