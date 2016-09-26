//create the data database and connect to it
var db = connect('127.0.0.1:27017/data'),
    data = null;

// clear previous collection
db.cities.drop();
//create the cities collection and add documents to it
db.cities.insert({
    "name":"TRE",
    "map": {
        "lat": 55,
        "lng": -10,
        "zoom": 4
    },
    "distances":[
        {
            "name":"HEL",
            "distance": 178
        },
        {
            "name":"POR",
            "distance":111
        },
        {
            "name":"LAH",
            "distance":128
        }
    ]
});
db.cities.insert({
    "name":"HEL",
    "map": {
        "lat": 45,
        "lng": -1,
        "zoom": 4
    },
    "distances":[
        {
            "name":"TRE",
            "distance":178
        },
        {
            "name":"POR",
            "distance":244
        },
        {
            "name":"LAH",
            "distance":106
        }
    ]
});
db.cities.insert({
    "name":"POR",
    "map": {
        "lat": 30,
        "lng": -1,
        "zoom": 4
    },
    "distances": [
        {
            "name":"TRE",
            "distance":111
        },
        {
            "name":"HEL",
            "distance":244
        }
    ],
});
db.cities.insert({
    "name":"LAH",
    "map": {
        "lat": 75,
        "lng": -10,
        "zoom": 4
    },
    "distances": [
        {
            "name":"TRE",
            "distance":128
        },
        {
            "name":"HEL",
            "distance":106
        }
    ]
});

//set a reference to all documents in the database
allData = db.data.find();

//iterate the names collection and output each document
while (allData.hasNext()) {
   printjson(allData.next());
}
