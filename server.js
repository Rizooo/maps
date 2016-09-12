// Basic nodejs server: https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongodb        = require('mongodb');
var MongoClient    = mongodb.MongoClient;
var dbConfig       = require('./config/db');

var CITIES_COLLECTIONS = "cities";

// configuration ===========================================

// config files
// var db = require('./config/db');
var db;

MongoClient.connect(dbConfig.url, function(err, db) {
    if (err) {
        console.log('Unable to connect to MongoDB server, error: ' + err);
    }
    else {
        console.log('Connection established to: ' + dbConfig.url);
    }

    // Do something

    db.close();
});

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)


// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
// TODO: remove this
// require('./app/routes')(app); // configure our routes
var router = express.Router();
var angular = express.Router();

// Replace this by using app/routes.js
router.get('/cities', function(req, res) {
        MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) {
            console.log('Unable to connect to MongoDB server, error: ' + err);
        }

        // var cities = [];
        var cityObject = {};
        var find = function(db, callback){
            var cursor = db.collection(CITIES_COLLECTIONS).find();
            cursor.each(function(err, doc) {
                // TODO: handle error
                // TOD: design a good way to present data
                if (doc != null) {
                    // cities.push(doc);
                    cityObject[doc.name] = doc;
                }
                else {
                    callback();
                }
            });
        };

        find(db, () => {
            console.log('api/cities called');
            res.json(cityObject);
        });

        db.close();
    });
});


angular.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});

app.use('/api', router);
app.use('*', angular);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Listening on port ' + port);

// expose app
exports = module.exports = app;
