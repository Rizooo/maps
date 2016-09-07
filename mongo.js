//create the data database and connect to it
var db = connect('127.0.0.1:27017/data'),
    data = null;

//create the cities collection and add documents to it
db.cities.insert({
    "TRE": {
        "HEL": [ 178 ],
        "POR": [ 111 ],
        "LAH": [ 128 ]
        }
});
db.cities.insert({
    "HEL": {
        "TRE": [ 178 ],
        "POR": [ 244 ],
        "LAH": [ 106]
        }
});
db.cities.insert({
    "POR": {
        "TRE": [ 111 ],
        "HEL": [ 244 ]
        }
});
db.cities.insert({
    "LAH": {
        "TRE": [ 128 ],
        "HEL": [ 106 ]
        }
})

//set a reference to all documents in the database
allData = db.data.find();

//iterate the names collection and output each document
while (allData.hasNext()) {
   printjson(allData.next());
}
