//create the data database and connect to it
var db = connect('127.0.0.1:27017/data'),
    data = null;

// clear previous collection
db.cities.drop();
//create the cities collection and add documents to it
db.cities.insert({
    "name":"TRE",
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
