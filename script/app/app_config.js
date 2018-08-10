exports.execute = () => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.use(cookieParser())

    app.set('port', (process.env.PORT || 1000));
    
    console.log(__root + '/views')
    app.set('views', __root + '/views');
    app.set('view engine','ejs');
}
