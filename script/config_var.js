exports.load = () => {
    return  __root = "/" + __dirname.split("/").filter(f => f.length > 0)[0] ,
            express = require('express'),
            app = express(),
            bodyParser = require('body-parser'),
            multer = require('multer'),
            cookieParser = require('cookie-parser'),
            upload = multer(); // for parsing multipart/form-data
}
