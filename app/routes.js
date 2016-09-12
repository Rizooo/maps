var express        = require('express');
var mongodb        = require('mongodb');
var MongoClient    = mongodb.MongoClient;
var dbConfig       = require('./../config/db');

var CITIES_COLLECTIONS = "cities";

module.exports = function(app) {

    var router = express.Router();

    router.get('/cities', function(req, res) {
        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) {
                console.log('Unable to connect to MongoDB server, error: ' + err);
            }

            var cities = [];
            var find = function(db, callback){
                var cursor = db.collection(CITIES_COLLECTIONS).find();
                cursor.each(function(err, doc) {
                    // TODO: handle error
                    // TODO: design a good way to present data
                    if (doc != null) {
                        cities.push(doc);
                    }
                    else {
                        callback();
                    }
                });
            };

            find(db, () => {
                console.log('api/cities called');
                res.json(cities);
            });

            db.close();
        });
    });


    router.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

    app.use('/api', router);
    app.use('*', router)
};
