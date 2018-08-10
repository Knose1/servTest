exports.execute = () => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.use(cookieParser())

    app.set('port', (process.env.PORT || 1000));

    app.set('views', __dirname + '/views');
    app.set('view engine','ejs');
}
