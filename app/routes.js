var express        = require('express');
var mongodb        = require('mongodb');
var MongoClient    = mongodb.MongoClient;
var dbConfig       = require('./../config/db');
var _              = require('lodash');

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
    router.post('/distance', function(req, res) {
        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) {
                console.log('Unable to connect to MongoDB server, error: ' + err);
            }

            var depart = req.body.depart;
            var dest = req.body.dest;
            var cities = [];
            console.log('depart ' + depart);
            console.log('destination ' + dest);
            var find = function(db, callback){
                var cursor = db.collection(CITIES_COLLECTIONS).find();
                cursor.each(function(err, doc) {
                    // TODO: handle error
                    // TODO: design a good way to present data
                    if (doc != null) {
                        cities[doc.name] = [];
                        _.forEach(doc.distances, function(distance) {
                            cities[doc.name][distance.name] = distance.distance;
                        });
                    }
                    else {
                        callback();
                    }
                });
            };

            find(db, () => {
                console.log('api/distance called');
                // Calculate distance here with dijkstra algorhitm
                // using depart, dest and cities, put result to response and send it
                for (var key in cities) {
                    for (var item in cities[key]) {
                        console.log('cities[' + key + '][' + item + ']: ' + cities[key][item]);
                    }
                }
                res.json();
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
