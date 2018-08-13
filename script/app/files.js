exports.execute = () => {
    //Handle CSS
    app.get(`/css/*.css`,function(request,response,next) {
        var options = {
            root: __root,
        };
        var fileName = "/views" + request.path
        response.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(fileName)
                console.error(err)
                response.status(404)
            } else {
                console.log('Sent:', fileName);
                response.status(200)
            }
        });
    });
    
    //Handle js
    app.get(`/js/*.js`,function(request,response,next) {
        var options = {
            root: __root,
        };
        var fileName = "/views" + request.path
        response.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(fileName)
                console.error(err)
                response.status(404)
            } else {
                console.log('Sent:', fileName);
                response.status(200)
            }
        });
    });
    
    //Handle MP4
    app.get(`/mp4/*.mp4`,function(request,response,next) {
        var options = {
            root: __root,
        };
        var fileName = "/files" + request.path
        response.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(fileName)
                console.error(err)
                response.status(404)
            } else {
                console.log('Sent:', fileName);
                response.status(200)
            }
        });
    });
}
