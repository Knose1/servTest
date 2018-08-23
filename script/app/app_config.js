exports.execute = () => {
    
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.use(cookieParser())

    app.set('port', (process.env.PORT || 1000));
    
    console.log(__root + '/views')
    app.set('views', __root + '/views');
    app.set('view engine','ejs');
    
    return  WebSocket = require('ws'),
            wss = new WebSocket.Server({
              port: 8080,
              perMessageDeflate: {
                zlibDeflateOptions: { // See zlib defaults.
                  chunkSize: 1024,
                  memLevel: 7,
                  level: 3,
                },
                zlibInflateOptions: {
                  chunkSize: 10 * 1024
                },
                // Other options settable:
                clientNoContextTakeover: true, // Defaults to negotiated value.
                serverNoContextTakeover: true, // Defaults to negotiated value.
                clientMaxWindowBits: 10,       // Defaults to negotiated value.
                serverMaxWindowBits: 10,       // Defaults to negotiated value.
                // Below options specified as default values.
                concurrencyLimit: 10,          // Limits zlib concurrency for perf.
                threshold: 1024,               // Size (in bytes) below which messages
                                               // should not be compressed.
              }
            });
}
